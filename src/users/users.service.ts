import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// SERVICE IS USED TO HANDLE ALL LOGIC FOR THIS MODULE
@Injectable() // THIS IS USED TO INJECT THIS SERVICE INTO OTHER SERVICES

// EXPORT SERVICE TO BE USED IN OTHER MODULES
export class UsersService {

    // INJECT USER MODEL HERE TO BE USED IN THIS SERVICE
    constructor(
        @InjectModel(User) // THIS IS USED TO INJECT THE USER MODEL INTO THIS SERVICE
        private userModel: typeof User
    ) { }

    // GET ALL USERS WITH OPTIONAL FILTERS
    async getUsers(page?: number, limit?: number): Promise<User[]> {
        
        // CHECK IF PAGE AND LIMIT ARE PRESENT
        if (page && limit) {
            const offset = (page - 1) * limit;

            return await this.userModel.findAll({
                offset: offset,
                limit: limit
            });
        }

        // CHECK IF ONLY PAGE IS PRESENT
        else if (!page && limit) {
            return await this.userModel.findAll({
                limit: limit
            });
        }

        // CHECK IF ONLY LIMIT IS PRESENT
        else if (page && !limit) {

            // SET LIMIT TO 10 IF ONLY PAGE IS PRESENT
            const offset = (page - 1) * 10;
            
            return await this.userModel.findAll({
                offset: offset
            });
        }

        // RETURN ALL USERS IF NO FILTERS ARE PRESENT
        else {
            return await this.userModel.findAll();
        }
    }

    // GET A SINGLE USER BY ID
    getUser(id: number): Promise<User> {

        // FIND THE USER BY ID
        return this.userModel.findOne({
            where: {
                id: id
            }
        });
    }

    // CREATE A NEW USER USING THE USER MODEL OR DTO
    createUser(createUserDto: CreateUserDto): Promise<User>{
        // CREATE A NEW USER USING THE USER MODEL
        return this.userModel.create({...createUserDto});
    }
    
    // UPDATE A USER BY ID
    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {

        // FIND THE USER BY ID
        const [affectedCount] = await this.userModel.update({
            ...updateUserDto,
            updated_at: new Date(),
        }, {
            where: { id: id },
        });

        // THROW AN ERROR IF THE USER IS NOT FOUND
        if (affectedCount === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // RETURN THE UPDATED USER
        const updatedUser = await this.userModel.findOne({ where: { id: id } });
        return updatedUser;
    }


    // DELETE A USER BY ID
    async deleteUser(id: number): Promise<string> {

        // FIND THE USER BY ID
        const user = await this.getUser(id);

        try {
            // DELETE THE USER
            await user.destroy();

            // RETURN A SUCCESS MESSAGE
            return `User with ID ${id} deleted`;

        } catch (error) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

}
