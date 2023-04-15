const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User")
const router = express.Router();

router.post("/register", async(req, res)=>{
    console.log(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        email:    req.body.email,
        password: hash
    })
    try{
        const savedUser = await user.save();
        res.json(savedUser);    
    }catch(err){
        res.json({message:err});
    }   
});

router.post("/login", async (req, res)=>{
    const email    = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    const hash = await bcrypt.hash(req.body.password, 10);
    const result    = await User.findOne({email: email});
    const passMatch = await bcrypt.compare(password, result.password);
    
    let accessToken = null;
    
    if (passMatch){
        accessToken = jwt.sign({payload:{"username":username, "email":email, "password":hash}}, 'MERA_SECRET', {expiresIn:60});
        req.session.authorization = {
            accessToken, username
        };
        return res.json({accessToken: accessToken});
    
    } else {
        return res.json({message: "Error logging in"});
    }
});

module.exports = router;