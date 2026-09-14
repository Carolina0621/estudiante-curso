import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcione.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { isUniqueViolation } from '../common/helpers/error.helpers';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) { }

  async create(createInscripcioneDto: CreateInscripcioneDto) {
    const { estudianteId, cursoId } = createInscripcioneDto;

    //Buscar el estudiante
    const estudiante = await this.estudianteRepository.findOneBy({
      id: estudianteId,
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${estudianteId} no encontrado`);
    }

    //Buscar el curso
    const curso = await this.cursoRepository.findOneBy({ id: cursoId });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${cursoId} no encontrado`);
    }


    //Armar la inscripción 
    const inscripcion = this.inscripcionRepository.create({
      estudiante,
      curso,
    });

    //Guardar
    try {
      return await this.inscripcionRepository.save(inscripcion);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException('Este estudiante ya está inscrito en ese curso');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.inscripcionRepository.find({
      relations: { estudiante: true, curso: true },
    });
  }

  async findOne(id: string) {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id },
      relations: { estudiante: true, curso: true },
    });

    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con id ${id} no encontrada`);
    }

    return inscripcion;
  }

  async update(id: string, updateInscripcioneDto: UpdateInscripcioneDto) {
    const inscripcion = await this.findOne(id);

    const curso = await this.cursoRepository.findOneBy({
      id: updateInscripcioneDto.cursoId,
    });
    if (!curso) {
      throw new NotFoundException(
        `Curso con id ${updateInscripcioneDto.cursoId} no encontrado`,
      );
    }

    inscripcion.curso = curso;

    try {
      return await this.inscripcionRepository.save(inscripcion);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException('Este estudiante ya está inscrito en ese curso');
      }
      throw error;
    }
  }

  async remove(id: string) {
    const inscripcion = await this.findOne(id);
    await this.inscripcionRepository.remove(inscripcion);
    return { mensaje: 'Inscripción eliminada' };
  }

}
