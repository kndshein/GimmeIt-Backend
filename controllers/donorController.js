const express = require('express')
const router = express.Router()

const Donor = require('../models/donorModel')
const Item = require('../models/itemModel')

router.get('/', async (req,res) => {
    Donor.find({}).populate("items").then(allDonors =>{
        res.json(allDonors)
    }).catch(err => res.json({status: 400, err: err}))
})

router.get('/id/:id', async (req,res) =>{
    Donor.findById(req.params.id).populate("items").then(donor =>{
        res.json(donor)
    }).catch(err => res.json({status: 400, err: err}))
})

router.post('/', async (req,res) =>{
    const donor = req.body

    Donor.create(donor).then(() => {
        Donor.find({}).populate("items").then(allDonors =>{
            res.json(allDonors)
        }).catch(err => res.json({status: 400, err: err}))
    })
})

module.exports = router;