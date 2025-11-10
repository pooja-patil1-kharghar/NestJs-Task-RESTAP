import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  // Create entity instance safely
  createEntity(createTaskDto: CreateTaskDto): Task {
    return this.repo.create(createTaskDto as Partial<Task>);
  }

  // Save entity to database
  async save(task: Task): Promise<Task> {
    return this.repo.save(task);
  }

  //  Get all tasks (sorted by createdAt desc)
  async findAll(): Promise<Task[]> {
    //return this.repo.find({ order: { createdAt: 'DESC' } });
     return this.repo.find();
  }

  //  Find single task or return null
  async findOne(id: number): Promise<Task | null> {
    return this.repo.findOneBy({ id });
  }

  //  Update task safely
  async update(id: number, updateDto: UpdateTaskDto): Promise<Task> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Task with ID ${id} not found`);

    const updated = this.repo.merge(existing, updateDto);
    return this.repo.save(updated);
  }

  //  Delete task safely
  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }


  async findByStatus(status: string): Promise<Task[]> {
  const statusEnum = status.toUpperCase() as TaskStatus;

  return this.repo.find({
    where: { status: statusEnum },
    order: { createdAt: 'DESC' },
  });
}


}
