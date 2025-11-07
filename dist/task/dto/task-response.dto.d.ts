import { TaskStatus } from '../entities/task.entity';
export declare class TaskResponseDto {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    priority?: string;
    createdAt: Date;
    updatedAt: Date;
}
