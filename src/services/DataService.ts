import { DataService } from '@thomascsd/stools';
import { Service, Value } from '@tsed/di';

@Service()
export class BaseDataService extends DataService {
  @Value('AIRTABLE_API')
  apiKey!: string;
}
