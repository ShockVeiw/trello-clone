const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();
const create = params => usersRepo.create(params);
const get = id => usersRepo.get(id);
const update = (id, newParams) => usersRepo.update(id, newParams);
const remove = id => usersRepo.remove(id);
const login = params => usersRepo.login(params);

module.exports = { getAll, get, create, update, remove, login };
