import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,

} from 'typeorm';

import { Inscripcion } from '../../inscripciones/entities/inscripcione.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ length: 100 })
  grado: string;

  @Column({ default: true })
  activo: boolean;

  

  // Un estudiante tiene muchas inscripciones
  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
  inscripciones: Inscripcion[];
}