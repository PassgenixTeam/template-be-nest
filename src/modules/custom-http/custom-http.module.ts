import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';
import { CreateAxiosDefaults } from 'axios';

@Module({})
export class CustomHttpModule {
  static register(options: CreateAxiosDefaults = {}): DynamicModule {
    const providers: Provider<any>[] = [
      {
        provide: CustomHttpService,
        useFactory: () => {
          return new CustomHttpService(options);
        },
      },
    ];

    return {
      module: CustomHttpModule,
      providers: providers,
      exports: providers,
    };
  }
}
