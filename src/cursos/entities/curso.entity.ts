import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  
} from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcione.entity';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  nombre: string;

  @Column({ default: true })
  activo: boolean;



  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
  inscripciones: Inscripcion[];
}