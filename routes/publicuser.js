const express = require('express')
const bcrypt = require('bcrypt');
const uuid = require ('uuid/vq1');
const userService = require('../services/user')
const app = express();

app.get('/:user-id', (req,res) => {
    const{user_id} = req.params
    userService.read(user_id).then(response=>{
        delete response.token
        res.json(response)
    }, err => {
        res.json(err.toString())
    })
})

app.get('/:author/posts/:post_id', (req, res) => {
    const {author, post_id} = req.params
    postService.read(author)
    .then(response => {
        //response is an array of {}
        response.forEach(obj => {
            if(obj['id'] === post_id) res.json(obj)
        })
    })
})


app.post('/', (req,res)=>{
    const{username,email,password} = req.body

    if(!username || !email || !password) res.json({Error: 'Missing username, email, or password'})
    bcrypt.hash(password,10)
    .then((enxryptedPassword) => {
        userService.create(username, email, encryptedPassword)
        .then(() => {
            res.json({username, email, encryptedPassword})
        }, err => {
            res.json({Error:'username or email exists'})
        })
    })
})

app.post('/login',(req,res)=>{
    let {user_id,username,password} = req.body
    if(!user_id || !username || !password) res.json({Error: 'Must enter id,username,password'})
    userService.read(user_id)
    .then(data=>{   
        if(username != data.username) throw new Error('Incorrect username')
        return bcrypt.compare(password,data.password) 
    // bcrypt compares entered in postman v. encrypted
    // bycrypt.compare is a promise which returns the repsonse below l. 47
 },err=>{
        throw new Error('username does not exist')
    })
    .then(response=>{
        if(!response) throw new Error('Password is incorrect') // !response: response===false
        return userService.read(user_id)
        
    })
    .then((data)=>{
        if(data.token) throw new Error('Already logged in') //
        const tokenn = uuid(); // creating ref. l3
        
        userService.update(user_id,username=null,password=null,email=null,tokenn)
        res.json({status:'login Success',tokenn})
    })
    .catch(err=>{
        res.json(err.toString())
    })
})


module.exports = 