import { BaseModel } from '@thomascsd/stools';
import { Property } from '@tsed/schema';

export class County extends BaseModel {
  @Property()
  countyCode: string = '';

  @Property()
  countyName: string = '';
}
