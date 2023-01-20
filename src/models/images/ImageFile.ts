import { BaseModel } from '@thomascsd/stools-models';
export class ImageFile extends BaseModel {
  filename: string = '';
  size: number = 0;
  mimetype: string = '';
}
