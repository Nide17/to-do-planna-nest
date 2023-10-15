import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from 'src/users/dto/sign-in-dto';

// IMPORT BCYPT TO HASH PASSWORDS
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    // INJECT USERS SERVICE HERE TO BE USED IN THIS SERVICE
    constructor(private usersService: UsersService, private jwtService: JwtService) { } // INJECT USERS SERVICE HERE TO BE USED IN THIS SERVICE

    // SIGN IN USER AND RETURN USER IF SUCCESSFUL
    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.getUserByEmail(signInDto.email); // GET USER BY EMAIL

        // CHECK IF USER EXISTS
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // CHECK IF PASSWORD IS CORRECT
        if (await bcrypt.compare(signInDto.password, user.password)) {

            // GENERATE JWT TOKEN AND RETURN IT TO THE USER, sub: user.userId IS USED TO IDENTIFY THE USER
            const payload = { username: user.username, sub: user.id };

            // RETURN TOKEN
            return {
                token: await this.jwtService.signAsync(payload),
                user: {
                    id: user.id, username: user.username, email: user.email
                }
            };
        }

        // THROW ERROR IF PASSWORD IS INCORRECT
        throw new UnauthorizedException('Invalid credentials');
    }
}
