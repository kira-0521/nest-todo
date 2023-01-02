import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('db.host'),
          port: configService.get<number>('db.port'),
          username: configService.get('db.user'),
          password: configService.get('db.password'),
          database: configService.get('db.name'),
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
      // useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
