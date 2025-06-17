import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, host, port, password, database } =
          configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          // entities: [],
          synchronize: false,
          timezone: '0:00',
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
