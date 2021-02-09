const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Donor = require("../models/donorModel");
const Item = require("../models/itemModel");

const { registerValidation, loginValidation } = require("../validation");
const verifyToken = require("./validate-token");

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

//#region Deprecated POST route for adding donor
//Add a new donor
// router.post("/", async (req, res) => {
//   const donor = req.body;
//   Donor.create(donor).then(() => {
//     Donor.find({})
//       .populate("items")
//       .then((allDonors) => {
//         res.json(allDonors);
//       })
//       .catch((err) => res.json({ status: 400, err: err }));
//   });
// });
//#endregion

//Update a single donor by id
router.put("/id/:id", async (req, res) => {
  Donor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      Donor.find({})
        .populate("items")
        .then((allDonors) => {
          res.json(allDonors);
        })
        .catch((err) => res.json({ status: 400, err: err }));
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//Add an item to specific donor by id
router.get("/id/create/:id", verifyToken, async (req, res) => {
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

// Registration Router
router.post("/register", async (req, res) => {
  // validate the donor
  const { error } = registerValidation(req.body);

  // if error, show why
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if email exists, throw error
  const isEmailExist = await Donor.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const donor = new Donor({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    items: [],
  });

  try {
    const savedDonor = await donor.save();
    res.json({ error: null, data: savedDonor });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login Router
router.post("/login", async (req, res) => {
  // validate the donor
  const { error } = loginValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const donor = await Donor.findOne({ email: req.body.email });

  // throw error when email is wrong
  if (!donor) return res.status(400).json({ error: "Email is wrong" });

  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, donor.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  // create token
  const token = jwt.sign(
    {
      username: donor.username,
      id: donor._id,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });
});

module.exports = router;
