import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Body,
    UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getAchievementId } from '../utils/labels';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';
import { Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { uploadDto } from './upload.dto';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService, private userService: UsersService) { }

    @UseGuards(AuthGuard)
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
        @Body() Body: uploadDto, @Req() req: AuthenticatedRequest) 
        {
        const { logro_id, puntos, operation } = Body;
        const  user_id = req.user.sub;
        const puntosNumber = Number(puntos);

        if (!file) {
            throw new BadRequestException('File upload failed');
        }
        console.log(logro_id, "Achievement ID")
        const fileName = `${Date.now()}-${file.originalname}`
        

        const imageBase64 = await this.uploadService.convertImageToBase64(file.path);

        const detectedLabels = await this.uploadService.processImageWithApiKey(imageBase64);
        console.log(detectedLabels, "Labels")
        const achievementId = getAchievementId(logro_id);

        const expectedLabels = achievementId;
        console.log(expectedLabels, "Expected Labels")
        const isValid = detectedLabels.some((label) => expectedLabels.includes(label));

        if (isValid) {
            const s3Url = await this.uploadService.uploadFileToS3(file.path, fileName);
            console.log(user_id, logro_id);
            await this.userService.addUserLogro(user_id, logro_id);
            await this.userService.modifyUserScore(user_id, puntosNumber, operation);
            return {
                message: isValid
                    ? 'Felicidades ¡Logro completado!'
                    : 'La imagen no cumple los requisitos para el logro :C',
                detectedLabels,
                s3Url,
            };
        }else{
            return {message:'La imagen no cumple los requisitos para el logro :C'}
        }
    }
}
