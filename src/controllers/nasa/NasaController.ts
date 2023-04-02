import { Controller, Get } from '@tsed/common';

@Controller('/nasa')
export class NasaController {
  @Get()
  stars() {}
}
