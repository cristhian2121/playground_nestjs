import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TasksService } from '../services/tasks.service';

import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  taskService: TasksService;

  constructor(private tasksService: TasksService) {
    this.taskService = tasksService;
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(':id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body('status') updateStatusTask: UpdateTaskStatusDto,
  ) {
    const { status } = updateStatusTask;
    return this.tasksService.updateStatusTask(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
