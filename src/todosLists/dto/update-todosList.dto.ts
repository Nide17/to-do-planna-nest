// VALIDATION
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class UpdateTodosListDto {
    @IsString()
    @Length(0, 50)
    title: string;

    @IsString()
    @Length(0, 50)
    userId: number;

    @IsString()
    @Length(0, 50)
    status: string;

    @IsString()
    @Length(0, 50)
    dueDate: Date;

    @IsString()
    @Length(0, 50)
    createdAt: Date;

    @IsString()
    @Length(0, 50)
    updatedAt: Date;

    todos: Array<{ title: string, completed: Boolean }>;
}