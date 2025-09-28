import { Service } from '@tsed/di';
import { BaseDataService } from '../DataService';
import { Trainer } from '../../models/vehicle-driving-training';
import { TrainerRes } from '../../dtos/vehicle-driving-training/trainerRes';
import { BaseObj } from '../../dtos';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class TrainerService {
  constructor(private db: BaseDataService) {}
  async getTrainers(): Promise<TrainerRes[]> {
    const trainerRes: TrainerRes[] = [];

    const data = await this.db.getData<Trainer>(this.db.apiKey, BASE_ID, 'trainer');

    for (const item of data) {
      trainerRes.push({
        name: item.name,
        mobile: item.mobile,
        custId: item.custId,
      });
    }

    return trainerRes;
  }
  async saveTrainer(trainer: Trainer): Promise<BaseObj> {
    await this.db.saveData(this.db.apiKey, BASE_ID, 'trainer', trainer);

    return { success: true };
  }
}
