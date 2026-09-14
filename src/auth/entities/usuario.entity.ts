import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 150 })
  usuario: string;

  @Column({ select: false }) //la contraseña no viene en el select
  password: string;

  @Column({ length: 100 })
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;
}