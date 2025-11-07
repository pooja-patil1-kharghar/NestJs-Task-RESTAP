import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatus } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskResponseDto } from './dto/task-response.dto';

describe('TaskController', () => {
  let controller: TaskController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  afterEach(() => jest.clearAllMocks());

  //create
  it('should create a task', async () => {
    const dto = { title: 'abc' };
    const result: TaskResponseDto = {
      id: 1,
      title: 'abc',
      description: undefined,
      status: TaskStatus.OPEN,
      priority: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockService.create.mockResolvedValue(result);

    const res = await controller.create(dto);
    expect(res).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  //get all
  it('should return all tasks', async () => {
    const tasks: TaskResponseDto[] = [
      {
        id: 1,
        title: 'abc',
        description: undefined,
        status: TaskStatus.OPEN,
        priority: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockService.findAll.mockResolvedValue(tasks);

    const res = await controller.findAll();
    expect(res).toEqual(tasks);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  //update
  it('should return one task', async () => {
    const task: TaskResponseDto = {
      id: 1,
      title: 'abc',
      description: undefined,
      status: TaskStatus.OPEN,
      priority: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockService.findOne.mockResolvedValue(task);

    const res = await controller.findOne(1);
    expect(res).toEqual(task);
    expect(mockService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a task', async () => {
    const dto = { title: 'updated' };
    const updated: TaskResponseDto = {
      id: 1,
      title: 'updated',
      description: undefined,
      status: TaskStatus.OPEN,
      priority: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockService.update.mockResolvedValue(updated);

    const res = await controller.update(1, dto);
    expect(res).toEqual(updated);
    expect(mockService.update).toHaveBeenCalledWith(1, dto);
  });

  // delete
  it('should remove a task', async () => {
    mockService.remove.mockResolvedValue(undefined);

    const res = await controller.remove(1);
    expect(res).toBeUndefined();
    expect(mockService.remove).toHaveBeenCalledWith(1);
  });
});
