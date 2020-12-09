const logger = require('../logger');

module.exports = async (err, req, res, next) => {
  logger.error({
    url: req.url,
    queryParameters: req.query,
    body: req.body,
    errorMessage: err.message
  });

  if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
    res.sendStatus(404);
    return;
  }

  if (err.name === "MongoError" && err.code === 11000) {
    res.status(400).json({ errorMessage: err.message });
    return;
  }

  if (err.name === "NotFoundUserDuringLoginError") {
    res.sendStatus(403);
    return;
  }

  if (err.name === "ValidationError") {
    res.sendStatus(400);
    return;
  }

  if (
    err.name === "JsonWebTokenError" ||
    err.name === "IncorrectLoginOrPasswordError" ||
    err.name === "AuthorizationError"
    ) {
    res.status(401).json({ errorMessage: err.message });
    return;
  }

  res.sendStatus(500);
}