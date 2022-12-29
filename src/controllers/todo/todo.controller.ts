import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTodoRequestDTO } from 'src/requests/todo';
import { FindOneTodoRequestDTO } from 'src/requests/todo/find.dto';
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
  findAll(): FindAllTodoResponseDTO {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindOneTodoRequestDTO): FindOneTodoResponseDTO {
    return this.todoService.findOne(param.id);
  }

  @Post()
  create(@Body() createTodoDTO: CreateTodoRequestDTO): CreateTodoResponseDTO {
    return this.todoService.create(createTodoDTO);
  }
}
