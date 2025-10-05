import { BodyParams, Get, Controller, Post } from '@tsed/common';
import { Authorize } from '@tsed/passport';
import { Trainer } from '@models/vehicle-driving-training/Index.mjs';
import { TrainerService } from '@services/vehicle-driving-training/TrainerService.mjs';
import { TrainerRes } from '@dtos/vehicle-driving-training/TrainerRes.mjs';

@Controller('trainer')
@Authorize('jwt')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @Get()
  getTrainers(): Promise<TrainerRes[]> {
    return this.trainerService.getTrainers();
  }

  @Post('/insert')
  insertTrainer(@BodyParams() trainer: Trainer) {
    return this.trainerService.saveTrainer(trainer);
  }
}
