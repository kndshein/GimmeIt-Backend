const express = require("express");
const router = express.Router();

const Donor = require("../models/donorModel");
const Item = require("../models/itemModel");

//Finds all donors
router.get("/", async (req, res) => {
  Donor.find({})
    .populate("items")
    .then((allDonors) => {
      res.json(allDonors);
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//Find a single donor by id
router.get("/id/:id", async (req, res) => {
  Donor.findById(req.params.id)
    .populate("items")
    .then((donor) => {
      res.json(donor);
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//Add a new donor
router.post("/", async (req, res) => {
  const donor = req.body;
  Donor.create(donor).then(() => {
    Donor.find({})
      .populate("items")
      .then((allDonors) => {
        res.json(allDonors);
      })
      .catch((err) => res.json({ status: 400, err: err }));
  });
});

//Update a single donor by id
router.put('/id/:id', async (req,res) => {
    Donor.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(() =>{
        Donor.find({}).populate("items").then(allDonors => {
            res.json(allDonors)
        }).catch(err => res.json({status: 400, err: err}))
    }).catch(err => res.json({status: 400, err: err}))
})

//
//Add an item to specific donor by id
router.get("/id/create/:id", async (req, res) => {
  const item = req.body;
  Donor.findById(req.params.id)
    .populate("items")
    .then((donor) => {
      Promise.all([
        Item.create({
          img: req.body.img,
          name: req.body.name,
          description: req.body.description,
          shipping: req.body.shipping,
          donor: donor._id,
        }).then((item) => {
          donor.items.push(item);
        }),
      ])
        .then(() => {
          donor.save();
        })
        .then(() => {
          res.json(donor);
        });
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

module.exports = router;
