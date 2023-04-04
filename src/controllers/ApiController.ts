import { Controller } from '@tsed/di';
import { ImageFileController } from './images/ImageFileController';
import { ForecastController } from './weathers/forcastController';
import { ContactController } from './ContactController';
import { NasaController } from './nasa/NasaController';

@Controller({
  path: '/api',
  children: [ImageFileController, ForecastController, ContactController, NasaController],
})
export class ApiController {}
