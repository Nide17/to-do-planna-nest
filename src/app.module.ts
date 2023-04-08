import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// BRING IN THE SequelizeModule MODULE
import { SequelizeModule } from '@nestjs/sequelize';

// ENVIRONMENT VARIABLES
import * as dotenv from 'dotenv';
dotenv.config();

// THIS IS THE MAIN MODULE THAT WILL BE USED TO IMPORT ALL OTHER MODULES
@Module({
  imports: [UsersModule,
    
    // IMPORT THE SequelizeModule MODULE AND PASS IN THE CONFIGURATION
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // models: [User], // THIS WILL IMPORT ONLY THE USER MODEL
      // models: [__dirname + '/**/*.model.ts'], // THIS WILL IMPORT ALL THE MODELS IN THE ENTIRE PROJECT
      autoLoadModels: true, // THIS WILL IMPORT ALL THE MODELS IN THE ENTIRE PROJECT
      synchronize: true, // THIS WILL CREATE THE TABLES AUTOMATICALLY
    })
  
  ], // IMPORT ALL OTHER MODULES HERE 
  controllers: [AppController],
  providers: [AppService],
})

// EXPORT MODULE TO BE USED IN OTHER MODULES
export class AppModule {}
