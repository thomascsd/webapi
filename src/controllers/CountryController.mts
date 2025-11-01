import { CountyService } from '@services/member/CountryService.mjs';
import { Controller, inject } from '@tsed/di';
import { PathParams } from '@tsed/platform-params';
import { Get } from '@tsed/schema';

@Controller({
  path: '/county',
})
export class CountyController {
  private countryService: CountyService = inject(CountyService);

  @Get('/counties')
  getCountries() {
    return this.countryService.getCounties();
  }

  @Get('/districts/:countyCode')
  getDistricts(@PathParams('countyCode') countyCode: string) {
    return this.countryService.getDistincts(countyCode);
  }
}
