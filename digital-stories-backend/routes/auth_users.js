const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

router.post("/auth/logout", (req, res)=>{
    req.session.authorization = null;
    res.json({message: "logged out"})
})

router.get("/auth/userDetails", async(req, res)=>{
    const userDetails = await User.findOne({
        username: req.session.authorization.username
    });
    console.log(userDetails);
    return res.json(userDetails);
})

module.exports = router;