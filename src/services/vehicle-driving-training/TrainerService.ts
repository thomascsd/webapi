import { DataService } from '@thomascsd/stools';
import { Service } from '@tsed/di';
import { Trainer } from '../../models/vehicle-driving-training';
import { TrainerRes } from '../../dtos/vehicle-driving-training/trainerRes';
import { BaseObj } from '../../dtos';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class TrainerService {
  constructor(private db: DataService) {}
  async getTrainers(): Promise<TrainerRes[]> {
    const trainerRes: TrainerRes[] = [];

    const data = await this.db.getDatas<Trainer>(BASE_ID, 'trainer');

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
    await this.db.saveData(BASE_ID, 'trainer', trainer);

    return { success: true };
  }
}
