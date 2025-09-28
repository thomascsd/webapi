import { County } from '../../models/members/County';
import { Distinct } from '../../models/members/Distinct';
import { BaseDataService } from '../DataService';

const BASE_ID = 'appYytqUfVu81cjXn';

export class CountyService {
  constructor(private db: BaseDataService) {}

  async getCounties(): Promise<County[]> {
    const counties = this.db.getData<County>(this.db.apiKey, BASE_ID, 'county');
    return counties;
  }

  async getDistincts(countyCode: string): Promise<Distinct[]> {
    const distincts = await this.db.getData<Distinct>(this.db.apiKey, BASE_ID, 'distinct', {
      filterByFormula: `{countyCode}=${countyCode}`,
    });
    return distincts;
  }
}
