import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateTodoRequestDTO,
  DeleteTodoRequestDTO,
  FindOneTodoRequestDTO,
  UpdateTodoRequestDTO,
} from 'src/requests/todo';
import {
  CreateTodoResponseDTO,
  DeleteTodoResponseDTO,
  FindAllTodoResponseDTO,
  FindOneTodoResponseDTO,
  UpdateTodoResponseDTO,
} from 'src/response/todo';

import { TodoService } from 'src/services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async findAll(): Promise<FindAllTodoResponseDTO> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() { id }: FindOneTodoRequestDTO,
  ): Promise<FindOneTodoResponseDTO> {
    return await this.todoService.findOne(id);
  }

  @Post()
  async createTodo(
    @Body() createTodoDTO: CreateTodoRequestDTO,
  ): Promise<CreateTodoResponseDTO> {
    return await this.todoService.createTodo(createTodoDTO);
  }

  @Put(':id')
  async updateTodo(
    @Param() param: { id: string },
    @Body() updateTodoDTO: UpdateTodoRequestDTO,
  ): Promise<UpdateTodoResponseDTO> {
    return await this.todoService.updateTodo(param.id, updateTodoDTO);
  }

  @Delete(':id')
  async deleteTodo(
    @Param() param: DeleteTodoRequestDTO,
  ): Promise<DeleteTodoResponseDTO> {
    return await this.todoService.deleteTodo(param.id);
  }
}
