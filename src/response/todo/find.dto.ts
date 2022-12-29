import { Todo } from 'src/entities/todo.entity';

export class FindAllResponseDTO {
  todos: Todo[];
}

export class FindOneResponseDTO {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
