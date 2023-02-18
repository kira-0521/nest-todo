import { ReturnTodoType } from 'src/@types/todo';
export class FindAllTodoResponseDTO {
  todos: ReturnTodoType[];
  constructor(todos: ReturnTodoType[]) {
    this.todos = todos;
  }
}

export class FindOneTodoResponseDTO {
  todo: ReturnTodoType;
  constructor(todo: ReturnTodoType) {
    this.todo = todo;
  }
}
