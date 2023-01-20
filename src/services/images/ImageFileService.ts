import { Inject } from 'typedi';
import { DataService } from '@thomascsd/stools';
import { ImageFile } from '../../models/images/ImageFile';

@Inject()
export class ImageFileService {
  constructor(private db: DataService) {}

  getFiles(): Promise<ImageFile[]> {
    return this.db.getDatas<ImageFile>('appEyFL0S9APmWraC', 'imageFile');
  }

  async upload(fileData: Express.Multer.File) {
    const imageFile = new ImageFile();
    // const path = join(process.cwd(), fileData.path);

    // rmSync(path, {
    //   force: true,
    // });

    imageFile.filename = fileData.originalname;
    imageFile.mimetype = fileData.mimetype;
    imageFile.size = fileData.size;
    imageFile.file = [
      {
        url: `${process.env.IMAGE_URL_DOMAIN}/${fileData.destination}/${fileData.filename}`,
        filename: fileData.originalname,
      },
    ];
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
