import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
import { generateFilename } from 'src/interceptors/todo/image-file.interceptor';
import { BASE_URL, TODO_IMAGE_FILE_PATH } from 'src/constants';

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: TODO_IMAGE_FILE_PATH,
        filename: generateFilename,
      }),
    }),
  )
  async createTodo(
    @Body() createTodoDTO: CreateTodoRequestDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateTodoResponseDTO> {
    const imagePath = file?.path ? `${BASE_URL}/${file.path}` : null;
    return await this.todoService.createTodo(createTodoDTO, imagePath);
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
