import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from 'src/parking/entities/parking.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}

  async create(
    spotId: number,
    customerName: string,
    customerPlateNumber: string,
  ): Promise<Ticket> {
    const parkingSpot = await this.parkingRepository.findOneBy({ id: spotId });
    if (!parkingSpot || parkingSpot.isOccupied) {
      throw new Error('Parking spot not available');
    }

    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }

    if (parkingSpot.isOccupied) {
      throw new BadRequestException('Parking spot is already occupied');
    }

    parkingSpot.isOccupied = true;
    await this.parkingRepository.save(parkingSpot);

    const ticket = this.ticketRepository.create({
      parkingSpot,
      issuedAt: new Date(),
      customerName,
      customerPlateNumber,
    });

    return this.ticketRepository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['parkingSpot'] });
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: { id },
      relations: ['parkingSpot'],
    });
  }

  async remove(
    id: number,
    customerName: string,
    customerPlateNumber: string,
  ): Promise<void> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['parkingSpot'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (
      ticket.customerName === customerName &&
      ticket.customerPlateNumber === customerPlateNumber
    ) {
      const parkingSpot = ticket.parkingSpot;
      parkingSpot.isOccupied = false;

      await this.parkingRepository.save(parkingSpot);
      await this.ticketRepository.delete(id);
    } else {
      throw new BadRequestException('Invalid reservation details');
    }
  }
}
