import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Job } from '../entities/job';
import * as dotenv from 'dotenv';
import { Conversation } from '../entities/Conversation';
import { UserMapping } from '../entities/UserMapping';
import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
import { SurveyorMaster } from '../entities/SurveyorMaster';
import { NominationDetails } from '../entities/NominationDetails';

// Load environment variables from .env file
dotenv.config();

console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);
console.log('Database User:', process.env.DB_USERNAME);
console.log('Database Password:', process.env.DB_PASSWORD);
console.log('Database Name:', process.env.DB_NAME);

export const AppDataSource = new DataSource({
  "type": 'mysql',
  "host": "127.0.0.1",
  "port": parseInt('3306'),
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [User, Job, Conversation, UserMapping, ViswaOpsNumber, SurveyorMaster, NominationDetails],
  
  "logging": false,
  // "logger": "file",
  "synchronize": true,
  
  "extra": {
    connectionLimit: 1000,
    waitForConnections: false
  }
});
