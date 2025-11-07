import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  /** Create a new task */
  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = this.taskRepo.createEntity(createTaskDto);
    const saved = await this.taskRepo.save(task);
    return plainToInstance(TaskResponseDto, saved, { excludeExtraneousValues: true });
  }

  /** Get all tasks */
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepo.findAll();
    return plainToInstance(TaskResponseDto, tasks, { excludeExtraneousValues: true });
  }

  /** Get a single task by ID */
  async findOne(id: number): Promise<TaskResponseDto> {
    const task = await this.ensureTaskExists(id);
    return plainToInstance(TaskResponseDto, task, { excludeExtraneousValues: true });
  }

  /** Update a task by ID */
  async update(id: number, dto: UpdateTaskDto): Promise<TaskResponseDto> {
    await this.ensureTaskExists(id);
    const updated = await this.taskRepo.update(id, dto);
    return plainToInstance(TaskResponseDto, updated, { excludeExtraneousValues: true });
  }

  /** Delete a task by ID */
  async remove(id: number): Promise<void> {
    await this.ensureTaskExists(id);
    await this.taskRepo.remove(id);
  }

  /** Helper: throws NotFoundException if task does not exist */
  private async ensureTaskExists(id: number): Promise<Task> {
    const task = await this.taskRepo.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
}
