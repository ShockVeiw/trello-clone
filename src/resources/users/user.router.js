const router = require('express').Router();
const asyncWrap = require('../../utils/asyncWrapper');
const usersService = require('./user.service');
const { toResponse } = require('./user.model');

router
  .route('/')
  .get(asyncWrap(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(toResponse)); 
  }))
  .post(asyncWrap(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(toResponse(user));
  }));

router
  .route('/:id')
  .get(asyncWrap(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(toResponse(user));
  }))
  .put(asyncWrap(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(toResponse(user));
  }))
  .delete(asyncWrap(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  }));

module.exports = router;
