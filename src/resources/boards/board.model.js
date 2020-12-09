const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards' }
);

const Board = mongoose.model('Board', boardSchema);

function toResponse(board) {
  return {
    id: board._id,
    title: board.title,
    columns: board.columns
  }
}

module.exports = { Board, toResponse }
