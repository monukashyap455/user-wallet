const router = require("express").Router();
const transcationController = require("../controller/transcation");
const {verifyToken} = require("../middleware/verifyToken");





router.post('/amount/add',verifyToken,transcationController.amountAdd)

router.post('/pay',verifyToken,transcationController.payAmount)

router.get('/transction',verifyToken,transcationController.getAllTransctionHistory)




module.exports = router;