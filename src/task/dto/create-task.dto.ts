import { IsNotEmpty, IsOptional, IsString, IsEnum, Matches } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Matches(/^(?!\d+$).+$/, { message: 'Title cannot be only numbers' }) // 🚀 New rule
  title!: string;

  @ApiPropertyOptional({ description: 'Detailed description of the task' })
  @IsOptional()
  @IsString()
    @Matches(/^(?!\d+$).+$/, { message: 'description cannot be only numbers' }) // 🚀 New rule
 description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, description: 'Current status of the task' })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: OPEN, IN_PROGRESS, DONE',
  })
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'Priority level of the task' })
  @IsOptional()
  @IsString()
  priority?: string;
}
