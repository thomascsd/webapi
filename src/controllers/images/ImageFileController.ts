import { MultipartFile, PlatformMulterFile } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { ImageFileService } from '../../services/images/ImageFileService';

@Controller('/images')
export class ImageFileController {
  constructor(private fileService: ImageFileService) {}

  @Post('/upload')
  upload(@MultipartFile('fileData') file: PlatformMulterFile[]) {
    return this.fileService.upload(file);
  }

  @Get('/files')
  getFiles() {
    return this.fileService.getFiles();
  }
}
