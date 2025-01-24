const person = require('./models/person.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(async (username, password, done)=>{
    try{
        console.log(`receve credential ${username}, ${password}`);
        const user = await person.findOne({username: username});
        // console.log(user);
        if(!user){
            return done(null, false, {message: 'incorrect username'});
        }else{
            // const ispasswordmatch = user.password === password ? true : false;
            const ispasswordmatch =user.comparePassword(password)
            if(ispasswordmatch){
                return done(null, user);
            }else{
                return done(null, false, {message: 'incorrect password'});
            }
        }
    }catch(err){
        return done(err);
    }

}));

module.exports = passport ;