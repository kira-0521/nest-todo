import { IsUUID } from 'class-validator';

export class FindOneTodoRequestDTO {
  @IsUUID()
  id: string;
}
