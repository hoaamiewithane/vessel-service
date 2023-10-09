import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from 'src/constants';
import { Like, Repository } from 'typeorm';
import { shipDto } from './dto/ship.dto';
import { Ship } from './entities/ship.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ShipService implements OnModuleInit {
  constructor(
    @Inject(USER_SERVICE) private readonly gateWayClient: ClientKafka,

    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createShip(payload: shipDto) {
    try {
      const users: any = [];
      for (const userId of payload.users) {
        const user = await lastValueFrom(
          this.gateWayClient.send('find_one_user', userId),
        );
        users.push(user);
      }
      payload.users = users;
      return await this.shipRepository.save(payload);
    } catch (err) {
      throw new HttpException(
        err.message || 'Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getShip(id: number) {
    const res = await this.shipRepository
      .createQueryBuilder('ship')
      .leftJoinAndSelect('ship.users', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('ship.id = :id', { id })
      .select([
        'ship.id',
        'ship.name',
        'ship.maxWeight',
        'user.id',
        'user.username',
        'user.email',
        'user.role',
        'profile.id',
        'profile.firstName',
        'profile.lastName',
        'profile.gender',
      ])
      .getOne();
    return { ...res };
  }

  async getShips(payload: {
    limit: number;
    offset: number;
    searchTerm?: string;
  }) {
    const { limit, offset, searchTerm } = payload;
    console.log({ payload });
    return this.shipRepository.find({
      where: {
        ...(searchTerm && { name: Like(`%${searchTerm}%`) }),
      },
      take: limit,
      skip: offset,
      relations: ['users'],
    });
  }

  async onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('find_one_user');
    await this.gateWayClient.connect();
  }
}
