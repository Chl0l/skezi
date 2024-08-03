import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { Parking } from './entities/parking.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parking, Ticket])],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule {}
