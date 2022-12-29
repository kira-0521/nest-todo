import { Injectable } from '@nestjs/common';
import { CreateTodoRequestDTO } from 'src/requests/todo';
import {
  CreateTodoResponseDTO,
  FindAllTodoResponseDTO,
  FindOneTodoResponseDTO,
} from 'src/response/todo';

// import { TodoRepository } from 'src/repositories/todo.repository';

@Injectable()
export class TodoService {
  // constructor(private todoRepository: TodoRepository) {}
  hello(): string {
    return 'Hello todo with service!';
  }

  findAll(): FindAllTodoResponseDTO {
    return {
      todos: [
        {
          id: 'test id',
          title: 'test title',
          isCompleted: true,
          createdAt: 'test createdAt',
          updatedAt: 'test updatedAt',
        },
      ],
    };
  }

  findOne(id: string): FindOneTodoResponseDTO {
    return {
      id,
      title: 'test title',
      isCompleted: true,
      createdAt: 'test createdAt',
      updatedAt: 'test updatedAt',
    };
  }

  create(createTodoDto: CreateTodoRequestDTO): CreateTodoResponseDTO {
    return {
      id: 'test id',
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted,
      createdAt: 'test createdAt',
      updatedAt: 'test updatedAt',
    };
  }
}
