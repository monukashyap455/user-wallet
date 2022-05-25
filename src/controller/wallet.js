const transcation = require("../model/transcation");
const wallet = require("../model/wallet");



module.exports.walletCreate = async (req, res) => {
    try {

        const currentLogin = req.loginUsers;
        console.log(currentLogin);
        // const mobile = req.body.mobile

        const walletFind = await wallet.findOne({ userId: currentLogin.userId }).populate('mobile');
        // console.log(walletFind.mobile);

        // if(walletFind.mobile === mobile){
        //     return res.status(500).json("this mobile number on already wallet create")
        // }


            if (walletFind !== null) {
                return res.status(404).json("your wallet account has been already created please login")
            }

            const walletData = new wallet({
                userId: currentLogin.userId,
              
            });

            await walletData.save();

        res.status(200).json("your wallet account has been created ");

    } catch (error) {
        res.send(error);

    }
}

module.exports.walletLogin = async (req, res) => {
    const currentLogin = req.loginUsers
    console.log(currentLogin);

    const walletFind = await wallet.findOne({ userId: currentLogin.userId })
    // console.log(walletFind);
    if (walletFind == null) {
        return res.status(404).json("your account not exits please register")
    }

    await wallet.findOneAndUpdate({ userId: currentLogin.userId }, {
        $set: {
            status: true,
            updatedAt: Date.now()
        }
    }, { new: true })
    res.status(200).json("your walllet account is active,use this")
}

module.exports.getAmount = async (req, res) => {
    try {
        const loginuser = req.loginUsers
        console.log(loginuser.userId);
        const amountData = await wallet.findOne({ userId: loginuser.userId })
        res.status(200).send(`amount : ${amountData.amount}`)

    } catch (error) {
        res.status(400).json(error)

    }
}















