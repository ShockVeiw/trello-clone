const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const create = (params, boardId) => tasksRepo.create(params, boardId);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const update = (boardId, taskId, newParams) => tasksRepo.update(boardId, taskId, newParams);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, create, get, update, remove };
