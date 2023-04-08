import { RouteprotectionGuard } from './../routeprotection/routeprotection.guard';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

// CONTROLLER IS USED TO HANDLE ALL ROUTES FOR THIS MODULE
@Controller('users')

// CLASS IS USED TO HANDLE ALL ROUTES FOR THIS MODULE 
export class UsersController {

    // INJECT THE USERS SERVICE CLASS - THIS IS CALLED DEPENDENCY INJECTION
    // TO NEVER HAVE TO INSTANTIATE CLASSES AGAIN AND AGAIN, IT HAPPENS AUTOMATICALLY
    constructor(private readonly usersService: UsersService) { }
    // GET /users?page=1&limit=10
    @Get()
    getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        // INSTANTIATE THE USERS SERVICE CLASS HERE
        // const usersService = new UsersService(); // THIS IS NOT NEEDED SINCE WE ARE USING THE CONSTRUCTOR

        // RETURN AN ARRAY OF OBJECTS
        return this.usersService.getUsers(page, limit);
    }

    // GET /users/:id
    @Get(':id')
    getUser(id: number) {

        // HANDLE ERROR IF USER IS NOT FOUND
        try {
            return this.usersService.getUser(id);
        } catch (error) {
            throw NotFoundException;
        }
    }

    // GET /users/:id/tasks
    // @Get(':id/tasks')
    // getUserTasks(@Param('id')) {
    //     return this.usersService.getUserTasks();
    // }
    // GET /users/:id/tasks/:id
    @Get(':id/tasks/:id')
    getUserTask(@Param('id') id: string): string {
        return `This is the user task page with id: ${id}`;
    }

    // POST /users
    @Post()
    // VALIDATE THE DATA BEFORE IT IS SENT TO THE SERVICE CLASS TO BE PROCESSED
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // PUT /users/:id
    @Put(':id')
    updateUser(@Param('id') id: number, @Body(new ValidationPipe()) updateUserDto: CreateUserDto) {
        return this.usersService.updateUser(+id, updateUserDto);
    }

    // DELETE /users/:id
    @Delete(':id')
    @UseGuards(RouteprotectionGuard) // USE GUARD TO PROTECT ROUTE FROM UNAUTHORIZED ACCESS
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(+id);
    }
}
