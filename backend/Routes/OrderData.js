const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    // if email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

// In OrderData.js
router.post('/auth/myOrderData', async (req, res) => {
    try {
        const myData = await Order.findOne({ 'email': req.body.email });
        if (!myData) {
            return res.status(404).json({ orderData: [] });
        }
        res.json({ orderData: myData.order_data });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
  

module.exports = router;
