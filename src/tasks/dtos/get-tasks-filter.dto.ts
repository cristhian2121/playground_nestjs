import { IsString, IsEnum, IsOptional } from 'class-validator';

import { TaskStatus } from '../models/task.model';

export class GetTasksFilterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
