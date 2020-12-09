const boardsRepo = require('./board.DB.repository');

const getAll = () => boardsRepo.getAll();
const create = params => boardsRepo.create(params);
const get = id => boardsRepo.get(id);
const update = (id, newParams) => boardsRepo.update(id, newParams);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, create, get, update, remove };
