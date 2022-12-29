import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(@InjectRepository(Todo) repository: Repository<Todo>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
