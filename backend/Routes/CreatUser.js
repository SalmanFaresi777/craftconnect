const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/auth/createuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
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

        // Create new user
        await User.create({
            name: req.body.name,
            password: req.body.password,
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

        if (req.body.password !== userData.password) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        return res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});




module.exports = router;