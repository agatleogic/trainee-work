const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    category:{
        type:String
    },
    images:{
        type:Array
    },
    date:{
        type:Date
    }
});


const userImg = new mongoose.model("UserImg", imageSchema)

module.exports = userImg