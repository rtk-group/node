const express = require('express');
const router = express.Router();

const menu = require('../models/menu');

router.post('/', async(req, res)=>{
    try{
        const data = req.body;
    const newmenu = new menu(data);
    const response = await newmenu.save();
    console.log('menu data is saved');
    res.status(200).json(response)
    }catch(err){
        console.log('server code error', err);
        res.status(500).json({error: 'this is server error'});
    }
})

router.get('/', async(req, res)=>{
    try{
        const showmenu = await menu.find();
        console.log('data is fetching from menu');
        res.status(200).json(showmenu);

    }catch(err){
        console.log('server code error', err);
        res.status(500).json({error: 'this is server error'});
    }
});

router.get('/:howtest', async(req, res)=>{
    try{
        const thistaste = req.params.howtest;
        if(thistaste == "sweet" || thistaste == "spice" || thistaste == "sour"){
    const response = await menu.find({taste: thistaste});
    res.status(200).json(response);
        }else{
            console.log('this is menu error');
            res.status(500).json("menu name invalid");
        }
    }catch(err){
        console.log('server code error', err);
        res.status(500).json({error: 'this is server error'});
    }
})


module.exports = router; 
