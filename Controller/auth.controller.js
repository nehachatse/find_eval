const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Model/User.model");

const router = express.Router();
const new_token = (user) => { 
    return jwt.sign({user}, process.env.JWT_SECRET_KEY)
   }

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email:req.body.email })
    if(user) {
     return res.status(400).json("User already exist try to login.");
    }
    user = await User.create(req.body)
    let token = new_token(user)

    return res.status(200).json({"token": token});
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).json("Invalid email or password!");
    }
    let test = user.checkPassword(req.body.password)
    if(!test) {
        return res.status(400).json("Invalid email or password!");
    }
    let token = new_token(user)
    return res.status(200).json({"token": token})
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});


module.exports = router;
