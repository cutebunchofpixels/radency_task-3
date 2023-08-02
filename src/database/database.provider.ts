import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const DATA_SOURCE_INJECTION_TOKEN = Symbol(
  'DATA_SOURCE_INJECTION_TOKEN',
);

export const databaseProvider = {
  inject: [ConfigService],
  provide: DATA_SOURCE_INJECTION_TOKEN,
  useFactory: async (config: ConfigService) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
    });

    return dataSource.initialize();
  },
};
