import { Todo } from 'src/entities/todo.entity';

export class FindAllTodoResponseDTO {
  todos: Todo[];
}

export class FindOneTodoResponseDTO {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
