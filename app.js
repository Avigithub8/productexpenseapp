const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const helmet = require("helmet");
const env = require("dotenv");
env.config();


const sequelize = require("./util/database");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const Users = require("./models/users");
const Expenses = require("./models/expense");
const Orders = require("./models/order");
const Forgotpassword = require("./models/forgotpass");
const Download = require("./models/download");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.use("/user", signupRoutes);
app.use("/user", loginRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premiumFeatures", leaderboardRoutes);
app.use("/user", passwordRoutes);
app.use("/password", passwordRoutes);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet()); //for headers
app.use(compression()); //css,js compress size

app.use(morgan("combined", { stream: accessLogStream }));

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Users);

Users.hasMany(Download);
Download.belongsTo(Users);

const port = process.env.PORT || 4000;
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
