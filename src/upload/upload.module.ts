import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers:[UploadService],
    controllers:[UploadController],
    imports: [UsersModule]   
})
export class UploadModule {}
