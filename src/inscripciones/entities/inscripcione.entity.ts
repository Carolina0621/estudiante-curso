import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('curso_estudiante')
@Unique(['estudiante', 'curso'])
export class Inscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, {
    onDelete: 'CASCADE',
  })
  estudiante: Estudiante;

  @ManyToOne(() => Curso, (curso) => curso.inscripciones, {
    onDelete: 'CASCADE',
  })
  curso: Curso;

}
