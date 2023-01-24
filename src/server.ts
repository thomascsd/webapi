import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import { ApiController } from './controllers/ApiController';
import * as multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import '@tsed/swagger';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

@Configuration({
  mount: {
    '/': [ApiController],
  },
  httpPort: '127.0.0.1:8080',
  multer: {
    storage: multer.memoryStorage(),
  },
  swagger: [
    {
      path: '/docs',
      specVersion: '3.0.1',
    },
  ],
})
export default class Server {
  @Inject()
  app!: PlatformApplication;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app.use(helmet());
    this.app.use(cors());
  }
}
