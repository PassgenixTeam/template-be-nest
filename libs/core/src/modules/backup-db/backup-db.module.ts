import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BackupDbService } from './backup-db.service';
import { BackupDbController } from './backup-db.controller';
import { DriveService } from '@app/upload';
export interface IBackupDbModule {
  isStart: boolean;
}
@Module({})
export class BackupDbModule {
  static start({ isStart }: IBackupDbModule): DynamicModule {
    const providers: Provider<any>[] = [
      {
        provide: BackupDbService,
        useFactory: () => {
          return new BackupDbService(isStart, new DriveService());
        },
      },
    ];
    return {
      module: BackupDbModule,
      controllers: [BackupDbController],
      providers: providers,
    };
  }
}
