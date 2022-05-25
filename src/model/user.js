const mongoose = require("mongoose");
const ip = require("ip");

const userSchema = mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, unique: true, required: true, minLength: 10, maxlength: 12 },
    password: { type: String, required: true, minLength: 8 },
    conformPassword: { type: String, },
    verified: { type: Boolean, default: true },
    isAdmin: {
        type: Boolean,
        default: false
    },
    ip: { type: String, default: ip.address() },

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);