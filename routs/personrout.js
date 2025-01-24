const express = require('express');
const rout = express.Router();

const person = require('../models/person.js');

const {jwtauthmiddleware , generatetoken} = require('../jwt.js')

// post methos for person
rout.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newperson = new person(data);
        const response = await newperson.save();
        console.log('data saved');
        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generatetoken(payload);
        // console.log(token);

        res.status(200).json({response: response , token: token});
    } catch (err) {
        console.log('server code error', err);
        res.status(500).json({ error: 'this is server error' });
    };
});

rout.post('/login', async (req, res)=>{
    try{
        // extract user and password
        const {username, password} = req.body;
        // find user by user name;
        const user = await person.findOne({username: username});
        // if user dose not exist;
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "invalid username or password"})
        }
        // generate tolen;
        const payload = {
            id: user.id,
            username: user .username
        }
        const token = generatetoken(payload);
        res.json({token});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "internal server error"});
    }
});

// profile route
rout.get('/profile', jwtauthmiddleware , async (req, res)=>{
    try{
        const userdata = req.user;
        // console.log(userdata);
        const userid =  userdata.id;
        const user = await person.findById(userid);
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "internal server error"});
    }
})

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
        res.status(200).json({"data": "deleted successfully"});

    }catch(err){
        res.status(500).json('update server error', err);
    };
})




module.exports = rout;