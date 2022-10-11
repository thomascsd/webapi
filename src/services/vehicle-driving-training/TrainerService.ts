import { DataService } from '@thomascsd/stools';
import { Inject } from 'typedi';
import { Trainer } from '../../models/vehicle-driving-training/trainer';

const BASE_ID = 'appGxC02yunTmPXRh';

@Inject()
export class TrainerService {
  constructor(private db: DataService) {}
  async getTrainers(): Promise<Trainer[]> {
    return await this.db.getDatas<Trainer>(BASE_ID, 'trainer');
  }
  async saveTrainer(trainer: Trainer) {
    await this.db.saveData(BASE_ID, 'trainer', trainer);
  }
}
