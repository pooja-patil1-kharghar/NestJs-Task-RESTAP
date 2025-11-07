import { TaskStatus } from '../entities/task.entity';

export interface ITask {
  id?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
