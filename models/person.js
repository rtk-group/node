const { union } = require('lodash');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

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
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String
    }
});

personschema.pre('save', async function(next){
    const person = this;
    if(!person.isModified('password')){
        return next();
    }else{
        try{
            const salt = await bcrypt.genSalt(10);
             const hashedpassword = await bcrypt.hash(person.password, salt);
             person.password = hashedpassword;
            next();
        }catch(err){
            next(err);
        }
    }
    
});



personschema.methods.comparePassword = async function (candidatePassword) {
    try{
        const ismatch = await bcrypt.compare(candidatePassword, this.password);
        return ismatch;
    }catch(err){
        throw err;
    }
};



module.exports = mongoose.model('Information',personschema);
