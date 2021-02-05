const express = require('express')
const router = express.Router()

const Donor = require('../models/donorModel')
const Item = require('../models/itemModel')

router.get('/', async (req,res) => {
    Donor.find({}).populate("items").then(allDonors =>{
        res.json(allDonors)
    }).catch(err => res.json({status: 400, err: err}))
})

module.exports = router;