"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const task_repository_1 = require("./repository/task.repository");
const task_response_dto_1 = require("./dto/task-response.dto");
let TaskService = class TaskService {
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    async create(createTaskDto) {
        const task = this.taskRepo.createEntity(createTaskDto);
        const saved = await this.taskRepo.save(task);
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, saved, { excludeExtraneousValues: true });
    }
    async findAll() {
        const tasks = await this.taskRepo.findAll();
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, tasks, { excludeExtraneousValues: true });
    }
    async findOne(id) {
        const task = await this.ensureTaskExists(id);
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, task, { excludeExtraneousValues: true });
    }
    async update(id, dto) {
        await this.ensureTaskExists(id);
        const updated = await this.taskRepo.update(id, dto);
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, updated, { excludeExtraneousValues: true });
    }
    async remove(id) {
        await this.ensureTaskExists(id);
        await this.taskRepo.remove(id);
    }
    async ensureTaskExists(id) {
        const task = await this.taskRepo.findOne(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
//# sourceMappingURL=task.service.js.map