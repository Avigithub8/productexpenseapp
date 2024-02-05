
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const crypto = require("crypto");
const localStorage=require('localStorage');

const secretKey =  crypto.randomBytes(32).toString("hex");; 

exports.secretKey = secretKey;

exports.authenticate = async (req, res, next) => {
    const token=localStorage.getItem("token")
   // const token = req.header('Authorization');
    // const token = req.cookies;

    console.log('token---',token)
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const userDetails = jwt.verify(token, secretKey);
        console.log("userDetails",userDetails)
        const user = await Users.findByPk(userDetails.userID);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
