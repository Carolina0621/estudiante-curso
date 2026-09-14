import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(2)
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  grado: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
