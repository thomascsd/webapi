import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
//var express = require('express');
import { useExpressServer, useContainer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUiExpress from 'swagger-ui-express';
import { Container } from 'typedi';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { API_KEY_TOKEN } from '@thomascsd/stools';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const routingControllerOptions = {
  routePrefix: 'api',
  controllers: [__dirname + '/controllers/**/*.js'],
  middlewares: [__dirname + '/middlewares/**/*.js'],
};

const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

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
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllerOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
      },
    });

    this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

  run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }
}
