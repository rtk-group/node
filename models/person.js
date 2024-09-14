const mongoose = require('mongoose');

// define a person data
const personschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    }
});

const hello = mongoose.model('Information',personschema);
module.exports = hello;