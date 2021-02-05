const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const donorSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }]
})

const Donor = mongoose.model("Donor", donorSchema)
module.exports = Donor