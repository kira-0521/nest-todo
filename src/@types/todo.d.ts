export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type ReturnTodoType = Omit<Todo, 'createdAt' | 'updatedAt'>;
