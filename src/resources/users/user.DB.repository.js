const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { NotFoundUserDuringLoginError, IncorrectLoginOrPasswordError } = require('../../utils/customErrors');
const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');

const SALT_ROUNDS = 10;

const getAll = async () => await User.find({});
const create = async params => {
  params.password = await bcrypt.hash(params.password, await bcrypt.genSalt(SALT_ROUNDS));
  return await User.create(new User(params));
}
const get = async id => {
  const user = await User.findById(id);
  if (!user) throw Error('Cast to ObjectId failed');
  return user;
}
const update = async (id, newParams) => {
  if (newParams.password) newParams.password = await bcrypt.hash(newParams.password, await bcrypt.genSalt(SALT_ROUNDS));
  await User.updateOne({ _id: id }, newParams);
  return await get(id);
}
const remove = async id => {
  await User.findOneAndDelete({ _id: id });
  await Task.updateMany({ userId: id }, { userId: null });
}
const login = async params => {
  const user = await User.findOne({ login: params.login });
  if (!user) throw new NotFoundUserDuringLoginError;
  if (await bcrypt.compare(params.password, user.password)) {
    const token = await jwt.sign(
      { userId: user._id, login: user.login },
      JWT_SECRET_KEY,
    );
    return { token: token }
  }
  throw new IncorrectLoginOrPasswordError("Incorrect login or password!");
}

module.exports = { getAll, create, get, update, remove, login }
