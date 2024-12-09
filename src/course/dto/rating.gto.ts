import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RateDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;
}