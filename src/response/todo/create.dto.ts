import { ReturnTodoType } from 'src/@types/todo';

export class CreateTodoResponseDTO {
  todo: ReturnTodoType;
  constructor(todo: ReturnTodoType) {
    this.todo = todo;
  }
}
