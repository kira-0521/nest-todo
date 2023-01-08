import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from 'src/requests/todo';
import {
  CreateTodoResponseDTO,
  DeleteTodoResponseDTO,
  FindAllTodoResponseDTO,
  FindOneTodoResponseDTO,
  UpdateTodoResponseDTO,
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
    imagePath: string,
  ): Promise<CreateTodoResponseDTO> {
    return await this.todoRepository.createTodo(createTodoDTO, imagePath);
  }

  async updateTodo(
    id: string,
    updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<UpdateTodoResponseDTO> {
    return await this.todoRepository.updateTodo(id, updateTodoDTO);
  }

  async deleteTodo(id: string): Promise<DeleteTodoResponseDTO> {
    await this.todoRepository.delete({ id });
    const todos = await this.todoRepository.find();
    return { todos };
  }
}
