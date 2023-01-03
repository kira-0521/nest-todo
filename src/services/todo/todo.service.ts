import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from 'src/requests/todo';
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

  async createTodo(
    createTodoDTO: CreateTodoRequestDTO,
  ): Promise<CreateTodoResponseDTO> {
    return await this.todoRepository.createTodo(createTodoDTO);
  }

  async updateTodo(
    id: string,
    updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<Todo> {
    return this.todoRepository.updateTodo(id, updateTodoDTO);
  }
}
