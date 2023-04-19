const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const router = express.Router();
const session = require('express-session');
dotenv.config();

router.post("/register", async(req, res)=>{
    console.log(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email:    req.body.email,
        password: hash,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);    
    
    }catch(err){
        res.json({err:err});
    }   
});

router.post("/login", async (req, res)=>{
    const email    = req.body.email;
    const password = req.body.password;
    
    if (email && password){
        const hash      = await bcrypt.hash(req.body.password, 10);
        const result    = await User.findOne({email: email});
        const passMatch = await bcrypt.compare(password, result.password);
        
        let accessToken = null;
        const username = result.username;
        if (passMatch){
            accessToken = jwt.sign({payload:{"username":username, "email":email, "password":hash}}, process.env.SECRET, {expiresIn:3600});
            req.session.authorization = {
                accessToken: accessToken,
                username: username
            };
            return res.json({accessToken: accessToken});
        }
    } else {
        return res.json({message: "Error logging in"});
    }
});

module.exports = router;