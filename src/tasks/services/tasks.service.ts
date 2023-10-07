import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '../models/task.model';
import * as crypto from 'crypto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      name: 'first',
      description: 'first task',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      name: 'second',
      description: 'second task',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getTasks(filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.getTaskwithFilters(filterDto);
    }

    return this.getAll();
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getTaskwithFilters(filterDto: GetTasksFilterDto): Task[] {
    let tasks = this.getAll();

    if (filterDto.status) {
      tasks = tasks.filter((task) => task.status === filterDto.status);
    }

    if (filterDto.description) {
      tasks = tasks.filter((task) =>
        task.description
          .toLocaleLowerCase()
          .includes(filterDto.description.toLocaleLowerCase()),
      );
    }

    if (filterDto.name) {
      tasks = tasks.filter((task) =>
        task.name
          .toLocaleLowerCase()
          .includes(filterDto.name.toLocaleLowerCase()),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(task: CreateTaskDto): Task {
    const newTask: Task = {
      ...task,
      status: TaskStatus.OPEN,
      id: crypto.randomUUID(),
    };
    this.tasks.push(newTask);

    return newTask;
  }

  updateStatusTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
