const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, description } = req.body;

        // Validate input
        if (!name || !email || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ error: 'Email already registered as a seller' });
        }

        // Create new seller
        const seller = new Seller({
            name,
            email,
            description
        });

        await seller.save();

        res.status(201).json({ success: true, message: 'Seller registered successfully' });
    } catch (error) {
        console.error('Seller signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
