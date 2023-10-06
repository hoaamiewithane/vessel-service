import { NestFactory } from '@nestjs/core';
import { Partitioners } from 'kafkajs';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env['BROKER_URL'] as string],
        },
        consumer: {
          groupId: 'vessel-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  await app.listen();
}

bootstrap().then(() => {
  console.log('Vessel-service started');
});
