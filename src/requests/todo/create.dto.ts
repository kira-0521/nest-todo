import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTodoRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
