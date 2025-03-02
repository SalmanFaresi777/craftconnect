const SSLCommerzPayment = require('sslcommerz-lts');
const Order = require('../models/Orders');
const { Types } = require('mongoose');

// SSLCommerz credentials from environment variables
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; //sandbox or live

const createPayment = async (req, res) => {
    try {
        console.log('Payment initialization started');
        console.log('Store ID:', store_id);
        console.log('Store Password:', store_passwd ? 'Present' : 'Missing');

        const { total_amount, cus_email, order_items } = req.body;
        console.log('Request body:', { total_amount, cus_email, order_items });

        if (!store_id || !store_passwd) {
            throw new Error('SSLCommerz credentials are missing');
        }

        const tranId = new Types.ObjectId().toString();
        console.log('Transaction ID:', tranId);

        const data = {
            total_amount: total_amount,
            currency: 'BDT',
            tran_id: tranId,
            success_url: `http://localhost:5000/api/payment/success/${tranId}`,
            fail_url: `http://localhost:5000/api/payment/fail/${tranId}`,
            cancel_url: `http://localhost:5000/api/payment/cancel/${tranId}`,
            ipn_url: `http://localhost:5000/api/payment/ipn`,
            shipping_method: 'NO',
            product_name: 'Food Order',
            product_category: 'Food',
            product_profile: 'general',
            cus_name: 'Customer',
            cus_email: cus_email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        console.log('Initializing SSLCommerz payment...');
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        
        const apiResponse = await sslcz.init(data);
        console.log('SSLCommerz Response:', apiResponse);
        
        if (!apiResponse?.GatewayPageURL) {
            throw new Error('Failed to get payment gateway URL');
        }

        // Redirect the gateway to SSLCommerz
        const gatewayPageURL = apiResponse.GatewayPageURL;
        console.log('Gateway URL:', gatewayPageURL);
        res.json({ paymentUrl: gatewayPageURL });

    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ 
            error: 'Payment initialization failed',
            details: error.message 
        });
    }
};

const paymentSuccess = async (req, res) => {
    try {
        const { tranId } = req.params;
        console.log('Payment Success for transaction:', tranId);
        
        // Update order status
        await Order.findOneAndUpdate(
            { 'order_data.tranId': tranId },
            { $set: { 'payment_status': 'completed' } }
        );

        res.redirect('http://localhost:3000/payment-success');
    } catch (error) {
        console.error('Success Error:', error);
        res.status(500).json({ error: 'Payment success handling failed' });
    }
};

const paymentFail = async (req, res) => {
    try {
        const { tranId } = req.params;
        console.log('Payment Failed for transaction:', tranId);
        
        await Order.findOneAndUpdate(
            { 'order_data.tranId': tranId },
            { $set: { 'payment_status': 'failed' } }
        );

        res.redirect('http://localhost:3000/payment-fail');
    } catch (error) {
        console.error('Fail Error:', error);
        res.status(500).json({ error: 'Payment failure handling failed' });
    }
};

const paymentCancel = async (req, res) => {
    try {
        const { tranId } = req.params;
        console.log('Payment Cancelled for transaction:', tranId);
        
        await Order.findOneAndUpdate(
            { 'order_data.tranId': tranId },
            { $set: { 'payment_status': 'cancelled' } }
        );

        res.redirect('http://localhost:3000/payment-cancel');
    } catch (error) {
        console.error('Cancel Error:', error);
        res.status(500).json({ error: 'Payment cancellation handling failed' });
    }
};

const paymentIPN = async (req, res) => {
    try {
        console.log('IPN Notification received:', req.body);
        const { val_id, tran_id, status } = req.body;
        
        // Validate the payment using val_id
        // Update order status based on IPN response
        
        res.status(200).json({ message: 'IPN received' });
    } catch (error) {
        console.error('IPN Error:', error);
        res.status(500).json({ error: 'IPN handling failed' });
    }
};

module.exports = {
    createPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentIPN
};
