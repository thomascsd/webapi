import { QueryParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get } from '@tsed/schema';
import { ForecastService } from '../../services/weathers/forecastService';

@Controller('/forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get('/days')
  getDays(@QueryParams('lat') lat: number, @QueryParams('lon') lon: number) {
    return this.forecastService.getDays(lat, lon);
  }

  @Get('/location')
  getLocation(@QueryParams('city') city: string) {
    return this.forecastService.getLocation(city);
  }
}
