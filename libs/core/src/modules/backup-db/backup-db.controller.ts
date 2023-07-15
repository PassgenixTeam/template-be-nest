import { Controller } from '@nestjs/common';
import { BackupDbService } from './backup-db.service';

@Controller('backup-db')
export class BackupDbController {
  constructor(readonly backupDbService: BackupDbService) {}
}
