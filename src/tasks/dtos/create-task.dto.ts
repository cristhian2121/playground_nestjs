import { IsNotEmpty, IsString } from 'class-validator';

// it is better use a class for dto because of afert building process the interface disapear
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'Error bb' })
  description: string;
}
