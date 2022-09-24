import { JsonController, Get, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';
import { Trainer } from '../../models/vehicle-driving-training/trainer';

@Inject()
@JsonController()
export class TrainerController {
  constructor() {}
  @Get('/list')
  getTrainers() {}

  @Post('/save')
  saveTrainer(@Body() Contact: Trainer) {}
}
