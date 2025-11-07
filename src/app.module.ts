import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'cdac',
      database: process.env.DB_DATABASE || 'NestJstaskdb',
      entities: [Task],
      synchronize: false,  // ❌ Never auto-create tables
      dropSchema: false,   // ❌ Never drop tables
      logging: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // migration files
    }),

    TaskModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  // Optional: run migrations automatically on app start
  async onModuleInit() {
    await this.dataSource.runMigrations();
  }
}
