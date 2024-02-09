const path = require("path");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middleware/auth");
const localStorage=require("localStorage");

const generateAccessToken = (id, name, isPremium) => {
  return jwt.sign({ userID: id, name: name, isPremium: isPremium }, secretKey);
};

exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
  //res.send('login.html')
};

exports.login = (req, res, next) => {
  const data = req.body;
  console.log("================",data);
  Users.findAll({ where: { email: data.email } })
    .then((user) => {
      // if user found
      if (user.length > 0) {
        // console.log(user.length);
        console.log("+++++++++++",user[0].id);
        bcrypt.compare(data.password, user[0].password, (err, result) => {
          if (err) {
            console.log("err", result);
            res.status(401).json({ message: "Something went wrong..." });
          }

          if (result === true) {
            // console.log('t', result);
            const loginSuccess = async () => {
              try {
                const premiumCheck = await user[0].getOrders({
                  where: { status: "SUCCESS" },
                });
                console.log(premiumCheck);
                if (premiumCheck.length > 0) {
                  console.log(1, premiumCheck[0].status);
                  const token=generateAccessToken(user[0].id, user[0].name, true);
                  console.log("to====", token);
                        localStorage.setItem("token",token)
                         res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 * 1000 });
                  //console.log('token--:', generateAccessToken(user[0].id, user[0].name, true))
                  res.json({
                    message: "User Logged in Successfully",
                    token: generateAccessToken(user[0].id, user[0].name, true),
                  });
                } else {
                  // console.log('token-:', generateAccessToken(user[0].id, user[0].name, false))
                  const token=generateAccessToken(user[0].id, user[0].name, false)
                  console.log("to===+", token);
                        localStorage.setItem("token",token)
                        res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 * 1000 });
                  res.json({
                    message: "User Logged in Successfully",
                    token: generateAccessToken(user[0].id, user[0].name, false),
                  });
                }
              } catch (err) {
                console.log(err);
              }
            };

            loginSuccess();
          } else {
            // console.log('fff', result);
            res.status(401).json({ message: "Wrong Password, Try Again" });
          }
        });
      }
      // if user not found
      else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch((err) => console.log(err));
};

