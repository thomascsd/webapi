import { JsonController, Get, Post, UploadedFile } from 'routing-controllers';
import { Service } from 'typedi';
import * as multer from 'multer';
import { ImageFileService } from '../../services/images/ImageFileService';

const fileUploadOptions = {
  storage: multer.memoryStorage(),
};

@JsonController()
@Service()
export class ImageFileController {
  constructor(private fileService: ImageFileService) {}

  @Post('/images/Upload')
  upload(@UploadedFile('fileData', { options: fileUploadOptions }) file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Get('/Image/Files')
  getFiles() {
    return this.fileService.getFiles();
  }
}
