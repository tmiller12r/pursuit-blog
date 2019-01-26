const userService = require(..'/services/user') // 

// grabbing, e.g., localhost:5000/user/3 <= user_id = 3
const loginChecker = (req, res, next) => {
// const {user_id} = req.params doesn't work
 const {id} = req.headers // headers in postman

userService.read(id) // resolve(response) or reject (err)
.then((response) => { // response is an {}, token is a key
// then takes 2 cb, resolve(response) or reject (err)
    if(response.token === req.headers['token'])
    // OR   const headersToken = req.headers['token']
    //      const dbToken = repsonse.token
    //      if headersToken === dbToken
    // have to compare this token to token from l. 9 repsonse userService.read(user_id)
        next()
        else res.json('token incorrect')
    })
    .catch(err=>{
        res.json(err.toString())
    })
}
 
module.exports = {
    loginChecker
}