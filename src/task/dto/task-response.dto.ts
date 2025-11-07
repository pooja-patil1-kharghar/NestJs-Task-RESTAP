import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import { Expose } from 'class-transformer';

export class TaskResponseDto {
  @ApiProperty({ description: 'Task ID' })
  @Expose({ name: 'id' })
  id!: number;

  @ApiProperty({ description: 'Title of the task' })
  @Expose()
  title!: string;

  @ApiProperty({ description: 'Task description', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ enum: TaskStatus, description: 'Status of the task' })
  @Expose()
  status!: TaskStatus;

  @ApiProperty({ description: 'Priority level', required: false })
  @Expose()
  priority?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ description: 'Update timestamp' })
  @Expose()
  updatedAt!: Date;
}
