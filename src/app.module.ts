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
      host: process.env.DB_HOST || 'todoplanna.cnuomylyyhwi.eu-north-1.rds.amazonaws.com',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'jesus123',
      database: process.env.DB_DATABASE || 'todos',
      // models: [User], // THIS WILL IMPORT ONLY THE USER MODEL
      // models: [__dirname + '/**/*.model.ts'], // THIS WILL IMPORT ALL THE MODELS IN THE ENTIRE PROJECT
      autoLoadModels: true, // THIS WILL IMPORT ALL THE MODELS IN THE ENTIRE PROJECT
      synchronize: true, // THIS WILL CREATE THE TABLES AUTOMATICALLY
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  
  ], // IMPORT ALL OTHER MODULES HERE 
  controllers: [AppController],
  providers: [AppService],
})

// EXPORT MODULE TO BE USED IN OTHER MODULES
export class AppModule {}
