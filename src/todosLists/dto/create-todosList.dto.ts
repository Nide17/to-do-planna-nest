// DTO: Data Transfer Object is a design pattern used to transfer data between software application subsystems. DTOs are often used in conjunction with data access objects to retrieve data from a database
// VALIDATION
import { IsNotEmpty } from 'class-validator';

export class CreateTodosListDto {
    title: string;

    @IsNotEmpty()
    userId: number;

    status: string;

    dueDate: Date;

    createdAt: Date;

    updatedAt: Date;

    todos: Array<{ title: string, status: string }>;
}