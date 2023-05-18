import { prismaMock } from '@/singleton';
import { createTodo } from './test-functions';

describe('TodoController', () => {
  it('should create new todo', async () => {
    const todo = {
      id: '1',
      title: 'test',
      description: 'test',
      user_id: '1',
      done: false,
      priority: 'low',
    };

    prismaMock.todo.create.mockResolvedValue(todo);

    await expect(createTodo(todo)).resolves.toEqual(todo);
  });
});
