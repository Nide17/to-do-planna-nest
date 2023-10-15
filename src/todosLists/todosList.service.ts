import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodosList } from './todosList.model';
import { CreateTodosListDto } from './dto/create-todosList.dto';
import { UpdateTodosListDto } from './dto/update-todosList.dto';

// SERVICE IS USED TO HANDLE ALL LOGIC FOR THIS MODULE
@Injectable() // THIS IS USED TO INJECT THIS SERVICE INTO OTHER SERVICES

// EXPORT SERVICE TO BE USED IN OTHER MODULES
export class TodosListsService {

    // INJECT TODOSLIST MODEL HERE TO BE USED IN THIS SERVICE
    constructor(
        @InjectModel(TodosList) // THIS IS USED TO INJECT THE TODOSLIST MODEL INTO THIS SERVICE
        private todosListModel: typeof TodosList
    ) { }

    // GET ALL TODOS WITH OPTIONAL FILTERS
    async getTodosLists(): Promise<TodosList[]> {

        // RETURN ALL TODOS IF NO FILTERS ARE PRESENT
        return this.todosListModel.findAll();
    }

    // GET A SINGLE TODOSLIST BY ID
    getTodosList(id: number): Promise<TodosList> {

        // FIND THE TODOSLIST BY ID
        return this.todosListModel.findOne({
            where: {
                id: id
            }
        });
    }

    // CREATE A NEW TODOSLIST USING THE TODOSLIST MODEL OR DTO
    createTodosList(createTodoListDto: CreateTodosListDto): Promise<TodosList> {

        // CREATE A NEW TODOSLIST USING THE TODOSLIST MODEL
        const todosList = new TodosList();

        // SET THE TODOSLIST PROPERTIES
        todosList.title = createTodoListDto.title || 'New TodosList Today';
        todosList.userId = createTodoListDto.userId;
        todosList.status = createTodoListDto.status || 'ACTIVE'; // ACTIVE BY DEFAULT
        // DUE NEXT DAY BY DEFAULT
        todosList.dueDate = createTodoListDto.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
        todosList.createdAt = createTodoListDto.createdAt || new Date();
        todosList.updatedAt = createTodoListDto.updatedAt || new Date();
        todosList.todos = createTodoListDto.todos || [];

        console.log(todosList);

        // RETURN THE CREATED TODOSLIST
        return todosList.save();
    }

    // UPDATE A TODOSLIST BY ID
    async updateTodosList(id: number, updateTodoListDto: UpdateTodosListDto): Promise<TodosList> {

        // FIND THE TODOSLIST BY ID
        const [affectedCount] = await this.todosListModel.update({
            ...updateTodoListDto,
        }, {
            where: { id: id },
        });

        // THROW AN ERROR IF THE TODOSLIST IS NOT FOUND
        if (affectedCount === 0) {
            throw new NotFoundException(`TodosList with ID ${id} not found`);
        }

        // RETURN THE UPDATED TODOSLIST
        const updatedTodosList = await this.todosListModel.findOne({ where: { id: id } });
        return updatedTodosList;
    }

    // DELETE A TODOSLIST BY ID
    async deleteTodosList(id: number): Promise<string> {

        // FIND THE TODOSLIST BY ID
        const todosList = await this.getTodosList(id);

        try {
            // DELETE THE TODOSLIST
            await todosList.destroy();

            // RETURN A SUCCESS MESSAGE
            return `TodosList with ID ${id} deleted`;

        } catch (error) {
            throw new NotFoundException(`TodosList with ID ${id} not found`);
        }
    }

}
