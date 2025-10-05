import { BaseModel } from '@thomascsd/stools';

export interface Distinct extends BaseModel {
  countyCode: string;
  countyName: string;
  distinctName: string;
}
