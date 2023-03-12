import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTodoRequestDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(256)
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
