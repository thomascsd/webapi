import { Service } from '@tsed/di';
import { County } from '../../models/members/County.mjs';
import { Distinct } from '../../models/members/Distinct.mjs';
import { BaseDataService } from '../DataService.mjs';

const BASE_ID = 'appYytqUfVu81cjXn';

@Service()
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
