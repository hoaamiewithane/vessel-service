import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShipService } from './ship.service';

@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @MessagePattern('create_ship')
  async handleCreateShip(@Payload() data: any) {
    try {
      return this.shipService.createShip(data);
    } catch (err) {
      throw new HttpException(
        err.message || 'Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @MessagePattern('get_ships')
  async getShips(
    @Payload()
    payload: {
      limit: number;
      offset: number;
      searchTerm?: string;
    },
  ) {
    return this.shipService.getShips(payload);
  }

  @MessagePattern('get_ship_by_id')
  async getShipById(@Payload() data: number) {
    try {
      return this.shipService.getShip(data);
    } catch (err) {
      throw new HttpException(
        err.message || 'Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
