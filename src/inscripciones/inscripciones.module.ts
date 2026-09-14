import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripcion } from './entities/inscripcione.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Estudiante, Curso])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
})
export class InscripcionesModule {}
