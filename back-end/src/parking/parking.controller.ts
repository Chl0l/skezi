import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Post()
  create(@Body('spotNumber') spotNumber: number) {
    return this.parkingService.create(spotNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('isOccupied') isOccupied: boolean) {
    return this.parkingService.update(+id, isOccupied);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
