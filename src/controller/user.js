const user = require("../model/user");
const login = require("../model/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');



// user registration 
module.exports.userRegister = async (req, res) => {
    try {
        const { username, email, mobile, password, conformPassword, } = req.body

        const userCheck = await user.find({ email: email })

        if (userCheck != 0) {
            return res.status(404).json("user already exist")
        }
        // valid email check     
        if (!(validator.isEmail(email))) {
            return res.status(402).json(" wrong email id please use the current email")
        };

        // conform password check
        if (!(password == conformPassword)) {
            return res.status(400).json("conform password are not matched ")
        }
        // strong password check
        const strongPassword = (validator.isStrongPassword(password, [{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }]))
        if (!strongPassword) {
            return res.status(404).json("please filled the strong password")
        };

        // // //password hased
        const salt = await bcrypt.genSalt(10);
        hased = await bcrypt.hash(password, salt);

        const userDb = new user({
            username,
            email,
            mobile,
            password: hased,

        })
        const loginUser = new login({
            userId: userDb._id,
            email: userDb.email,
        })
        await loginUser.save();
        await userDb.save();
        if (!userDb) {
            return res.status(404).json(" signup something went wrong !")
        };

        res.status(200).json("registration sucessful")
    } catch (error) {
        res.send(error)

    }
}

// user login 
module.exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        if(req.cookies.jwt){
            return res.status(402).json("you are already login")
        }

        const userDb = await user.findOne({ email: email });
       
        if (userDb == null) {
            return res.status(400).json("Email not found please try again ")
        }

        if (userDb.verified == false) {
            return res.send("your account is not verifyed please verifyed the account")
        }
        bcrypt.compare(password, userDb.password, async (err, result) => {

            if (result == false) {
                return res.status(401).json({ msg: "invalid password please try again " })
            }
        })
        const token = jwt.sign({ userDb_id: userDb._id }, 'secretKey', { expiresIn: "24h" });
        // console.log(token);
        const userFind = await login.findOne({ userId: userDb._id })
        if(userFind == null){
            return res.status(402).json("something went wrong ")
        }

        userFind.tokens = userFind.tokens.concat({ token: token });
        // console.log(userFind.tokens);
        await userFind.save()
        res.cookie('jwt', token)
        res.status(200).json(token);

    } catch (error) {
        res.status(500).send(error)
    }
}

// // user logout
module.exports.userLogout = async (req, res) => {
    try {

        const token = req.cookies.jwt
        const loginUsers = req.loginUsers
        if(loginUsers==null){
            return res.status(500).json("please provide the token")
        }
        loginUsers.tokens = loginUsers.tokens.filter((e) => {
            return e.token != token
        })
        res.clearCookie("jwt");
        await req.loginUsers.save();
        res.send("logout success");

    } catch (error) {
        res.send(error)
    }
}

//  get login user profile 
module.exports.profile = async (req, res) => {
    try {
        const loginUser = req.loginUsers
        const users = await user.findOne({ _id: loginUser.loginId })

        res.status(400).json(
            {
                "Name": users.username,
                "Mobile": users.mobile,
                "Email": users.email,
                "Status": users.verified
            }
        )
    } catch (error) {
        res.send(error)
    }
}
