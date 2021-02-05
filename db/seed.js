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
    })
  })