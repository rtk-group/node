const express = require('express');
const app = express()
const db = require('./db');


const bodyparser = require('body-parser');
app.use(bodyparser.json()); // store in req.body

// require env or configuration file
require('dotenv').config();
const PORT = process.env.port || 3000;

// require person file
// const person = require('./models/person');

// require menu file
// const menu = require('./models/menu.js');


app.get('/', (req, res)=>{
    res.send('hello rohit sir');
})



const router = require('./routs/personrout.js');
const router1 = require('./routs/menurout.js')
app.use('/person', router);
app.use('/menu', router1);
app.listen(PORT, () => {
    console.log('server is run at 3000 port no.');
});
