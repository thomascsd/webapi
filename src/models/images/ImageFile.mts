import { BaseModel } from '@thomascsd/stools';
export class ImageFile extends BaseModel {
  filename: string = '';
  size: number = 0;
  mimetype: string = '';
  content = '';
}
