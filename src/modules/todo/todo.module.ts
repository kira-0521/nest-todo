import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from 'src/controllers/todo/todo.controller';
// import { Todo } from 'src/entities/todo.entity';
// import { TodoRepository } from 'src/repositories/todo.repository';
import { TodoService } from 'src/services/todo/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  // providers: [TodoService, TodoRepository],
  providers: [TodoService],
})
export class TodoModule {}
