import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from 'src/entities/todo.entity';
import { ReturnTodoType } from 'src/@types/todo';
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from 'src/requests/todo';

const SELECTED_COLUMN: { [k in keyof Todo]: boolean } = {
  id: true,
  title: true,
  isCompleted: true,
  imgUrl: true,
  createdAt: false,
  updatedAt: false,
};

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(@InjectRepository(Todo) repository: Repository<Todo>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAllTodos(): Promise<ReturnTodoType[]> {
    return await this.find({
      select: SELECTED_COLUMN,
    });
  }

  async getTodoDetail(id: string): Promise<ReturnTodoType> {
    return await this.findOne({
      select: SELECTED_COLUMN,
      where: { id },
    });
  }

  async checkTodoExists(title: string): Promise<boolean> {
    const todo = await this.findOne({
      select: SELECTED_COLUMN,
      where: { title },
    });
    return !!todo;
  }

  async createTodo(
    createTodoRequestDTO: CreateTodoRequestDTO,
    imagePath: string,
  ): Promise<ReturnTodoType> {
    const { title, isCompleted } = createTodoRequestDTO;
    const newTodo = this.create({
      id: uuidv4(),
      title,
      isCompleted: !!isCompleted,
      imgUrl: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const saved = await this.save(newTodo);
    return {
      id: saved.id,
      title: saved.title,
      isCompleted: saved.isCompleted,
      imgUrl: saved.imgUrl,
    };
  }

  async updateTodo(
    id: string,
    updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<ReturnTodoType> {
    const { title, isCompleted } = updateTodoDTO;
    const currentTodo = await this.findOneBy({ id });
    const updatedTodo: Todo = {
      ...currentTodo,
      title: title || currentTodo.title,
      isCompleted:
        isCompleted === undefined ? currentTodo.isCompleted : !!isCompleted,
      updatedAt: new Date().toISOString(),
    };
    await this.update(id, updatedTodo);
    return {
      id: updatedTodo.id,
      title: updatedTodo.title,
      isCompleted: updatedTodo.isCompleted,
      imgUrl: updatedTodo.imgUrl,
    };
  }

  async deleteTodo(id: string): Promise<ReturnTodoType[]> {
    await this.delete({ id });
    const todos = await this.getAllTodos();
    return todos;
  }
}
