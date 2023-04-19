const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    fullname:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateofBirth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model("User", UserSchema);