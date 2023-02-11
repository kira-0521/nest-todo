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
    const todos = await this.todoRepository.getAllTodos();
    return { todos };
  }

  async findOne(id: string): Promise<FindOneTodoResponseDTO> {
    const todo = await this.todoRepository.getTodoDetail(id);
    return todo;
  }

  async createTodo(
    createTodoDTO: CreateTodoRequestDTO,
    imagePath: string,
  ): Promise<CreateTodoResponseDTO> {
    const newTodo = await this.todoRepository.createTodo(
      createTodoDTO,
      imagePath,
    );
    return new CreateTodoResponseDTO(newTodo);
  }

  async updateTodo(
    id: string,
    updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<UpdateTodoResponseDTO> {
    return await this.todoRepository.updateTodo(id, updateTodoDTO);
  }

  async deleteTodo(id: string): Promise<DeleteTodoResponseDTO> {
    const todos = await this.todoRepository.deleteTodo(id);
    return { todos };
  }
}
