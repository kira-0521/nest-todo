import { Todo } from 'src/@types/todo';

export class CreateTodoResponseDTO {
  todo: Todo;
  constructor(todo: Todo) {
    this.todo = todo;
  }
}
