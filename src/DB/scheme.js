const mongoose = require('mongoose')
const userScheme = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        date: new Date()
    }
});

export default userScheme;