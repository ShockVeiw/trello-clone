const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => await Board.find({});
const create = async params => await Board.create(new Board(params));
const get = async id => {
  const board = await Board.findById(id);
  if (!board) throw Error('Cast to ObjectId failed');
  return board;
};
const update  = async (id, newParams) => {
  await Board.updateOne({ _id: id }, newParams);
  return await get(id);
}
const remove = async id => {
  await Board.findOneAndDelete({ _id: id });
  await Task.deleteMany({ boardId: id });
}

module.exports = { getAll, create, get, update, remove };
