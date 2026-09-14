import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso} from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {

constructor(
    @InjectRepository(Curso) //trabajar con la tabla curso
    private readonly cursoRepository: Repository<Curso>,
  ) {}

async create(createCursoDto: CreateCursoDto) {
  const curso = this.cursoRepository.create(createCursoDto);
  return await this.cursoRepository.save(curso);
}

  async findAll() {
  return await this.cursoRepository.find();
}

  async findOne(id: string) {
  const curso = await this.cursoRepository.findOneBy({ id });

  if (!curso) {
    throw new NotFoundException(`Curso con id ${id} no encontrado`);
  }

  return curso;
}

  async update(id: string, updateCursoDto: UpdateCursoDto) {
  const curso = await this.cursoRepository.preload({
    id,
    ...updateCursoDto,
  });

  if (!curso) {
    throw new NotFoundException(`Curso con id ${id} no encontrado`);
  }

  return await this.cursoRepository.save(curso);
}

  async remove(id: string) {
  const curso = await this.findOne(id);
  await this.cursoRepository.remove(curso);
  return { mensaje: `curso  ${id} eliminado` };
}
}
