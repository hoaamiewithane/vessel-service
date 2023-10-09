import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partitioners } from 'kafkajs';
import { USER_SERVICE } from 'src/constants';
import { Ship } from './entities/ship.entity';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ship-service',
            brokers: [`localhost:9092`],
          },
          consumer: {
            groupId: 'ship-consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Ship, User]),
  ],
  controllers: [ShipController],
  providers: [ShipService],
})
export class ShipModule {}
