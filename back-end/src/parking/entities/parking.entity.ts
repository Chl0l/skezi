import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spotNumber: number;

  @Column({ default: false })
  isOccupied: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.parkingSpot)
  tickets: Ticket[];
}
