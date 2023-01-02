import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTodoRequestDTO, FindOneTodoRequestDTO } from 'src/requests/todo';
import {
  CreateTodoResponseDTO,
  FindAllTodoResponseDTO,
  FindOneTodoResponseDTO,
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
  findOne(@Param() param: FindOneTodoRequestDTO): FindOneTodoResponseDTO {
    return this.todoService.findOne(param.id);
  }

  @Post()
  create(@Body() createDto: CreateTodoRequestDTO): CreateTodoResponseDTO {
    return this.todoService.create(createDto);
  }
}
