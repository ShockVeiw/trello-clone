const { Task } = require('./task.model');

const getAll = async boardId => await Task.find({ boardId: boardId });
const create = async (params, boardId) => {
  params.boardId = boardId;
  return await Task.create(new Task(params));
}
const get = async (boardId, taskId) => {
  const task = await Task.findOne({ boardId: boardId, _id: taskId });
  if (!task) throw Error('Cast to ObjectId failed');
  return task;
};
const update = async (boardId, taskId, newParams) => {
  await Task.updateOne({ boardId: boardId, _id: taskId }, newParams);
  return await get(boardId, taskId);
}
const remove = async (boardId, taskId) => Task.findOneAndDelete({ boardId: boardId, _id: taskId });

module.exports = { getAll, create, get, update, remove };
