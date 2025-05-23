import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
    private readonly JwtService: JwtService, ///Inyecta el servicio de jwt
   ) {}
 async canActivate(context: ExecutionContext): Promise<boolean>{ ///Entra cada vez que se hace una peticion
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); ///Extrae el token del header de la peticion
    if (!token) {
      throw new UnauthorizedException('Token not found'); ///Si no hay token, lanza una excepcion
    }

    try{
      const payload = await this.JwtService.verifyAsync(
        token, ///Verifica el token
        {
          secret: jwtConstants.secret, ///Secreto del token
        },
      ); ///Verifica el token
       request.user = payload; ///Agrega el payload al request
    }catch (error) {
      throw new UnauthorizedException('Invalid token'); ///Si no valida el secreto, lanza una excepcion
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; ///Separa el token del tipo de autorizacion bearer
    return type === 'Bearer' ? token : undefined;
  }
}
