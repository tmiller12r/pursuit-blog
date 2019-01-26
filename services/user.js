const pgp = require ('pg-promise')({}); // 
const db = pgp('postgres://localhost/blog')

const userService = {}
// empty obj for keys CRUD, values come from functions
userService.create = (username, email, password) => {
    return db.none('INSERT INTO users ( name, email, password) VALUES (${name}, ${email}, ${password})', {name, email, password})
    //db is a promise - db.none recognizes something but returns nothing
}

userService.read = (id) => {
    return db.one('SELECT * FROM users WHERE id = ${id}', {id}) // 2nd obj cud be {id:id}
}
// this returns all columns for id, e.g., id=1, return username, email, password
// userService.readUsername = (username) => {
// return db.one('SELECT * FROM users WHERE username=${username}', {username})}

userService.update = (id, name, email, password, token=null) => {
    const arr = [username, email, password, token]
    const arrString = ["username", "email", "password", "token"]
    // console.log(arr)
    // let sqlStr = 'UPDATE users SET ' + arr.reduce((acc,element,i) => {
    //     if(element){
    //         acc += arrString[i] + '=${' + arrString[i] + '},'
    //         return acc 
    //     }
    //     // UPDATE users SET "username" = ${"username"}
    //     return acc
    // },'') 
    // sqlStr = sqlStr.slice(0,sqlStr.length-1)
    // sqlStr = sqlStr + ` WHERE id=${id}`
    let sqlStr = 'UPDATE users SET '
    let emptystr = ''
    arr.forEach((element, i) => {
        if(element) {
            // emptystr = emptystr +
            emptystr += arrString[i] + '=${' + arrString[i] + '},'
            // username = ${username},
        }
    })
    emptystr = emptystr.slice(0, emptystr.length-1)
    // username = ${username} (sliced the comma)
    sqlStr = sqlStr + emptystr
        // UPDATE users SET username = ${username}
    sqlStr + `WHERE id=${id}`
    //console.log(sqlStr)
    return db.none(sqlStr,{id,name,email, password, token})
    // db.none('UPDATE users SET username=${username}, email=${email}, password=${password} WHERE id =)
}

    //return db.none(`UPDATE users SET name=${name}, email=${email}, password=${password} WHERE id={id}`, {name, email, password})}

userService.delete = (id) => {
    return db.none('DELETE FROM users WHERE id=${id}', {id});
}

module.exports = userService;