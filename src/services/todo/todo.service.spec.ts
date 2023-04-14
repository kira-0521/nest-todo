import { TestingModule, Test } from '@nestjs/testing';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { TodoService } from './todo.service';

// Repositoryのメソッドをモック化
const mockTodoRepository = () => ({
  getAllTodos: jest.fn(),
});

// TodoServiceのためのテストグループを作成
describe('TodoServiceTest', () => {
  let service: TodoService;
  let repository: jest.Mocked<TodoRepository>;

  beforeEach(async () => {
    // テストのためのmoduleを作成
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useFactory: mockTodoRepository,
        },
      ],
    }).compile();

    // モジュールから取得したものを代入
    service = module.get<TodoService>(TodoService);
    repository = module.get<TodoRepository>(
      TodoRepository,
    ) as jest.Mocked<TodoRepository>;
  });

  describe('getAllTodos', () => {
    it('正常系：serviceの返り値が期待通りであること', async () => {
      const todos = [];
      // モック化したメソッドの戻り値を設定
      repository.getAllTodos.mockResolvedValue(todos);
      const result = await service.findAll();

      // 返り値が期待通りであることを確認
      expect(result).toEqual({ todos });
    });
  });
});
