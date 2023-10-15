import { Module } from '@nestjs/common';
import { TodosListsController } from './todosList.controller';
import { TodosListsService } from './todosList.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosList } from './todosList.model';

// CONTROLLERS ARE USED FOR ALL ROUTES AND SERVICES ARE USED FOR ALL LOGIC
// SERVICES ALSO CALLED PROVIDERS, ARE USED FOR ALL LOGIC AND CONTROLLERS ARE USED FOR ALL ROUTES

// THIS IS USED FOR ALL TodosLists RELATED SERVICES AND CONTROLLERS
@Module({
  imports: [SequelizeModule.forFeature([TodosList])], // IMPORT THE USER MODEL HERE TO BE USED IN THIS MODULE - Register modules
  exports: [SequelizeModule, TodosListsService], // EXPORT THE USER MODEL HERE TO BE USED IN OTHER MODULES
  controllers: [TodosListsController], // CONTROLLER IS IMPORTED HERE TO BE USED IN THIS MODULE
  providers: [TodosListsService] // TodosLists SERVICE or PROVIDER IS IMPORTED HERE TO BE USED IN THIS MODULE
})

// EXPORT MODULE TO BE USED IN OTHER MODULES
export class TodosListsModule { }
