import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 }, 
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/image\/(jpeg|png|jpg)/)) {
                    return callback(new BadRequestException('Invalid file type'), false);
                }
                callback(null, true);
            },
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File upload failed');
        }

        
        const imageBase64 = await this.uploadService.convertImageToBase64(file.path);

        const detectedLabels = await this.uploadService.processImageWithApiKey(imageBase64);
        console.log(detectedLabels, "Labels")

        const expectedLabels = ['Litter', 'Plastic', 'Trash', 'Beach', 'Bottle'];
        const isValid = detectedLabels.some((label) => expectedLabels.includes(label));

        return {
            message: isValid
                ? 'Image meets the criteria for the achievement!'
                : 'Image does not meet the criteria.',
            detectedLabels,
        };
    }
}
