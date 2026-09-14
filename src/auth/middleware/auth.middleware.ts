import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface RequestConUsuario extends Request {
  usuario?: { id: string; usuario: string };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: RequestConUsuario, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = header.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      req.usuario = { id: payload.sub, usuario: payload.usuario };
      next();
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}