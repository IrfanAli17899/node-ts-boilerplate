process.env.TZ = '';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import { port } from ':config';
import logger from ':helpers/logger';
import { apiErrorHandler } from ':middlewares';
import routes from '../routes';

const app = express()
  .use(cors())
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use((_req, res, next) => { res.locals = {}; next(); })
  .use(routes)
  .use(apiErrorHandler);


const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

server.on('error', (err: Error & { code: string }) => {
  if (err.code === 'EACCES') {
    logger.error(`Port ${port} requires elevated privileges`);
    process.exit(1);
  }

  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use`);
    process.exit(1);
  }

  throw err;
});
