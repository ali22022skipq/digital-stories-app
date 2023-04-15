const mongoose = require("mongoose");
const session = require('express-session');
const public = require("./routes/public");
const auth_users = require("./routes/auth_users");
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

const uri = process.env.URI+process.env.DATABASE_NAME+process.env.DB_PARAMS;
mongoose.connect(uri, {useNewUrlParser: true});

app.use(cors({
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    authorization: {
        accessToken: null,
        username: null
    }
}));

app.use("/auth/*", (req, res, next) =>{
    if (req.session.authorization){
        try{
            const data = jwt.verify(req.session.authorization['accessToken'], process.env.SECRET);
            next();
        } catch (err){
            return res.status(404).json({error: err});
        }
    } else{
        return res.status(404).json({message: "User not Logged in"});
    }
})
app.use("/", public);
app.use("/", auth_users);

app.listen(5000, ()=>{
    console.log("chal rha hn mei")
});