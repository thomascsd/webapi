import { BaseModel } from '@thomascsd/stools-models';
export class ImageFile extends BaseModel {
  filename: string = '';
  size: number = 0;
  mimetype: string = '';
  content1 = '';
  content2 = '';
  content3 = '';
  content4 = '';
}
