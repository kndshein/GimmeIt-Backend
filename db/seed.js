const Donor = require("../models/donorModel")
const Item = require("../models/itemModel") 

Donor.find({}).remove(() => {
    Item.find({}).remove(() => {
      let harry = Donor.create({
        username: "Harry7",
        password: "Thechosen1",
        firstName: 'harry',
        lastName: 'potter',
        email: "theboywholived@gmail.com"
      }).then(donor => {
        Promise.all([
          Item.create({
            img: 'nothing',
            name: 'Old Sneak-a-scope',
            description: "Dingey old sneak-o-scope, barley works.",
            shipping: "",
            donor: donor._id
          }).then(item => {
            donor.items.push(item)
          })
        ]).then(() => {
          donor.save()
        })
      })
      let ron = Donor.create({
        username: "ron7",
        password: "ChudleyCannons",
        firstName: 'runauld',
        lastName: 'wozlib',
        email: "weasilboy@gmail.com"
      }).then(donor => {
        Promise.all([
          Item.create({
            img: 'nothing',
            name: 'deluminator',
            description: "Deluminator designed by Albus Dumbldor, puts out all your lights with one click.",
            shipping: "",
            donor: donor._id
          }).then(item => {
            donor.items.push(item)
          })
        ]).then(() => {
          donor.save()
        })
      })
    })
  })