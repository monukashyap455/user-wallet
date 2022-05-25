const transction = require("../model/transcation");
const fraudTranscation = require("../model/fraudTranscation");
const wallet = require("../model/wallet");


module.exports.fraudTranscationAdd = async (req, res) => {
    try {
        const transcationID = req.body.transcationID

        const transcationIDFind = await transction.findOne({ _id: transcationID })

        const fraudDb = await fraudTranscation.find({ transcationId: transcationID })
     
        if (fraudDb.length < 1 ){
            const fraudData = new fraudTranscation({
                userId: transcationIDFind.userId,
                transcationId: transcationID
    
            })
            await fraudData.save();
            res.status(200).json("your requiest has been submited ")
        }else{
            const fraudDb1 = await fraudTranscation.findOne({ transcationId: transcationID })
            if(fraudDb1.transcationId.toString() === transcationID){
               return res.status(200).send("your request is already summited plz check the status")
            }else{
                const fraudData = new fraudTranscation({
                    userId: transcationIDFind.userId,
                    transcationId: transcationID
        
                })
                await fraudData.save();
                res.status(200).json("your requiest has been submited ")
            }

        }

    } catch (error) {
        res.send(error)

    }
}

module.exports.fraudTranscationreturn = async (req, res) => {
    try {
        const transcationID = req.body.transcationID
        const transcationFind = await transction.findOne({ _id: transcationID });
        const amount = parseFloat(-transcationFind.amount)
        const fraudTranscationFind = await fraudTranscation.findOne({ transcationId: transcationID });

        if (fraudTranscationFind.status != false) {
            return res.status(404).json("your transcation Id return already")
        }
        const reciverUserWallet = await wallet.findOne({ userId: transcationFind.to })

        const senderUserwallet = await wallet.findOne({ userId: transcationFind.userId })

        const senderUserAmount = senderUserwallet.amount + amount
        await wallet.findOneAndUpdate({ userId: senderUserwallet.userId }, {
            $set: {
                amount: senderUserAmount,
                updatedAt: Date.now(),
            }
        }, { new: true })

        const sendertranscationDb = new transction({
            userId: senderUserwallet.userId,
            amount: "+" + amount,
            status: true,
            from: reciverUserWallet.userId,
        })
        console.log(sendertranscationDb);
        await sendertranscationDb.save();
// // amount decuct reciver 
        const reciverUserAmount = reciverUserWallet.amount - amount
        await wallet.findOneAndUpdate({ userId: reciverUserWallet.userId }, {
            $set: {
                amount: reciverUserAmount,
                updatedAt: Date.now(),
            }
        }, { new: true });
// // fraud transcation approved by admin 
              const reciverTranscationDb = new transction({
            userId: reciverUserWallet.userId,
            amount: "-" + amount,
            status: true,
            to: senderUserwallet.userId,
        })
        console.log(reciverTranscationDb);

        await fraudTranscation.findOneAndUpdate({ transcationId: transcationID }, {
            $set: {
                status: true,
                updatedAt: Date.now()
            }
        }, { new: true });
        await reciverTranscationDb.save();
        res.status(200).json("your fraud payment return success")

    } catch (error) {
        res.status(404).json(error)

    }
}

     

