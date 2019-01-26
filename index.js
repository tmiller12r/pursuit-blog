const express = require('express');
const bodyParse = require('body-parser');
const {loginChecker} = require('./middleware/middleware')

//const userApp = require('./routes/user').userApp; //userApp = key, app = value
// same as: const {userApp} = require('./routes/user')
// require('./routes/user').userApp gives us object from routes/user.js
const {publicuserApp} = require('./routes/publicuser')
const {privateuserApp} = require('./routes/privateuser')

const app = express();
const port = 5000;

// MIDDLEWARE
app.use(bodyParse.urlencoded({extended: false})); 
// use app (= express server) to parse info in url or...
app.use(bodyParse.json());
// use express server to parse the json

// ROUTE
app.use('/user', publicuserApp);

// MIDDLEWARE
app.use(loginChecker); // headers


// ROUTE
app.use('/user', privateuserApp);
// replaces app.get('/', (req, res) => {
//    res.json({}) // test that route works
// })

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
});


