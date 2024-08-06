import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './create-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(
    @Body()
    createTicketDto: CreateTicketDto,
  ) {
    const { spotId, customerName, customerPlateNumber } = createTicketDto;
    return this.ticketService.create(spotId, customerName, customerPlateNumber);
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
  async remove(
    @Param('id') id: number,
    @Body() body: { customerName: string; customerPlateNumber: string },
  ) {
    return this.ticketService.remove(
      id,
      body.customerName,
      body.customerPlateNumber,
    );
  }
}
