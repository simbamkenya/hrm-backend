const errorHandler = async function (err, req, res, next) {
    res.status(500).send(err.message)  
}

module.exports= errorHandler;