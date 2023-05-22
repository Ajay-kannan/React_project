var mongoose = require("mongoose")
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

var userlist = new schema({
    username: {
        type: String
    } ,
    userid : {
        type : String
    }
})

userlist.plugin(passportLocalMongoose);

module.exports = mongoose.model("userlist", userlist);