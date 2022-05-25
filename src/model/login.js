const mongoose = require("mongoose");
const ip = require("ip");

let loginUser = mongoose.Schema({

    userId: {
        type: 'ObjectId',
        ref:'user'
    },
    email: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ],
}, { timestamps: true });
module.exports = mongoose.model("login", loginUser);