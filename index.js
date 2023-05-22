const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require("path")


const uri = "mongodb+srv://ajay:chatapppassword@chat-app.osqbmur.mongodb.net/chatapp?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
};

mongoose.connect(uri, connectionParams)
   .then(() => {
    console.log("connect to the db");
   })
   .catch((e) => {
    console.log("error : ",e);
   });


const User = require("./model/user");
const Userlist = require("./model/userlist");
const Userchat = require("./model/userchat");
const Userfriend = require("./model/userfriend");

app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(cors())

app.post("/register" ,cors(), async (req,res) => {
   
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.json("exist");
        return 
    }
    else {
        user = await User.create({
            username : req.body.name,
            email : req.body.email,
            password : req.body.password
        });

        Userlist.create({
            username : req.body.name,
            userid : req.body.email
        });

        res.json("not exist");
    }
   
    
})

app.post("/messages", cors(), async(req,res) => {
    try {
        let userchat = await Userchat.find({$or :[{username : req.body.usernameid},{ friend : req.body.usernameid}]});
        if(userchat)
        {
            res.json(userchat);
        }
        else {
            res.json("new");
        }
    }
    catch(err)
    {
        res.status(400).json("error");

    }
})

app.post("/message", cors(), async(req,res) => {
    try {
        let userchat = await Userchat.create({
            username : req.body.usernameid,
            friend : req.body.friendid,
            message : req.body.message,
            sender : req.body.username,
            date : req.body.actualdate,
            time : req.body.time
        });
        res.json("ok");
    }
    catch(err)
    {
        res.status(400).json("error");

    }
})

app.post("/userfriend", cors(), async(req,res) => {
    let getuser = await Userfriend.find({usernameid : req.body.usernameid});
    res.json(getuser);
})

app.post("/getuser", cors(), async(req,res) => {
    let getuser = await Userlist.find();
    let userlistnew = [];
    getuser.map((item,index) => {
        let userlistobj = { name : item.username , userid : item.userid} ;
        userlistnew.push(userlistobj) ;
    })
    res.json(userlistnew);
})

app.post("/login", cors() , async (req,res) => {
    try{
        let user = await User.findOne({email : req.body.email})
        if(user){
            let result = req.body.password === user.password;
            if(result){
                res.json({status  :"vaild" , name : user.username , email : user.email});
            }
            else{
                res.json("invaild password");
            }
        }
        else{
            res.json("invaild")
        }
    }
    catch(err){
        res.status(400).json("error");
    }
})

app.post("/addfriend", cors(), async (req, res)=> {
    try{
        let user = await Userfriend.findOne({usernameid : req.body.usernameid , friendid : req.body.friendid})
        let data = {username: req.body.username , friend : req.body.friend , usernameid : req.body.usernameid , friendid : req.body.friendid}
        if(user){
            res.json("already");
        }
        else{
            Userfriend.create(data);
            res.json("success");
        }
    }
    catch{
        
    }
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


