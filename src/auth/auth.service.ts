import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async registro(registroDto: RegistroDto) {
    const { password, ...datos } = registroDto;

    const existe = await this.usuarioRepository.findOneBy({
      usuario: datos.usuario,
    });
    if (existe) {
      throw new ConflictException('Usuario ya registrado');
    }

    const usuario = this.usuarioRepository.create({
      ...datos,
      password: bcrypt.hashSync(password, 10),
    });

    await this.usuarioRepository.save(usuario);

    return {
      id: usuario.id,
      email: usuario.usuario,
      nombre: usuario.nombre,
      token: this.generarToken(usuario.id, usuario.usuario),
    };
  }

  async login(loginDto: LoginDto) {
  const { usuario, password } = loginDto;

  const usuarioEncontrado = await this.usuarioRepository.findOne({
    where: { usuario },
    select: { id: true, usuario: true, nombre: true, password: true },
  });

  if (
    !usuarioEncontrado ||
    !bcrypt.compareSync(password, usuarioEncontrado.password)
  ) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  return {
    id: usuarioEncontrado.id,
    usuario: usuarioEncontrado.usuario,
    nombre: usuarioEncontrado.nombre,
    token: this.generarToken(usuarioEncontrado.id, usuarioEncontrado.usuario),
  };
}

private generarToken(id: string, usuario: string): string {
  return this.jwtService.sign({ sub: id, usuario });
}
}
