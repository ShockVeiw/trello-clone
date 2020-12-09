const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const asyncWrap = require('./asyncWrapper');
const { AuthorizationError } = require('./customErrors');

module.exports = asyncWrap(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const [tokenType, token] = authorizationHeader.split(' ');
    if (tokenType === 'Bearer') {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }  
    throw new AuthorizationError("Wrong token type!");
  }  
  throw new AuthorizationError("Authorization header was not given!");
});