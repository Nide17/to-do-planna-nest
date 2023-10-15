import { RouteprotectionGuard } from '../routeprotection/routeprotection.guard';
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateTodosListDto } from './dto/create-todosList.dto';
import { UpdateTodosListDto } from './dto/update-todosList.dto';
import { TodosListsService } from './todosList.service';

// CONTROLLER IS USED TO HANDLE ALL ROUTES FOR THIS MODULE
@Controller('todosLists')

// CLASS IS USED TO HANDLE ALL ROUTES FOR THIS MODULE 
export class TodosListsController {

    // INJECT THE TODOSLISTS SERVICE CLASS - THIS IS CALLED DEPENDENCY INJECTION
    // TO NEVER HAVE TO INSTANTIATE CLASSES AGAIN AND AGAIN, IT HAPPENS AUTOMATICALLY
    constructor(private readonly todosListsService: TodosListsService) { }
    @Get()
    getTodosLists() {

        // RETURN AN ARRAY OF OBJECTS
        return this.todosListsService.getTodosLists();
    }

    // GET /todosLists/:id
    @Get(':id')
    getTodosList(id: number) {

        // HANDLE ERROR IF TODOSLIST IS NOT FOUND
        try {
            return this.todosListsService.getTodosList(id);
        } catch (error) {
            throw NotFoundException;
        }
    }

    // POST /todosLists
    @Post()
    // VALIDATE THE DATA BEFORE IT IS SENT TO THE SERVICE CLASS TO BE PROCESSED
    createTodosList(@Body(new ValidationPipe()) createTodosListDto: CreateTodosListDto) {
        return this.todosListsService.createTodosList(createTodosListDto);
    }

    // PUT /todosLists/:id
    @Put(':id')
    updateTodosList(@Param('id') id: number, @Body(new ValidationPipe()) updateTodosListDto: UpdateTodosListDto) {
        return this.todosListsService.updateTodosList(+id, updateTodosListDto);
    }

    // DELETE /todosLists/:id
    @Delete(':id')
    @UseGuards(RouteprotectionGuard) // USE GUARD TO PROTECT ROUTE FROM UNAUTHORIZED ACCESS
    deleteTodosList(@Param('id') id: number) {
        return this.todosListsService.deleteTodosList(+id);
    }
}
