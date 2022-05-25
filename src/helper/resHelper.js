

module.exports.successResponse = (res, msg) => {
    data = {
        status: 200,
        message: msg
    }
    return res.status(data.status).json(data)
},
    module.exports.errorResponse = (res, msg) => {
        data = {
            status: 500,
            message: msg
        }
        return res.status(data.status).json(data)
    },
    module.exports.successDataResponse = (res, data) => {
        data = {
            status: true,
            message: msg
        }
        return res.status(200).json(data)
    },
    module.exports.wrongUrl = (res, msg) => {
        data = {
            status: 502,
            message: msg
        }
        return res.status(data.status).json(data)
    }



