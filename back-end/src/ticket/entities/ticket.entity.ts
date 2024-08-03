import { Parking } from 'src/parking/entities/parking.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parking, (parking) => parking.tickets, {
    eager: true,
    onDelete: 'SET NULL',
  })
  parkingSpot: Parking;

  @Column()
  issuedAt: Date;

  @Column()
  customerName: string;

  @Column()
  customerPlateNumber: string;
}
