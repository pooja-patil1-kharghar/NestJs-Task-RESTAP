import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto>;
    findAll(): Promise<TaskResponseDto[]>;
    findOne(id: number): Promise<TaskResponseDto>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto>;
    remove(id: number): Promise<void>;
}
