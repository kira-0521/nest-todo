import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { CreateTodoRequestDTO } from 'src/requests/todo';
import {
  CreateTodoResponseDTO,
  FindAllTodoResponseDTO,
  FindOneTodoResponseDTO,
} from 'src/response/todo';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}
  async findAll(): Promise<FindAllTodoResponseDTO> {
    const todos = await this.todoRepository.find();
    return { todos };
  }

  async findOne(id: string): Promise<FindOneTodoResponseDTO> {
    const todo = await this.todoRepository.findOneBy({ id });
    return todo;
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
