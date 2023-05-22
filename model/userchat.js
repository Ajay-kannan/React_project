var mongoose = require("mongoose")
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var userchat = new schema({
    username: {
        type: String
    },
    friend : {
        type : String
    },
    message: {
        type: String
    },
    sender : {
        type : String
    },
    date : {
        type : String
    },
    time : {
        type : String
    }
})


userchat.plugin(passportLocalMongoose);

module.exports = mongoose.model("chatmessage", userchat)