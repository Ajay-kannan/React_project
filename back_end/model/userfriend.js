var mongoose = require("mongoose")
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var userfriend = new schema({
    username: {
        type: String
    },
    friend : {
        type : String
    },
    usernameid :{
        type : String
    },
    friendid : {
        type : String
    }
})


userfriend.plugin(passportLocalMongoose);

module.exports = mongoose.model("addfriend", userfriend)