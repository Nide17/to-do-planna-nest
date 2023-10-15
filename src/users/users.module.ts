import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

// CONTROLLERS ARE USED FOR ALL ROUTES AND SERVICES ARE USED FOR ALL LOGIC
// SERVICES ALSO CALLED PROVIDERS, ARE USED FOR ALL LOGIC AND CONTROLLERS ARE USED FOR ALL ROUTES

// THIS IS USED FOR ALL USERS RELATED SERVICES AND CONTROLLERS
@Module({
  imports: [SequelizeModule.forFeature([User])], // IMPORT THE USER MODEL HERE TO BE USED IN THIS MODULE - Register modules
  exports: [SequelizeModule, UsersService], // EXPORT THE USER MODEL HERE TO BE USED IN OTHER MODULES
  controllers: [UsersController], // CONTROLLER IS IMPORTED HERE TO BE USED IN THIS MODULE
  providers: [UsersService] // USERS SERVICE or PROVIDER IS IMPORTED HERE TO BE USED IN THIS MODULE
})

// EXPORT MODULE TO BE USED IN OTHER MODULES
export class UsersModule {}
