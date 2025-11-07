"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const task_service_1 = require("./task.service");
const task_repository_1 = require("./repository/task.repository");
const common_1 = require("@nestjs/common");
const task_response_dto_1 = require("./dto/task-response.dto");
const task_entity_1 = require("./entities/task.entity");
describe('TaskService', () => {
    let service;
    const mockRepo = {
        createEntity: jest.fn(),
        save: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                task_service_1.TaskService,
                { provide: task_repository_1.TaskRepository, useValue: mockRepo },
            ],
        }).compile();
        service = module.get(task_service_1.TaskService);
    });
    afterEach(() => jest.clearAllMocks());
    it('should create a task and return TaskResponseDto', async () => {
        const dto = { title: 'Test' };
        const saved = {
            id: 1,
            title: 'Test',
            description: undefined,
            status: task_entity_1.TaskStatus.OPEN,
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
        expect(res).toBeInstanceOf(task_response_dto_1.TaskResponseDto);
    });
    it('should throw NotFoundException when task not found', async () => {
        mockRepo.findOne.mockResolvedValue(null);
        await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
    });
    it('should return a task as TaskResponseDto', async () => {
        const task = {
            id: 1,
            title: 'Test',
            description: undefined,
            status: task_entity_1.TaskStatus.OPEN,
            priority: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockRepo.findOne.mockResolvedValue(task);
        const res = await service.findOne(1);
        expect(res).toBeInstanceOf(task_response_dto_1.TaskResponseDto);
        expect(res).toEqual(expect.objectContaining({ id: 1, title: 'Test' }));
    });
    it('should return all tasks as TaskResponseDto array', async () => {
        const tasks = [
            { id: 1, title: 'Task1', description: undefined, status: task_entity_1.TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, title: 'Task2', description: undefined, status: task_entity_1.TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() },
        ];
        mockRepo.findAll.mockResolvedValue(tasks);
        const res = await service.findAll();
        expect(res).toHaveLength(2);
        expect(res[0]).toBeInstanceOf(task_response_dto_1.TaskResponseDto);
        expect(res[1]).toBeInstanceOf(task_response_dto_1.TaskResponseDto);
    });
    it('should update a task and return TaskResponseDto', async () => {
        const dto = { title: 'Updated' };
        const existing = { id: 1, title: 'Test', description: undefined, status: task_entity_1.TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() };
        const updated = { ...existing, title: 'Updated', updatedAt: new Date() };
        mockRepo.findOne.mockResolvedValue(existing);
        mockRepo.update.mockResolvedValue(updated);
        const res = await service.update(1, dto);
        expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
        expect(res).toBeInstanceOf(task_response_dto_1.TaskResponseDto);
        expect(res).toEqual(expect.objectContaining({ id: 1, title: 'Updated' }));
    });
    it('should throw NotFoundException on update if task not found', async () => {
        mockRepo.findOne.mockResolvedValue(null);
        await expect(service.update(999, { title: 'x' })).rejects.toThrow(common_1.NotFoundException);
    });
    it('should remove a task', async () => {
        const task = { id: 1, title: 'Test', description: undefined, status: task_entity_1.TaskStatus.OPEN, priority: undefined, createdAt: new Date(), updatedAt: new Date() };
        mockRepo.findOne.mockResolvedValue(task);
        mockRepo.remove.mockResolvedValue(undefined);
        await service.remove(1);
        expect(mockRepo.remove).toHaveBeenCalledWith(1);
    });
    it('should throw NotFoundException on remove if task not found', async () => {
        mockRepo.findOne.mockResolvedValue(null);
        await expect(service.remove(999)).rejects.toThrow(common_1.NotFoundException);
    });
});
//# sourceMappingURL=task.service.spec.js.map