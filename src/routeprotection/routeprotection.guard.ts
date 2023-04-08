import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RouteprotectionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // TOGGLE THIS TO TRUE TO ALLOW ACCESS TO ROUTE OR FALSE TO DENY ACCESS TO ROUTE
    return true; // CHANGE THIS TO TRUE TO ALLOW ACCESS TO ROUTE OR FALSE TO DENY ACCESS TO ROUTE
  }
}
