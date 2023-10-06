import { Injectable } from '@nestjs/common';
import { Ship } from './entities/ship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shipDto } from './dto/ship.dto';

@Injectable()
export class ShipService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
  ) {}

  async createShip(payload: shipDto) {
    return await this.shipRepository.save(payload);
  }
}
