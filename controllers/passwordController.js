const path=require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();
const axios = require("axios");
//const shortUUID = require('short-uuid');

const Users = require('../models/users');
const Forgotpassword = require('../models/forgotpass');

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
console.log("api_key",sendinblueApiKey)
const sendinblueConfig = {
  headers: {
    "Content-Type": "application/json",
    "api-key": sendinblueApiKey,
  },
};

function generateResetToken() {
    const crypto = require("crypto");
    return crypto.randomBytes(8).toString("hex");
  }
exports.forgotpassoword = async (req, res, next) => {
    try {
        const email = req.body.email;

        const users = await Users.findAll({ where: { email: email } });
      
        if (!users.length) {
            throw new Error('User not found');
        }
        const user = users[0];
            
        const newUUID = uuidv4();
       //const shortId = shortUUID.generate();
       
       // const resetToken = generateResetToken();
        const response = await user.createForgotpassword(
            {
               uuid:newUUID,isActive:'true' 
            }
        )

        //console.log('Short UUID:', shortId);

        sendResetEmail(user.email, newUUID);

       
    }
    catch (err) {
        console.log('err: ', err);
    }
}


async function sendResetEmail(email, uuid) {
    const emailData = {
      sender: { name: "Avi", email: process.env.SENDER_EMAIL },
      to: [{ email: email }],
      subject: " Testing Email..",
      htmlContent: `
          <p>Click the following link to reset your password:</p>
          <a href="http://localhost:3000/password/resetPassword/${uuid}">Reset Password</a>
        `,
    };
  
   
    try {
      await axios.post(
        "https://api.sendinblue.com/v3/smtp/email",
        emailData,
        sendinblueConfig
      );
      console.log("Email sent successfully");
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
     
    }
  }


exports.resetPassword= (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/resetPassword.html"));
}

exports.resetPassword = async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        console.log(uuid);
        const response = await Forgotpassword.findAll({ where: { uuid: uuid } });
        if (response.length > 0) {
            const newPassoword = req.body.password;

            response[0].isActive = 'false';
            const result = await response[0].save();

            const user = await response[0].getUser();
            console.log(user.password);

            const saltRounds = 10;
            bcrypt.hash(newPassoword, saltRounds, async (err, hash) => {
                user.password = hash;
                const newRes = await user.save();

                res.status(200).json({ uuid: uuid });
            })
        } else {
            res.status(200).json({ message: 'Reset link is expired' });
        }
    }
    catch (err) {
        console.log(err);
    }
};




