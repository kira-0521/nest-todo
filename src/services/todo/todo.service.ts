import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from 'src/requests/todo';
import {
  CreateTodoResDTO,
  FindAllResponseDTO,
  FindOneResponseDTO,
} from 'src/response/todo';

// import { TodoRepository } from 'src/repositories/todo.repository';

@Injectable()
export class TodoService {
  // constructor(private todoRepository: TodoRepository) {}
  hello(): string {
    return 'Hello todo with service!';
  }

  findAll(): FindAllResponseDTO {
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

  findOne(id: string): FindOneResponseDTO {
    return {
      id,
      title: 'test title',
      isCompleted: true,
      createdAt: 'test createdAt',
      updatedAt: 'test updatedAt',
    };
  }

  create(createTodoDto: CreateTodoDTO): CreateTodoResDTO {
    if (typeof createTodoDto.isCompleted === 'string') {
      createTodoDto.isCompleted =
        createTodoDto.isCompleted === 'true' ? true : false;
    }
    return {
      id: 'test id',
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted,
      createdAt: 'test createdAt',
      updatedAt: 'test updatedAt',
    };
  }
}
