import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from 'src/controllers/todo/todo.controller';
import { Todo } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repositories/todo.repository';
import { TodoService } from 'src/services/todo/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
