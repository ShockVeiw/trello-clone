const router = require('express').Router();
const asyncWrap = require('../../utils/asyncWrapper');
const boardsService = require('./board.service');
const { toResponse } = require('./board.model');

router
  .route('/')
  .get(asyncWrap(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(toResponse));
  }))
  .post(asyncWrap(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.json(toResponse(board));
  }));

router
  .route('/:id')
  .get(asyncWrap(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(toResponse(board));
  }))
  .put(asyncWrap(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(toResponse(board));
  }))
  .delete(asyncWrap(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  }));

module.exports = router;
