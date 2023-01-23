import { Controller } from '@tsed/di';
import { ImageFileController } from './images/ImageFileController';
import { ForecastController } from './weathers/forcastController';
import { ContactController } from './ContactController';

@Controller({
  path: '/api',
  children: [ImageFileController, ForecastController, ContactController],
})
export class ApiController {}
