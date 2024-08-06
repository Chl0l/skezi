import { IsString, IsInt, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  spotId: number;

  @IsString()
  @MinLength(1)
  customerName: string;

  @IsString()
  @MinLength(1)
  customerPlateNumber: string;
}
