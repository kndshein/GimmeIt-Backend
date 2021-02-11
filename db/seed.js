const Donor = require("../models/donorModel");
const Item = require("../models/itemModel");

Donor.find({}).remove(() => {
  Item.find({}).remove(() => {
    let harry = Donor.create({
      username: "Harry7",
      password: "Thechosen1",
      firstName: "harry",
      lastName: "potter",
      email: "theboywholived@gmail.com",
    }).then((donor) => {
      Promise.all([
        Item.create({
          img:
            "https://www.picclickimg.com/d/l400/pict/163453975560_/Sneakoscope-The-Wizarding-World-Of-Harry-Potter-Universal.jpg",
          name: "Old Sneak-a-scope",
          description: "Dingey old sneak-o-scope, barley works.",
          shipping: [],
          donor: donor._id,
        }).then((item) => {
          donor.items.push(item);
        }),
      ]).then(() => {
        donor.save();
      });
    });
    let ron = Donor.create({
      username: "ron7",
      password: "ChudleyCannons",
      firstName: "runauld",
      lastName: "wozlib",
      email: "weasilboy@gmail.com",
    }).then((donor) => {
      Promise.all([
        Item.create({
          img:
            "https://i.pinimg.com/originals/be/bc/16/bebc1667db44e9b3c9f09c400356a5cc.jpg",
          name: "deluminator",
          description:
            "Deluminator designed by Albus Dumbldor, puts out all your lights with one click.",
          shipping: [],
          donor: donor._id,
        }).then((item) => {
          donor.items.push(item);
        }),
      ]).then(() => {
        donor.save();
      });
    });
  });
});
