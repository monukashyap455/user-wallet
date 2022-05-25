const transcation = require("../model/transcation");
const wallet = require("../model/wallet");



module.exports.amountAdd = async (req, res) => {
    try {

        const activeUser = req.loginUsers
        console.log(activeUser.userId);
        const amount = req.body.amount

        const reciverWalletFind = await wallet.findOne({ userId: activeUser.userId })
        if (reciverWalletFind === null) {
            return res.status(404).json("user wallet not found ")
        }
        addAmonut = reciverWalletFind.amount + amount
        await wallet.findOneAndUpdate({ userId: reciverWalletFind.userId }, {
            $set: {
                amount: addAmonut,
                updatedAt: Date.now()
            }
        }, { new: true })

        const transcationData = new transcation({
            userId: activeUser.userId,
            amount: "+" + amount,
            status: true,
            from: activeUser.userId

        })
        // console.log(transcationData);

        await transcationData.save();
        res.status(200).json("amount has benn created ")
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports.payAmount = async (req, res) => {
    try {

        const loginUser = req.loginUsers
        const amount = req.body.amount
        console.log(loginUser.userId);


        //     //to user wallet find 
        const toUserWallet = await wallet.findOne({ userId: req.body.userId })
        // console.log(toUserWallet);

        if (toUserWallet == null) {
            return res.status(404).json("to user wallet account not exits")
        }
        if (toUserWallet.status == false) {
            return res.status(404).json("  transcation failed ,from user wallet account not verify ")
        }

        const loginUserWallet = await wallet.findOne({ userId: loginUser.userId })
        // console.log(loginUserWallet.amount);

        //check user wallet amount 
        if (loginUserWallet.amount < amount) {
            return res.status(404).json("your account balane is low ")

        }

        const loginuserAmount = loginUserWallet.amount - amount
        await wallet.findOneAndUpdate({ userId: loginUserWallet.userId }, {
            $set: {
                amount: loginuserAmount,
                updatedAt: Date.now()
            }
        }, { new: true })

        const loginTranscationDb = new transcation({
            userId: loginUserWallet.userId,
            amount: "-" + amount,
            status: true,
            to: toUserWallet.userId,
        })
        // console.log(loginTranscationDb);
        await loginTranscationDb.save();

        const toUserAmount = toUserWallet.amount + amount
        await wallet.findOneAndUpdate({ userId: toUserWallet.userId }, {
            $set: {
                amount: toUserAmount,
                updatedAt: Date.now()
            }
        }, { new: true });

        const reciverTranscation = new transcation({
            userId: toUserWallet.userId,
            amount: "+" + amount,
            status: true,
            from: loginUserWallet.userId,
        })
        // console.log(reciverTranscation);
        await reciverTranscation.save();
        res.status(200).json("amount transfer successful ")

    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports.getAllTransctionHistory = async (req, res) => {

    try {
        const loginuser = req.loginUsers

        const transcationData = await transcation.find({ userId: loginuser.userId })
        console.log(transcationData);
        res.status(200).send(transcationData)

    } catch (error) {
        res.status(400).json(error)

    }
}















