import { DataSource } from 'typeorm';
import { Task } from './src/task/entities/task.entity'; // adjust path based on your structure
import * as dotenv from 'dotenv';

dotenv.config(); // load .env file

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'cdac',
  database: process.env.DB_DATABASE || 'NestJstaskdb',
  entities: [Task],
  migrations: ['src/migrations/*{.ts,.js}'], // path to migrations
  synchronize: false, // never auto-create tables
  logging: true,
});

