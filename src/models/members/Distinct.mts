import { BaseModel } from '@thomascsd/stools';
import { Property } from '@tsed/schema';

export class Distinct extends BaseModel {
  @Property()
  countyCode: string = '';

  @Property()
  countyName: string = '';

  @Property()
  distinctName: string = '';
}
