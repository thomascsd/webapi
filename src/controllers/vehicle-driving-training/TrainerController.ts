import { BodyParams, Get, Controller, Post } from '@tsed/common';
import { Trainer } from '../../models/vehicle-driving-training';
import { TrainerService } from '../../services/vehicle-driving-training/TrainerService';

@Controller('trainer')
export class TrainerCoontroller {
  constructor(private trainerService: TrainerService) {}

  @Get()
  getTrainers(): Promise<Trainer[]> {
    return this.trainerService.getTrainers();
  }

  @Post('/insert')
  insertTrainer(@BodyParams() trainer: Trainer) {
    return this.trainerService.saveTrainer(trainer);
  }
}
