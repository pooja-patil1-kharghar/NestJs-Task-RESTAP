"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const task_entity_1 = require("./entities/task.entity");
const task_controller_1 = require("./task.controller");
const task_service_1 = require("./task.service");
describe('TaskController', () => {
    let controller;
    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [task_controller_1.TaskController],
            providers: [{ provide: task_service_1.TaskService, useValue: mockService }],
        }).compile();
        controller = module.get(task_controller_1.TaskController);
    });
    afterEach(() => jest.clearAllMocks());
    it('should create a task', async () => {
        const dto = { title: 'abc' };
        const result = {
            id: 1,
            title: 'abc',
            description: undefined,
            status: task_entity_1.TaskStatus.OPEN,
            priority: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockService.create.mockResolvedValue(result);
        const res = await controller.create(dto);
        expect(res).toEqual(result);
        expect(mockService.create).toHaveBeenCalledWith(dto);
    });
    it('should return all tasks', async () => {
        const tasks = [
            {
                id: 1,
                title: 'abc',
                description: undefined,
                status: task_entity_1.TaskStatus.OPEN,
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
    it('should return one task', async () => {
        const task = {
            id: 1,
            title: 'abc',
            description: undefined,
            status: task_entity_1.TaskStatus.OPEN,
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
        const updated = {
            id: 1,
            title: 'updated',
            description: undefined,
            status: task_entity_1.TaskStatus.OPEN,
            priority: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockService.update.mockResolvedValue(updated);
        const res = await controller.update(1, dto);
        expect(res).toEqual(updated);
        expect(mockService.update).toHaveBeenCalledWith(1, dto);
    });
    it('should remove a task', async () => {
        mockService.remove.mockResolvedValue(undefined);
        const res = await controller.remove(1);
        expect(res).toBeUndefined();
        expect(mockService.remove).toHaveBeenCalledWith(1);
    });
});
//# sourceMappingURL=task.controller.spec.js.map