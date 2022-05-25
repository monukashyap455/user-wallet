const res = require("express/lib/response");
const mongoose = require("mongoose");


module.exports = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, function (err) {
            if (err) {
                console.log("connection error:", err);
            } else {
                console.log("MongoDB connection successful");
            }
        })

    } catch (error) {
        res.send(error)

    }

}

