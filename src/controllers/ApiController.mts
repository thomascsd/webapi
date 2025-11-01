import { Controller } from '@tsed/di';
import { UseBefore } from '@tsed/platform-middlewares';
import { ImageFileController } from './images/ImageFileController.mjs';
import { ForecastController } from './weathers/forcastController.mjs';
import { ContactController } from './ContactController.mjs';
import { NasaController } from './nasa/NasaController.mjs';
import { AdminController } from './vehicle-driving-training/AdminController.mjs';
import { ApiKeyMiddleware } from '@middlewares/apiKeyMiddleware.mjs';
import { MemberController } from './MemberController.mjs';
import { CountyController } from './CountryController.mjs';

@UseBefore(ApiKeyMiddleware)
@Controller({
  path: '/api',
  children: [
    ImageFileController,
    ForecastController,
    ContactController,
    NasaController,
    AdminController,
    CountyController,
    MemberController,
  ],
})
export class ApiController {}
