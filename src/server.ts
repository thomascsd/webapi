import express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

export default class Server {
  public app: express.Application;

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
