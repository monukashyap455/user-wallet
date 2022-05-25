const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

    userId: { type: "ObjectId", ref: "user" },
    status: { type: Boolean, default: false },
    amount: { type: Number, default: 0 }

}, { timestamps: true });
module.exports = new mongoose.model("wallet", walletSchema);