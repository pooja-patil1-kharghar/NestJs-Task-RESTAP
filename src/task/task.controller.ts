import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /** Create a new task */
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created', type: TaskResponseDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.taskService.create(createTaskDto);
  }

  /** Get all tasks */
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks', type: [TaskResponseDto] })
  async findAll(): Promise<TaskResponseDto[]> {
    return this.taskService.findAll();
  }

  /** Get task by ID */
  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Task found', type: TaskResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDto> {
    return this.taskService.findOne(id);
  }

  /** Update a task */
  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated', type: TaskResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  /* Delete a task */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiResponse({ status: 204, description: 'Task successfully deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.remove(id);
  }

//for custom query

  @Get('status/:status')
@ApiOperation({ summary: 'Get tasks filtered by status' })
@ApiResponse({ status: 200, description: 'Tasks with the given status', type: [TaskResponseDto] })
async findByStatus(@Param('status') status: string): Promise<TaskResponseDto[]> {
  return this.taskService.findByStatus(status);
}

}
