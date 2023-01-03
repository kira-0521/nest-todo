import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from 'src/entities/todo.entity';
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from 'src/requests/todo';

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(@InjectRepository(Todo) repository: Repository<Todo>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createTodo(createTodoRequestDTO: CreateTodoRequestDTO): Promise<Todo> {
    const { title, isCompleted } = createTodoRequestDTO;
    const newTodo = this.create({
      id: uuidv4(),
      title,
      isCompleted: !!isCompleted,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.save(newTodo);
    return newTodo;
  }

  async updateTodo(updateTodoDTO: UpdateTodoRequestDTO): Promise<Todo> {
    const { id, title, isCompleted } = updateTodoDTO;
    const currentTodo = await this.findOneBy({ id });
    const updatedTodo: Todo = {
      ...currentTodo,
      title,
      isCompleted: !!isCompleted,
      updatedAt: new Date().toISOString(),
    };
    await this.save(updatedTodo);
    return updatedTodo;
  }
}
