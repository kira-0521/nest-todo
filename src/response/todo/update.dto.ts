import { ReturnTodoType } from 'src/@types/todo';

export class UpdateTodoResponseDTO {
  todo: ReturnTodoType;
  constructor(todo: ReturnTodoType) {
    console.log('todo: ', todo);
    this.todo = todo;
  }
}
