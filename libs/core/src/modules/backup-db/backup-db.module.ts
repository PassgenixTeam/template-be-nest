import { Module } from '@nestjs/common';
import { BackupDbService } from './backup-db.service';
import { BackupDbController } from './backup-db.controller';
import { DriveService } from '@app/upload';

@Module({
  controllers: [BackupDbController],
  providers: [BackupDbService, DriveService],
})
export class BackupDbModule {}
