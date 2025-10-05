import { Controller, Get, PathParams } from '@tsed/common';
import { NasaService } from '../../services/nasa/NasaService.mjs';

@Controller('/nasa')
export class NasaController {
  constructor(private nasaService: NasaService) {}

  @Get('/pictureOfDay')
  getPictureOfDay() {
    return this.nasaService.getPictureOfDay();
  }

  @Get('/spacePictures')
  getSpacePictures() {
    return this.nasaService.getSpacePictures();
  }

  @Get('/asset/:nasaId')
  getAsset(@PathParams('nasaId') nasaId: string) {
    return this.nasaService.getAsset(nasaId);
  }
}
