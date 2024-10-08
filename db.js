const mongoose = require('mongoose');
require('dotenv').config();
// const mongourl = mongodb://127.0.0.1:27017/hotels;
const mongourl = process.env.mongodb_url;

// set up to mongodb connection
mongoose.connect(mongourl)
.then(()=>{
    console.log("hello connection");
}).catch((err)=>{
    console.log('hello connection' + err);
})

const db = mongoose.connection;

// define event listner when connected to database
db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('disconnected',()=>{
    console.log('Disconnected to mongodb server');
});

db.on('error',()=>{
    console.log('Error to mongodb server');
});

// Export the database connections
module.exports = db;