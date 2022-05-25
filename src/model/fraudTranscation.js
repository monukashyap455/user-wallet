const mongoose = require("mongoose");
const ip = require("ip");

let fraudTranscation = mongoose.Schema({

    transcationId: {
        type: "ObjectId",
        ref:"transction"
    },
    userId: {
        type: "ObjectId",
    },
    status: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("fraud", fraudTranscation);



