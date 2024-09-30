const mongoose = require('mongoose');
require('dotenv').config();
// const mongourl = process.env.local_url;
const mongourl = process.env.mongodb_url;

// set up to mongodb connection
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

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