import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config';

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      ],
      validationSchema: Joi.object({
        AMQP_USER: Joi.string().required(),
        AMQP_PASSWORD: Joi.string().required(),
        AMQP_HOST: Joi.string().required(),
        AMQP_PORT: Joi.number().required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    CourseModule,
    DatabaseModule,
  ],
})
export class AppModule {}
