import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Parking } from 'src/parking/entities/parking.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Parking])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
