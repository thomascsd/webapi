import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
//var express = require('express');
import {
  useExpressServer,
  useContainer,
  getMetadataArgsStorage,
} from 'routing-controllers-extended';
import { routingControllersToSpec } from 'routing-controllers-extended-openapi';
import swaggerUiExpress from 'swagger-ui-express';
import { Container } from 'typedi';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { API_KEY_TOKEN } from '@thomascsd/stools';
import { ForecastController } from './controllers/weathers/forcastController';
import { ImageFileController } from './controllers/images/ImageFileController';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const routingControllerOptions = {
  routePrefix: 'api',
  controllers: [ForecastController, ImageFileController],
  middlewares: [__dirname + '/middlewares/**/*.js'],
};

export default class Server {
  app: express.Application;
  // public app: any;

  constructor() {
    useContainer(Container);
    this.app = express();
    this.config();
    this.setControllers();
    this.setApiDoc();
  }

  config() {
    this.app.use(logger('combined'));
    this.app.use(helmet());
    this.app.use(cors());

    Container.set(API_KEY_TOKEN, process.env.AIRTABLE_API);
  }

  setControllers() {
    useExpressServer(this.app, routingControllerOptions);
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

  run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }
}
