import { DataService } from '@thomascsd/stools';
import { Constant, Service } from '@tsed/di';

@Service()
export class BaseDataService extends DataService {
  @Constant('envs.AIRTABLE_API')
  apiKey!: string;
}
