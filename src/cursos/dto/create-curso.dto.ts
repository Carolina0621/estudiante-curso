
import { IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @MinLength(2)
  nombre: string;

 
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

