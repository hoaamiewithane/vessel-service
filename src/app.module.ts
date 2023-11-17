import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './ship/entities/profile.entity';
import { Ship } from './ship/entities/ship.entity';
import { User } from './ship/entities/user.entity';
import { ShipModule } from './ship/ship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ShipModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env['DB_PORT'] as string),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      entities: [Ship, User, Profile],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
