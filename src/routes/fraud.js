const router = require("express").Router();
const fraudTranscationController = require("../controller/fraudTranscation");



router.post('/fraud/add', fraudTranscationController.fraudTranscationAdd)

router.post('/fraud/return', fraudTranscationController.fraudTranscationreturn)


module.exports = router;