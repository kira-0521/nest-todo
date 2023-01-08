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

  async createTodo(
    createTodoRequestDTO: CreateTodoRequestDTO,
    imagePath: string,
  ): Promise<Todo> {
    const { title, isCompleted } = createTodoRequestDTO;
    const newTodo = this.create({
      id: uuidv4(),
      title,
      isCompleted: !!isCompleted,
      imgUrl: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.save(newTodo);
    return newTodo;
  }

  async updateTodo(
    id: string,
    updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<Todo> {
    const { title, isCompleted } = updateTodoDTO;
    const currentTodo = await this.findOneBy({ id });
    const updatedTodo: Todo = {
      ...currentTodo,
      title,
      isCompleted: !!isCompleted,
      updatedAt: new Date().toISOString(),
    };
    await this.update(id, updatedTodo);
    return updatedTodo;
  }
}
