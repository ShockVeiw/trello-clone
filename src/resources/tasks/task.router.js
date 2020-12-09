const router = require('express').Router({ mergeParams: true });
const asyncWrap = require('../../utils/asyncWrapper');
const tasksService = require('./task.service');
const { toResponse } = require('./task.model');

router
  .route('/')
  .get(asyncWrap(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(toResponse));
  }))
  .post(asyncWrap(async (req, res) => {
    const task = await tasksService.create(req.body, req.params.boardId);
    res.json(toResponse(task));
  }));

router
  .route('/:taskId')
  .get(asyncWrap(async (req, res) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(toResponse(task));
  }))
  .put(asyncWrap(async (req, res) => {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.json(toResponse(task));
  }))
  .delete(asyncWrap(async (req, res) => {
    const isRemoved = await tasksService.remove(
      req.params.boardId,
      req.params.taskId
    );
    res.sendStatus(204);
  }));

module.exports = router;
