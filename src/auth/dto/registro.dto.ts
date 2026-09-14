import { IsString, MinLength } from 'class-validator';

export class RegistroDto {
  @IsString()
  @MinLength(3)
  usuario: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  nombre: string;
}