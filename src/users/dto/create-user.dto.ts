// DTO: Data Transfer Object is a design pattern used to transfer data between software application subsystems. DTOs are often used in conjunction with data access objects to retrieve data from a database
// VALIDATION
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(3, 30)
    username: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsEmail()
    email: string;
}