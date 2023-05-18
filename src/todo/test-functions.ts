import prisma from '../client';

interface CreateTodo {
  title: string;
  description: string;
  user_id: string;
  done: boolean;
  priority: string;
}

export async function createTodo(todo: CreateTodo) {
  return await prisma.todo.create({
    data: {
      done: todo.done,
      title: todo.title,
      description: todo.description,
      user: {
        connect: {
          id: todo.user_id,
        },
      },
    },
  });
}
