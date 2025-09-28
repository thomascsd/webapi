import { County } from '../../models/members/County';
import { Distinct } from '../../models/members/Distinct';
import { DataService } from '@thomascsd/stools';

const BASE_ID = 'appYytqUfVu81cjXn';

export class CountyService {
  constructor(private db: DataService) {}

  async getCounties(): Promise<County[]> {
    const counties = this.db.getDatas<County>(BASE_ID, 'county');
    return counties;
  }

  async getDistincts(countyCode: string): Promise<Distinct[]> {
    const distincts = await this.db.getDatas<Distinct>(BASE_ID, 'distinct', {
      filterByFormula: `{countyCode}=${countyCode}`,
    });
    return distincts;
  }
}
