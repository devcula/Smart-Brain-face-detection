const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const bcryptjs =  require('bcryptjs');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const hashFunction = (password) =>{
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password,salt);
}

app.get("/", (req, res) =>{
    fs.readFile("./users.json", (err, data) =>{
        if(err){
            console.log(err);
            res.status(500).send("Technical error");
        }
        else{
            const users =JSON.parse(data.toString());
            res.status(200).send(`Number of users registered with us = ${users.length}`);
        }
    })
})

app.post("/register", (req, res)=>{
    const {name, email, password} = req.body;
    fs.readFile("./users.json", ( err, data ) =>{
        if(err){
            console.log(err);
            res.status(500).send("Technical error");
        }
        else{
            let users = JSON.parse(data.toString());
            let newUser;
            if(users.length===0){
                newUser = {
                    id: 1,
                    name: name,
                    email: email,
                    entries: 0,
                    joined: new Date()
                }
            }
            else{
                newUser = {
                    id: users[users.length-1].id +1,
                    name: name,
                    email: email,
                    entries: 0,
                    joined: new Date()
                }
            }
            users.push(newUser);
            fs.writeFile("./users.json",JSON.stringify(users), err=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Technical error");
                }
            });
            fs.readFile("./login.json", (err, data) =>{
                if(err){
                    console.log(err);
                    res.status(500).send("Technical error");
                }
                else{
                    let preData = JSON.parse(data.toString());
                    const newData = {
                        id: newUser.id,
                        hash: hashFunction(password)
                    }
                    preData.push(newData);
                    fs.writeFile("./login.json", JSON.stringify(preData), err=>{
                        if(err){
                            console.log(err);
                            res.status(500).send("Technical error");
                        }
                    });
                }
            });
            res.status(200).send(newUser);
        }
    });
})

app.post("/login", ( req, res ) =>{
    const {email, password} = req.body;
    let user;
    fs.readFile("./users.json", (err, data) =>{
        if(err){
            console.log(err);
            res.status(500).send("Technical Error");
        }
        else{
            const dbUser = JSON.parse(data.toString()).filter(obj => {
                return obj.email === email;
            });
            if(dbUser.length > 0){
                user = dbUser[0];
                fs.readFile("./login.json", ( err, data )=>{
                    const loginObj = JSON.parse(data.toString()).filter(obj =>{
                        return obj.id === user.id;
                    })
                    if(loginObj.length===0){
                        res.status(400).send("User not found. Kindly register!");
                    }
                    else{
                        if(bcryptjs.compareSync(password,loginObj[0].hash)){
                            res.status(200).send(user);
                        }
                        else{
                            res.status(400).send("Email/password incorrect. Please try again!");
                        }
                    }
                });
            }
            else{
                res.status(400).send("User not found. Kindly register!");
            }
        }
    });
})

app.put("/update" , (req, res) =>{
    const {id, entries} = req.body;
    fs.readFile("./users.json", (err, data) =>{
        let users = JSON.parse(data.toString());
        let updatedUser;
        users.forEach(user => {
            if(user.id === id){
                user.entries+=entries;
                updatedUser = user; 
            }
        })
        fs.writeFile("./users.json",JSON.stringify(users), err =>{
            if(err){
                console.log(err);
            }
        })
        res.status(200).send(updatedUser);
    })
})

app.listen(3000, () =>{
    console.log("Server up and listening on port 3000");
})