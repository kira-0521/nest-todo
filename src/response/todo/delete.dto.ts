import { ReturnTodoType } from 'src/@types/todo';

export class DeleteTodoResponseDTO {
  todos: ReturnTodoType[];
  constructor(todos: ReturnTodoType[]) {
    this.todos = todos;
  }
}
