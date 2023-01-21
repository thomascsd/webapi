import { JsonController, Get, Post, UploadedFile } from 'routing-controllers-extended';
import { Inject, Service } from 'typedi';
import * as multer from 'multer';
import { ImageFileService } from '../../services/images/ImageFileService';

const fileUploadOptions = {
  storage: multer.memoryStorage(),
};

@Service()
@JsonController()
export class ImageFileController {
  constructor(private fileService: ImageFileService) {}

  @Post('/images/upload')
  upload(@UploadedFile('fileData', { options: fileUploadOptions }) file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Get('/images/files')
  getFiles() {
    return this.fileService.getFiles();
  }
}
