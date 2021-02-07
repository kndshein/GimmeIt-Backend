const express = require("express");
const router = express.Router();

const Donor = require("../models/donorModel");
const Item = require("../models/itemModel");

//Find all items
router.get("/", async (req, res) => {
  Item.find({})
    .populate("donor")
    .then((allItems) => {
      res.json(allItems);
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//Find a single item by id
router.get("/id/:id", async (req, res) => {
  Item.findById(req.params.id)
    .populate("donor")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//Add a new item
router.post("/", async (req, res) => {
  const item = req.body;
  Item.create(item).then(() => {
    Item.find({})
      .populate("donor")
      .then((allItems) => {
        res.json(allItems);
      })
      .catch((err) => res.json({ status: 400, err: err }));
  });
});

//Update a single item by id
router.put("/id/:id", async (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      Item.find({})
        .populate("donor")
        .then((allItems) => {
          res.json(allItems);
        })
        .catch((err) => res.json({ status: 400, err: err }));
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

module.exports = router;
