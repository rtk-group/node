// console.log("hello world")
// var _ = require('lodash')
// const hello = require('./second.js')
// var prompt = require('prompt-sync')();

// var fs = require('fs');
// var os = require('os');

// let user = os.userInfo();

// let first = fs.appendFile('firsttext', "this is my first text its added jfdhvrhjfhj",()=>{
//     console.log("file is appended");
// })
// let fun = hello.hellofun(2, 4);
// console.log(hello.name);
// console.log(fun);

// const hello = `{
//     "name": "rohit",
//     "age": 20,
//     "gender": "male"
// }`

// const hi = JSON.parse(hello);

// console.log(typeof(hello))
// console.log(typeof(hi))

// let hello2 = JSON.stringify(hi)
// console.log(typeof(hello2))

// const express = require('express');
// let app = express();

// app.get('/',function (req, res){
//     res.send('welcome in backend');
// });

// app.listen(3000 ,()=>{
//  console.log("server is on");
// });


// const express = require('express')
// const app = express();

// let port = 5000;
// app.get('/',(req,res)=>{
//     res.send("hello rohit");
// });
// app.get('/user',(req,res)=>{
//     res.send("user.com");
// });
// app.get('/about',(req,res)=>{
//     res.send("about.com");
// });
// app.get('/finish',(req,res)=>{
//     res.send("finish and game over");
// });
// app.get('/hello',(req,res)=>{
//     res.send("hello world");
// });

// app.listen(port,()=>{
//     console.log(`code is runnig at port no ${port}`);
// })




// let data = require('./datafile')
// const express = require('express');
// const app = express();

// app.get('/',(req, res)=>{
//     res.send(data);
// });

// app.listen(3000, ()=>{
//     console.log("port is listnig at 3000");
// });


// let data = require('./datafile')
// const express = require('express');
// const app = express();

// app.get('/',(req, res)=>{
//     res.send("rohit kumar");
// });

// app.post('/post',(req, res)=>{
//     res.send('this is post method');
// });
// app.get('/data',(req, res)=>{
//     res.send(data);
// });

// app.get('/country',(req, res)=>{
//     res.send(`${req.query.country}`)
// });
// app.get('/data/:id',(req, res)=>{
//     let id = Number(req.params.id);
//     let result = data.find((item)=>{
//         return item.id === id;
//     })
//     res.send(result);
// });

app.listen(3000, ()=>{
    console.log("port is listnig at 3000");
});