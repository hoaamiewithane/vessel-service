import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShipService } from './ship.service';

@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @MessagePattern('create_ship')
  async handleCreateShip(@Payload() data: any) {
    return this.shipService.createShip(data);
  }
}
