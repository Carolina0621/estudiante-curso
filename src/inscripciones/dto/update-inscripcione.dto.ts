import { PartialType } from '@nestjs/swagger';
import { CreateInscripcioneDto } from './create-inscripcione.dto';

import { IsUUID } from 'class-validator';

export class UpdateInscripcioneDto {
  @IsUUID()
  cursoId: string;
}