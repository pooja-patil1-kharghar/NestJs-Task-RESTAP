import { TaskRepository } from './repository/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
export declare class TaskService {
    private readonly taskRepo;
    constructor(taskRepo: TaskRepository);
    create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto>;
    findAll(): Promise<TaskResponseDto[]>;
    findOne(id: number): Promise<TaskResponseDto>;
    update(id: number, dto: UpdateTaskDto): Promise<TaskResponseDto>;
    remove(id: number): Promise<void>;
    private ensureTaskExists;
}
