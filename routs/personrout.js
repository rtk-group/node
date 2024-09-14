const express = require('express');
const rout = express.Router();

const person = require('../models/person');

// post methos for person
rout.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newperson = new person(data);
        const response = await newperson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log('server code error', err);
        res.status(500).json({ error: 'this is server error' });
    };
});

// get mathod fot person
rout.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetch");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'this is server error' });
    }
});


// dynemic method for person
rout.get('/:worktype', async (req, res) => {
    try {
        const tyofwork = req.params.worktype;
        if(tyofwork == 'chef' || tyofwork == 'manager' || tyofwork == 'waiter' ){
            const response = await person.find({work: tyofwork});
            res.status(200).json(response);
        }else{
            console.log('invalid work name');
            res.status(404).json("invalid name");
        }
    } catch (err) {
        res.status(500).json('this is dynemic error', err);
    }
});


// update person by put method through id
rout.put('/:id', async(req, res)=>{
    try{
        const personid = req.params.id;
    const updateperson = req.body;
    const response = await person.findByIdAndUpdate(personid, updateperson,{new: true,runValidators: true});
    if(!response){
        return res.status(404).json({error: "person not found"});
    }
    console.log("person data updated");
    res.status(200).json(response);
    }
    catch(err){
        res.status(500).json('update server error', err);
    }
})

/// Delet methode ///
rout.delete('/:id', async (req, res)=>{
    try{
        const personid = req.params.id;
        const response = await person.findByIdAndDelete(personid);
        if(!response){
            return res.status(404).json(response);
        }
        console.log("person data is deleted");
        res.status(200).json();

    }catch(err){
        res.status(500).json('update server error', err);
    };
})




module.exports = rout;