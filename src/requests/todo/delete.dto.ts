import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTodoRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
