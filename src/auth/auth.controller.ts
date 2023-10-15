import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RouteprotectionGuard } from 'src/routeprotection/routeprotection.guard';
import { SignInDto } from 'src/users/dto/sign-in-dto';

// LOGIN CONTROLLER TO HANDLE LOGIN REQUESTS
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK) // SET HTTP STATUS CODE TO 200
    @Post('login') // SET ROUTE TO /auth/login
    async signIn(@Body() signInDto: SignInDto) { // GET SIGN IN DTO FROM REQUEST BODY
        return await this.authService.signIn(signInDto); // CALL SIGN IN METHOD FROM AUTH SERVICE
    }

    @UseGuards(RouteprotectionGuard) // USE ROUTE PROTECTION GUARD TO PROTECT THIS ROUTE
    @Get('user-todos')
    getUserTodos(@Request() req: any) { // GET REQUEST OBJECT FROM REQUEST OBJECT
        return req.user; // RETURN USER OBJECT FROM REQUEST OBJECT
    }
}
