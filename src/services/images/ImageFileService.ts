import { Service } from 'typedi';
import { PlatformMulterFile } from '@tsed/common';
import { BaseDataService } from '../DataService';
import { ImageFile } from '../../models/images/ImageFile';

@Service()
export class ImageFileService {
  constructor(private db: BaseDataService) {}

  getFiles(): Promise<ImageFile[]> {
    return this.db.getData<ImageFile>(this.db.apiKey, 'appEyFL0S9APmWraC', 'imageFile');
  }

  async upload(fileDatas: PlatformMulterFile[]) {
    const fileData = fileDatas[0];
    const imageFile = new ImageFile();
    // const buffer = fileData.buffer;
    // const image64 = buffer.toString('base64');
    // const length = 500;
    // let dataUrl = `data:${fileData.mimetype};base64,${image64}`;
    // let i = 0;
    // let columnIdex = 1;
    // let content = '';

    imageFile.filename = fileData.originalname;
    imageFile.mimetype = fileData.mimetype;
    imageFile.size = fileData.size;
    imageFile.content = '';

    // while (true) {
    //   if (dataUrl.length >= length) {
    //     content = dataUrl.substring(i, length);

    //     dataUrl = dataUrl.substring(i + length);
    //   }

    //   imageFile['content' + columnIdex] = content;

    //   i += length;
    //   columnIdex += 1;

    //   if (dataUrl.length < length) {
    //     break;
    //   }
    // }

    const res = await this.db.saveData<ImageFile>(
      this.db.apiKey,
      'appEyFL0S9APmWraC',
      'imageFile',
      imageFile,
    );

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
