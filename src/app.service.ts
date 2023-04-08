import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// THIS IS THE MAIN SERVICE THAT WILL BE USED TO HANDLE ALL LOGIC FOR THE APP
@Injectable() // THIS IS MEANS THAT THIS SERVICE CAN BE USED IN OTHER SERVICES
export class AppService {

  // INJECT Sequelize OBJECT TO BE USED IN THIS SERVICE
  constructor(private sequelize: Sequelize) {}

  // ROOT FUNCTION
  getHello(): string {
    return 'Hello at ToDoPlanna!';
  }
}
