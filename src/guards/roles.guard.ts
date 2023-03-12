import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const handlerRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!handlerRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.get('role');
    return handlerRoles.some((role) => userRole === role);
  }
}
