import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { TodoController } from './controllers/todo/todo.controller';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { logger } from './middlewares/logger.middleware';

import { TodoModule } from './modules/todo/todo.module';
import { ModulesModule } from './auth/src/modules/modules.module';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.user'),
          password: configService.get('db.password'),
          database: configService.get('db.name'),
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes('/')
      .apply(logger)
      .exclude({
        path: '/todo/:id',
        method: RequestMethod.DELETE,
      })
      .forRoutes(TodoController);
  }
}
