const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    img: String, //Change to array later
    name: { type: String, required: true },
    description: String,
    available: { 
        type: Boolean, required: true , 
        default: true 
    },
    shipping: Array,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "Donor",
    }
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item