import { Service } from 'typedi';
import { DataService } from '../DataService';
import { ImageFile } from '../../models/images/ImageFile';
import { PlatformMulterFile } from '@tsed/common';

@Service()
export class ImageFileService {
  constructor(private db: DataService) {}

  getFiles(): Promise<ImageFile[]> {
    return this.db.getDatas<ImageFile>('appEyFL0S9APmWraC', 'imageFile');
  }

  async upload(fileDatas: PlatformMulterFile[]) {
    const fileData = fileDatas[0];
    const imageFile = new ImageFile();
    const buffer = fileData.buffer;
    const image64 = buffer.toString('base64');
    const dataUrl = `data:${fileData.mimetype};base64,${image64}`;

    imageFile.filename = fileData.originalname;
    imageFile.mimetype = fileData.mimetype;
    imageFile.size = fileData.size;
    imageFile.imageContent = dataUrl;
    const res = await this.db.saveData<ImageFile>('appEyFL0S9APmWraC', 'imageFile', imageFile);

    return res;
  }

  async delete(key: string) {
    // const client = filestack.init(process.env.FILESTACK_APIKEY);
    // const security = {
    //   policy: this.getPolicy(key),
    //   signature: this.getSignature(key)
    // };
    // const res = await client.remove(key, security);
    // return res;
  }
}
