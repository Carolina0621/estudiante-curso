import { IsUUID} from 'class-validator';

export class CreateInscripcioneDto {
  @IsUUID()
  estudianteId: string;

  @IsUUID()
  cursoId: string;

}