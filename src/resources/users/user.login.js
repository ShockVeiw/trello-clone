const asyncWrap = require('../../utils/asyncWrapper');
const usersService = require('./user.service');

module.exports = asyncWrap(async (req, res) => {
  const token = await usersService.login(req.body);
  res.json(token);
});