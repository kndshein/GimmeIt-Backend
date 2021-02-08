require("dotenv").config();

const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const mongoose = require("./db/connection");
const donorRouter = require('./controllers/donorController')
const itemRouter = require('./controllers/itemController')
const authRouter = require('./controllers/userController')
const dashboardRoutes = require("./controllers/dashboard");
const verifyToken = require("./controllers/validate-token");

////// MIDDLEWARE //////
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/donors', donorRouter)
app.use('/items', itemRouter)
app.use('/user', authRouter)
// this route is protected with token
app.use("/dashboard", verifyToken, dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Giveaway Test Route",
  });
});

////// ROUTES FOR CONTROLLERS //////

app.listen(PORT, () => console.log(`listening in on port: ${PORT}`));
