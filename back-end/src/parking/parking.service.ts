import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}

  findAll(): Promise<Parking[]> {
    return this.parkingRepository.find({ relations: ['tickets'] });
  }

  findOne(id: number): Promise<Parking> {
    return this.parkingRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
  }

  async create(spotNumber: number): Promise<Parking> {
    const newSpot = this.parkingRepository.create({
      spotNumber,
      isOccupied: false,
    });
    return this.parkingRepository.save(newSpot);
  }

  async update(id: number, isOccupied: boolean): Promise<Parking> {
    const spot = await this.parkingRepository.findOneBy({ id });
    spot.isOccupied = isOccupied;
    return this.parkingRepository.save(spot);
  }

  async remove(id: number): Promise<void> {
    await this.parkingRepository.delete(id);
  }

  async initializeParkingSpots(): Promise<void> {
    const count = await this.parkingRepository.count();
    if (count === 0) {
      const parkingSpots = [];
      for (let i = 1; i <= 36; i++) {
        parkingSpots.push(
          this.parkingRepository.create({ spotNumber: i, isOccupied: false }),
        );
      }
      await this.parkingRepository.save(parkingSpots);
    }
  }
}
