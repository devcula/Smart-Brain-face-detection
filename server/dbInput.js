const fs = require('fs');
const bcryptjs = require('bcryptjs');

const hashFunction = (password) =>{
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password,salt);
}

const users = [
    // {
    //     id: 110,
    //     name: "John",
    //     email: "john@gmail.com",
    //     entries: 0,
    //     joined: new Date()
    // },
    // {
    //     id: 111,
    //     name: "Sally",
    //     email: "sally@gmail.com",
    //     entries: 0,
    //     joined: new Date()
    // }
]

fs.writeFile("./users.json",JSON.stringify(users), err =>{
    if(err){
        console.log(err);
    }
})

const loginDetails = [
    // {
    //     id: 110,
    //     hash: hashFunction("john")
    // },
    // {
    //     id: 111,
    //     hash: hashFunction("sally")
    // }
]

fs.writeFile("./login.json", JSON.stringify(loginDetails), err =>{
    if(err){
        console.log(err);
    }
})