const router = require("express").Router();
const walletController = require("../controller/wallet");
const {verifyToken} = require("../middleware/verifyToken");



router.post('/wallet/create', verifyToken, walletController.walletCreate)

router.post('/wallet/active', verifyToken, walletController.walletLogin)


router.get('/amount',verifyToken,walletController.getAmount)


module.exports = router;