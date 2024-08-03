import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(
    @Body()
    body: {
      spotNumber: number;
      customerName: string;
      customerPlateNumber: string;
    },
  ) {
    const { spotNumber, customerName, customerPlateNumber } = body;
    return this.ticketService.create(
      spotNumber,
      customerName,
      customerPlateNumber,
    );
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketService.remove(id);
  }
}
