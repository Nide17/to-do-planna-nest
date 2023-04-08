// VALIDATION
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @Length(3, 30)
    username: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsEmail()
    email: string;
}