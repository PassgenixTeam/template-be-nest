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
      // const filename = await this.executeBackup();

      const mimeType = 'application/sql';
      const buffer = createReadStream(
        resolve(process.cwd(), 'backups', 'backup-1689408706687.sql'),
      );

      console.log(
        resolve(process.cwd(), 'backups', 'backup-1689408706687.sql'),
      );

      const { data } = await this.driveService.uploadFile(
        'backup-1689408706687.sql',
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
    const filename = `backup-${time}.sql`;
    const command = `docker exec postgres pg_dump -U ${appConfig.database.MY_SQL.DB_USERNAME} -h ${appConfig.database.MY_SQL.DB_HOST} -p ${appConfig.database.MY_SQL.DB_PORT} -d ${appConfig.database.MY_SQL.DB_DATABASE_NAME} -f ${filename}`;

    return new Promise((resolve, reject) => {
      exec(command, (err, _stdout, stderr) => {
        if (err) {
          this.logger.error('Error: ', err);
          return reject(err);
        }
        if (stderr) {
          this.logger.verbose('stderr: ', stderr);
          return reject(stderr);
        }
        this.logger.verbose('Backup completed!');
        return resolve(filename);
      });
    });
  }
}
