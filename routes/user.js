const express = require ('express');
const userService = require('../services/user');
const app = express();
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');


// LOGIN USER (username & password already exist)
app.post('/login', (req, res) => {

    const {id, username, password} = req.body;
    userService.readUser(id).then((user) => {
        // console.log(user)
        if username === user.username) {
            return {match: bcrypt.compare(password, user.password)}
        }
        if(!user.username || !user.password) {
            throw new Error (`Username ${username} and Password ${password}`)
        }
    })
})

// CREATE USER W/ENCRYPTED PASSWORD
app.post('/' (req, res) => {
    const
})
app.get('/:user', (req, res) => {

})
// READ USER
// UPDATE USER
// DELETE USER
app.delete('/:user_id', (req, res) => {
    const {user_id} = req.params;
    const {username, email, password, token} = req.body;
    userService.readUser(user_id).then((data) => {
        userService.deleteUser(user_id, username, password, email, token).then(() => {
        res.json({message: 'Deleted!', data})
    })
})
.catch(err => {
    res.status(404).json({error: err.toString()})
})



// GET ALL USERS
app.get('/', (req, res) => {
    userService.allUsers().then((users) => {
        res.json({message: 'Here are the list of all users:', })
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});
module.exports = {
    userApp: app, // userApp = key, app = value
}