import { Controller, Get } from '@tsed/common';
import { NasaService } from '../../services/nasa/NasaService';

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
}
