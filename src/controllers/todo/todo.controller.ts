import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTodoDTO } from 'src/requests/todo';
import { FindOneRequestDTO } from 'src/requests/todo/find.dto';
import {
  CreateTodoResDTO,
  FindAllResponseDTO,
  FindOneResponseDTO,
} from 'src/response/todo';

import { TodoService } from 'src/services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  findAll(): FindAllResponseDTO {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindOneRequestDTO): FindOneResponseDTO {
    return this.todoService.findOne(param.id);
  }

  @Post()
  create(@Body() createTodoDTO: CreateTodoDTO): CreateTodoResDTO {
    return this.todoService.create(createTodoDTO);
  }
}
