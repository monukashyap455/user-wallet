const mongoose = require("mongoose");


const transctionSchema = new mongoose.Schema({
    userId: { type: "ObjectId", required: true },
    amount: { type: String, required: true },
    status: { type: String, default: false },
    to: { type: String, },
    from: { type: String, }

}, { timestamps: true });
module.exports = new mongoose.model("transction", transctionSchema);



