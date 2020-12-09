const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./logger');
const errorHandler = require('./utils/errorHandler');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const login = require('./resources/users/user.login');
const checkToken = require('./utils/checkToken');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info({
    url: req.url,
    method: req.method,
    queryParameters: req.query,
    body: req.body
  });
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', login);

app.use(checkToken); //all routes below this string needs authorization
app.use('/users', userRouter);
app.use('/boards', boardRouter.use('/:boardId/tasks', taskRouter));

app.use(errorHandler);

module.exports = app;
