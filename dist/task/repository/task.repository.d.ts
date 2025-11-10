import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
export declare class TaskRepository {
    private readonly repo;
    constructor(repo: Repository<Task>);
    createEntity(createTaskDto: CreateTaskDto): Task;
    save(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    update(id: number, updateDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
    findByStatus(status: string): Promise<Task[]>;
}
