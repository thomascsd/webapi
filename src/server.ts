import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import { ApiController } from './controllers/ApiController';
import * as multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import { Container } from 'typedi';

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
})
export default class Server {
  @Inject()
  app!: PlatformApplication;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app.use(helmet());
    this.app.use(cors());
  }

  setApiDoc() {
    // const schemas = validationMetadatasToSchemas({
    //   refPointerPrefix: '#/components/schemas/',
    // });
    // const storage = getMetadataArgsStorage();
    // const spec = routingControllersToSpec(storage, routingControllerOptions, {
    //   components: {
    //     schemas,
    //     securitySchemes: {
    //       basicAuth: {
    //         scheme: 'basic',
    //         type: 'http',
    //       },
    //     },
    //   },
    //   info: {
    //     description: '',
    //     title: 'webapi',
    //     version: '1.0.0',
    //   },
    // });
    // this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

  // run(port: number) {
  //   this.app.listen(port, () => {
  //     console.log(`App run in Port: ${port}`);
  //   });
  // }
}
