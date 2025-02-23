const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        if (!global.food_items || !global.foodCategory) {
            return res.status(500).json({ 
                success: false, 
                error: "Data not initialized. Please try again in a few moments." 
            });
        }

        res.json({
            success: true,
            data: [global.food_items, global.foodCategory]
        });
    } catch (error) {
        console.error("Error in /foodData route:", error);
        res.status(500).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
});

module.exports = router;
