const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'devcula',
        password: 'password',
        database: 'smart-brain'
    }
})

const runtimeErrorLogger = (runtimeError) =>{
    fs.appendFile("./runtimeError.log", `\n${new Date()}, ${runtimeError.toString()}`, err => {
        throw err;
    })
}

const hashFunction = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

app.get("/", (req, res) => {
    try{
        db("users").select("*")
        .then(dbUsers => {
            res.status(200).send(`Number of users registered with us = ${dbUsers.length}`);
        })
        .catch(err => {
            console.log("error while fetching users from database");
            throw err;
        })
    }
    catch(err){
        console.log("Error caught while processing request.");
        res.status(500).send("Technical Error");
    }
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if(name && email && password){
        db.transaction(trx => {
            trx.insert({
                email: email,
                hash: hashFunction(password)
            }).into("login")
            .returning("email")
            .then(userEmail => {
                return trx.insert({
                    email: userEmail[0],
                    name: name,
                    joined: new Date()
                }).into("users")
                .returning("*")
                .then(users =>{
                    res.status(200).json(users[0]);
                })
            })
            .then(response =>{
                console.log("Going to commit");
                trx.commit();
            })
            .catch(err => {
                console.log("Error..Rolling back changes..Check log");
                runtimeErrorLogger(err);
                trx.rollback();
            })
        })
        .catch(err => {
            console.log(err);
            runtimeErrorLogger(err);
            res.status(500).send("Unable to register");
        })
    }
    else{
        console.log("Bad data received. Unable to register");
        res.status(400).send("Incomplete data provided");
    }
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let dbUser;
    db.select("*").from("login").where({email: email})
    .then(cred => {
        if(cred.length > 0){
            if(bcryptjs.compareSync(password, cred[0].hash)){
                db.select("*").from("users").where({email: email})
                .then(user => {
                    if(user.length > 0){
                        console.log("Login successful");
                        res.status(200).json(user[0]);
                    }
                    else{
                        console.log("User not found");
                        res.status(400).send("User doesn't exist");
                    }
                })
                .catch(err => {
                    console.log("Error while fetching user");
                    runtimeErrorLogger(err);
                    res.status(500).send("Technical error");
                })
            }
            else{
                console.log("Invalid Username/password");
                res.status(400).json("Invalid email/password");
            }
        }
        else{
            console.log("User credentials not found");
            res.status(400).json("User doesn't exist");
        }
    })
    .catch(err => {
        console.log("Error while fetching credentials");
        runtimeErrorLogger(err);
        res.status(500).send("Technical Error");
    })
})

app.put("/update", (req, res) => {
    const { id, entries } = req.body;
    db("users").increment({entries: entries}).where({id: id}).returning("*")
    .then(user => {
        if(user.length > 0){
            console.log("Entries updated successfully");
            res.status(200).json(user[0]);
        }
        else{
            console.log("User with received id not found");
            res.status(400).send("Bad id received");
        }
    })
    .catch(err => {
        console.log("Error while receiving user from database");
        runtimeErrorLogger(err);
    })
})

app.listen(3000, () => {
    console.log("Server up and listening on port 3000");
})