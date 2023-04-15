const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/auth/logout", (req, res)=>{
    req.session.authorization = null;
    console.log("I was here");
    res.json({message: "logged out"})
    
})

module.exports = router;