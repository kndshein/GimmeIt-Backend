const express = require('express')
const router = express.Router()

const Donor = require('../models/donorModel')
const Item = require('../models/itemModel')

router.get('/', async (req,res) => {
    Item.find({}).populate("donor").then(allItems =>{
        res.json(allItems)
    }).catch(err => res.json({status: 400, err: err}))
})

module.exports = router;