const errorHandler = async function (err, req, res, next) {
  return res.sendStatus(500).send(err.message)
}

module.exports = errorHandler
