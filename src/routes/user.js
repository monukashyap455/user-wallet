const router = require("express").Router();
const {verifyToken} = require("../middleware/verifyToken");
const userController = require("../controller/user")



router.post('/signup', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/logout',verifyToken,  userController.userLogout)

router.get('/profile', verifyToken, userController.profile)


module.exports = router;