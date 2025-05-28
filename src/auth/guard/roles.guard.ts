import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userInfo } from 'os';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../../common/enums/role.enum';
import { TreeRepositoryUtils } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    
    private readonly reflector:Reflector,

  ){

  }
  canActivate(
    context: ExecutionContext,
  ): boolean{
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ])
    console.log(role);
    if (!role) {
      return true; // Si no hay roles definidos, permite el acceso
    }

    const {user} = context.switchToHttp().getRequest(); // Obtiene el usuario de la solicitud
    if (user.role === Role.ADMIN) {
      return true
    }
    console.log(user.role);
    return role === user.role;
  }
}
