import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from './parking/parking.module';
import { TicketModule } from './ticket/ticket.module';
import { ParkingService } from './parking/parking.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Charger les variables d'environnement
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ParkingModule,
    TicketModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly parkingService: ParkingService) {}

  async onModuleInit() {
    await this.parkingService.initializeParkingSpots();
  }
}
