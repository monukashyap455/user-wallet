


module.exports.wrongUrl = (req, res) => {
    res.status(404).json({
        error: "Bad request please use the correct url"
    })
}
