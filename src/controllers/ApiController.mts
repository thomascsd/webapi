import { Controller } from '@tsed/di';
// import { ImageFileController } from './images/ImageFileController.mjs';
import { ForecastController } from './weathers/forcastController.mjs';
import { ContactController } from './ContactController.mjs';
import { NasaController } from './nasa/NasaController.mjs';
import { AdminController } from './vehicle-driving-training/AdminController.mjs';

@Controller({
  path: '/api',
  children: [
    // ImageFileController,
    ForecastController,
    ContactController,
    NasaController,
    AdminController,
  ],
})
export class ApiController {}
