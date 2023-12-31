import { IsEnum } from 'class-validator';
import { TaskStatus } from '../models/task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
