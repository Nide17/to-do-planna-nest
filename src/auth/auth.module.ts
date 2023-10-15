import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

// IMPORT ALL MODULES AND JWT CONSTANTS TO BE USED IN THIS MODULE
@Module({
  imports: [UsersModule, // IMPORT USERS MODULE TO BE USED IN THIS MODULE
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })], // IMPORT JWT MODULE TO BE USED IN THIS MODULE

  controllers: [AuthController], // IMPORT AUTH CONTROLLER
  providers: [AuthService], // IMPORT AUTH SERVICE 
  exports: [AuthService] // EXPORT AUTH SERVICE TO BE USED IN OTHER MODULES 
})
export class AuthModule { }
