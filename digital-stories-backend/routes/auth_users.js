const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/auth/logout", (req, res)=>{
    res.json({message: "Logged Out"});
})

module.exports = router;