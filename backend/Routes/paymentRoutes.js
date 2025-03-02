const express = require('express');
const router = express.Router();
const {
    createPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentIPN
} = require('../controllers/paymentController');

// Payment routes
router.post('/create', createPayment);
router.post('/success/:tranId', paymentSuccess);
router.post('/fail/:tranId', paymentFail);
router.post('/cancel/:tranId', paymentCancel);
router.post('/ipn', paymentIPN);

module.exports = router;
