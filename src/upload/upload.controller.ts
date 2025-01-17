import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getAchievementId } from 'src/utils/labels';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
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
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('logroId') logroId: string,) {
        if (!file) {
            throw new BadRequestException('File upload failed');
        }
        console.log(logroId, "Achievement ID")
        const fileName = `${Date.now()}-${file.originalname}`
        

        const imageBase64 = await this.uploadService.convertImageToBase64(file.path);

        const detectedLabels = await this.uploadService.processImageWithApiKey(imageBase64);
        console.log(detectedLabels, "Labels")
        const achievementId = getAchievementId(logroId);

        const expectedLabels = achievementId;
        console.log(expectedLabels, "Expected Labels")
        const isValid = detectedLabels.some((label) => expectedLabels.includes(label));

        if (isValid) {
            const s3Url = await this.uploadService.uploadFileToS3(file.path, fileName);
            return {
                message: isValid
                    ? 'Felicidades ¡Logro completado!'
                    : 'La imagen no cumple los requisitos para el logro :C',
                detectedLabels,
                s3Url,
            };
        }else{
            return 'La imagen no cumple los requisitos para el logro :C'
        }
    }
}
