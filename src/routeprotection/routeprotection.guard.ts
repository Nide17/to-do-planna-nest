import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Request } from 'express'

@Injectable()
export class RouteprotectionGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  // CHECK IF USER IS AUTHENTICATED BEFORE ACCESSING ROUTE
  async canActivate(context: ExecutionContext): Promise<boolean> {

    // GET REQUEST OBJECT
    const request = context.switchToHttp().getRequest();

    // GET TOKEN FROM REQUEST HEADER
    const token = this.extractTokenFromHeader(request);

    // CHECK IF TOKEN IS PRESENT
    if (!token) {
      throw new UnauthorizedException();
    }

    // VERIFY TOKEN AND ASSIGN PAYLOAD TO REQUEST OBJECT
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      // ASSIGN PAYLOAD TO REQUEST OBJECT TO BE USED IN CONTROLLER
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // EXTRACT TOKEN FROM REQUEST HEADER AND RETURN IT IF IT IS VALID
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // GET TOKEN FROM REQUEST HEADER

    // CHECK IF TOKEN IS PRESENT AND RETURN IT IF IT IS VALID
    return type === 'Bearer' ? token : undefined;
  }
}