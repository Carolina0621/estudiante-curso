import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';


@Injectable()
export class EstudiantesService {
    constructor(
    @InjectRepository(Estudiante) //trabajar con la tabla estudiante
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

 async create(createEstudianteDto: CreateEstudianteDto) {
  const estudiante = this.estudianteRepository.create(createEstudianteDto);
  return await this.estudianteRepository.save(estudiante);
}

  async findAll() {
  return await this.estudianteRepository.find();
}

  async findOne(id: string) {
  const estudiante = await this.estudianteRepository.findOneBy({ id });

  if (!estudiante) {
    throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
  }

  return estudiante;
}

  async update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
  const estudiante = await this.estudianteRepository.preload({
    id,
    ...updateEstudianteDto,
  });

  if (!estudiante) {
    throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
  }

  return await this.estudianteRepository.save(estudiante);
}

  async remove(id: string) {
  const estudiante = await this.findOne(id);
  await this.estudianteRepository.remove(estudiante);
  return { mensaje: `Estudiante ${id} eliminado` };
}

async findOneConCursos(id: string) {
  const estudiante = await this.estudianteRepository.findOne({
    where: { id },
    relations: {
      inscripciones: {
        curso: true,
      },
    },
  });

  if (!estudiante) {
    throw new NotFoundException('Estudiante no encontrado');
  }

  return estudiante;
}


}
