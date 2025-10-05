import { BaseModel } from '@thomascsd/stools';

export interface County extends BaseModel {
  countyCode: string;
  countyName: string;
}
