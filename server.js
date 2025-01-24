const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth.js');

const bodyparser = require('body-parser');
app.use(bodyparser.json()); // req.body
const PORT = process.env.port || 3000;

// middaleware function 
// let hello = (req, res, next)=>{
//     console.log(req.originalUrl);
//     console.log('hello middaleware');
//     next();
// };
// app.use(hello);

app.use(passport.initialize());
//////////////// 
const authmiddleware = passport.authenticate('local', {session: false});
app.get("/", (req, res) => {
    res.send('Hello, Rohit sir');
});

// import the router file
const personRouter = require('./routs/personrout.js');
const menuRouter = require('./routs/menurout.js');

app.use('/person', personRouter);
app.use('/menu', menuRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});














// const person = require('./models/person.js');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// // const bcrypt = require('bcrypt');
// // const isPasswordMatch = await bcrypt.compare(password, user.password);

// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//         // console.log('Received credentials:', username, password);

//         console.log(`Username received: ${username}`);   //////////
//         console.log(`Password received: ${password}`);  ////////
//         const user = await person.findOne({ username });
//         console.log('User fetched from DB:', user); //////////////
//         if (!user){
//             console.log('Incorrect username');  ////////
//             return done(null, false, { message: 'Incorrect username.' });
//         }

//         // const isPasswordMatch = await user.comparePassword('password');
//         const isPasswordMatch = user.password === password ? true :false;
//         // const isPasswordMatch = await bcrypt.compare(password, user.password);
//         console.log(isPasswordMatch);  /////////
//         if (isPasswordMatch){
//             console.log("success");
//             return done(null, user);
//         }    
//         else{
//             console.log('Incorrect password');   //////////
//             return done(null, false, { message: 'Incorrect password.' })
//         }
        
//     } catch (error) {
//         console.error('Error during authentication:', error);  //////// 
//         return done(error);
//     }
// }));

// app.use(passport.initialize());

// const passwordmiddleware = passport.authenticate('local', { session: false })






















