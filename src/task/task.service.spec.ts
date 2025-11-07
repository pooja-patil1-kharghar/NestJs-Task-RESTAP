import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './repository/task.repository';
import { NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskStatus } from './entities/task.entity';
import { plainToInstance } from 'class-transformer';

describe('TaskService', () => {
  let service: TaskService;

  const mockRepo = {
    createEntity: jest.fn(),
    save: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => jest.clearAllMocks());

  // create 
  it('should create a task and return TaskResponseDto', async () => {
    const dto = { title: 'Test' } as any;
    const saved: Task = {
      id: 1,
      title: 'Test',
      description: undefined,
      status: TaskStatus.OPEN,
      priority: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.createEntity.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue(saved);

    const res = await service.create(dto);

    expect(mockRepo.createEntity).toHaveBeenCalledWith(dto);
    expect(res).toEqual(expect.objectContaining({
      id: 1,
      title: 'Test',
      status: 'OPEN',
    }));
    expect(res).toBeInstanceOf(TaskResponseDto);
  });

  // Find by id
  it('should throw NotFoundException when task not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should return a task as TaskResponseDto', async () => {
    const task: Task = {
      id: 1,
      title: 'Test',
      description: undefined,
      status: TaskStatus.OPEN,
      priority: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockRepo.findOne.mockResolvedValue(task);

    const res = await service.findOne(1);
    expect(res).toBeInstanceOf(TaskResponseDto);
    expect(res).toEqual(expect.objectContaining({ id: 1, title: 'Test' }));
  });

  // get all 
  it('should return all tasks as TaskResponseDto array', async () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task1', description: undefined, status: TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Task2', description: undefined, status: TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() },
    ];
    mockRepo.findAll.mockResolvedValue(tasks);

    const res = await service.findAll();
    expect(res).toHaveLength(2);
    expect(res[0]).toBeInstanceOf(TaskResponseDto);
    expect(res[1]).toBeInstanceOf(TaskResponseDto);
  });

  // update
  it('should update a task and return TaskResponseDto', async () => {
    const dto = { title: 'Updated' } as any;
    const existing: Task = { id: 1, title: 'Test', description: undefined, status: TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() };
    const updated: Task = { ...existing, title: 'Updated', updatedAt: new Date() };

    mockRepo.findOne.mockResolvedValue(existing);
    mockRepo.update.mockResolvedValue(updated);

    const res = await service.update(1, dto);
    expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
    expect(res).toBeInstanceOf(TaskResponseDto);
    expect(res).toEqual(expect.objectContaining({ id: 1, title: 'Updated' }));
  });

  it('should throw NotFoundException on update if task not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(service.update(999, { title: 'x' } as any)).rejects.toThrow(NotFoundException);
  });

  // delete
  it('should remove a task', async () => {
    const task: Task = { id: 1, title: 'Test', description: undefined, status: TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() };
    mockRepo.findOne.mockResolvedValue(task);
    mockRepo.remove.mockResolvedValue(undefined);

    await service.remove(1);
    expect(mockRepo.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException on remove if task not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
