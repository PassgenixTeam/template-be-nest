import { appConfig } from '@app/core/config';
import { DriveService } from '@app/upload';
import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { createReadStream } from 'fs';
import { resolve } from 'path';

@Injectable()
export class BackupDbService {
  constructor(private readonly driveService: DriveService) {
    this.backupDb();
  }

  private readonly logger = new Logger(BackupDbService.name);

  async backupDb() {
    try {
      const filename = await this.executeBackup();

      const mimeType = 'application/gzip';
      const buffer = createReadStream(
        resolve(process.cwd(), 'backups', filename),
      );

      const { data } = await this.driveService.uploadFile(
        filename,
        mimeType,
        buffer,
      );

      console.log(data);
    } catch (error) {
      this.logger.error('Error: ' + error);
    }
  }

  executeBackup(): Promise<string> {
    const time = new Date().getTime();
    const filename = `backup-${time}.gzip`;
    const command = `docker exec mongodb mongodump --uri="${appConfig.database.MONGO_DB.DB_URI}" --archive="${filename}" --gzip`;

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          this.logger.error('Exec error: ', err);
          return reject(err);
        }
        if (stderr) {
          this.logger.verbose('stderr: ', stderr);
        }
        if (stdout) {
          this.logger.verbose('stdout: ', stdout);
        }
        this.logger.verbose('Backup completed!');
        return resolve(filename);
      });
    });
  }
}
