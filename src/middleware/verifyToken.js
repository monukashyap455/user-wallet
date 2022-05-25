const jwt = require('jsonwebtoken');
const login = require('../model/login')
const user = require("../model/user");

const verifyToken = async (req, res, next) => {
    try {

        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
            // console.log(token);
        }
        if (token == null) {
            return res.status(403).json("token is require for this route");
        }
     
        const verifyUser = jwt.verify(token, "secretKey");
        // console.log(verifyUser);

        if (!verifyUser) {
            return res.status(403).json("Imvalid token please try again ");
        }
        // console.log("hello");

        const loginUsers = await login.findOne({ userId: verifyUser.userDb_id })
        // console.log(loginUsers);
        if (loginUsers.tokens == 0) {
            return res.status(404).json({ status: "Invalid token " })
        }
        req.loginUsers = loginUsers
        next()

    } catch (error) {
        res.send(error)
    }
}


module.exports = {verifyToken};