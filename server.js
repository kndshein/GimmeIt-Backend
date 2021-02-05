require("dotenv").config();

const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const mongoose = require("./db/connection");
const donorRouter = require('./controllers/donorController')
const itemRouter = require('./controllers/itemController')

////// MIDDLEWARE //////
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/donors', donorRouter)
app.use('/items', itemRouter)

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Giveaway Test Route",
  });
});

////// ROUTES FOR CONTROLLERS //////

app.listen(PORT, () => console.log(`listening in on port: ${PORT}`));
