const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/auth');
const localStorage=require('localStorage')

const generateAccessToken = (id, name, isPremium) => {
    return jwt.sign({ userID: id, name: name, isPremium: isPremium }, secretKey);
}

exports.updateTransaction = async (req, res, next) => {
    try {
        
        //const token = req.header('Authorization');
        const token =localStorage.getItem('token')
        const userDetails = jwt.verify(token, secretKey);
        newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

        
        const order_id = req.body.order_id;

        const order = await req.user.getOrders({ where: { orderId: order_id } });
        order[0].paymentId = req.body.payment_id;
        order[0].status = 'SUCCESS';
        const updateOrder = await order[0].save();

        res.status(201).json({ token: newToken, order: updateOrder });
    }
    catch (err) {
        console.log(err);
    }
}