import express from 'express';
//var express = require('express');
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export default class Server {
  public app: express.Application;
  // public app: any;

  constructor() {
    useContainer(Container);
    this.app = express();
    this.config();
    this.setControllers();
  }

  public config() {
    this.app.use(logger('combined'));
    this.app.use(helmet());
    this.app.use(cors());
  }

  public setControllers() {
    useExpressServer(this.app, {
      routePrefix: 'api',
      controllers: [__dirname + '/controllers/**/*.js'],
      middlewares: [__dirname + '/middlewares/**/*.js'],
    });
  }

  public run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }
}
