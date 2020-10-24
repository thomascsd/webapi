import * as express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

export default class Server {
  public app: express.Application;

  constructor() {
    useContainer(Container);
    this.app = express();
    this.config();
    this.route();
    this.setControllers();
  }

  public config() {
    this.app.use(logger('combined'));
    this.app.use(helmet());
    this.app.use(cors());
  }

  public route() {
    this.app.get('*', (req, res, next) => {});
  }

  public setControllers() {
    useExpressServer(this.app, {
      routePrefix: 'api',
      // controllers: [ContactController],
    });
  }

  public run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }
}
