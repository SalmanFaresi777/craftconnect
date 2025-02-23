const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";


router.post("/auth/createuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })] 
    , async (req, res) => {

    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: [{ msg: "User with this email already exists" }] });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        // Create new user
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });

        res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, errors: [{ msg: "Internal server error" }] });
    }
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.post("/loginuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
        }
        
        const data = {
            user: {
                id: userData.id
            }
        }
        
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true, authToken:authToken })
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});




module.exports = router;