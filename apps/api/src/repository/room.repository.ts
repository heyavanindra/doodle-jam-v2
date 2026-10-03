import { StatusCodes } from 'http-status-codes';
import { db } from '../lib/db.js';
import { NewRoom, room, Room } from '@repo/db/schema';
import { AppError } from '../lib/errors.js';
import { and, eq } from 'drizzle-orm';

// export const createTodo = async (data: NewTodo): Promise<Todo> => {
//   const [todo] = await db.insert(todoTable).values(data).returning();

//   if (!todo) {
//     throw new AppError('Failed to create todo', StatusCodes.INTERNAL_SERVER_ERROR);
//   }

//   return todo;
// };

// const getTodoById = async (todoId: string, userId?: string): Promise<Todo> => {
//   const conditions = [eq(todoTable.id, Number(todoId))];
//   if (userId) {
//     conditions.push(eq(todoTable.userId, userId));
//   }

//   const todo = await db
//     .select()
//     .from(todoTable)
//     .where(and(...conditions))
//     .limit(1);

//   if (!todo[0]) {
//     throw new AppError('Todo not found', StatusCodes.NOT_FOUND);
//   }

//   return todo[0];
// };

// const getAllTodos = async (userId?: string): Promise<Todo[]> => {
//   if (userId) {
//     return await db.select().from(todoTable).where(eq(todoTable.userId, userId));
//   }
//   return await db.select().from(todoTable);
// };

// const updateTodoById = async (
//   todoId: string,
//   data: Partial<NewTodo>,
//   userId?: string,
// ): Promise<Todo> => {
//   const conditions = [eq(todoTable.id, Number(todoId))];
//   if (userId) {
//     conditions.push(eq(todoTable.userId, userId));
//   }

//   const [todo] = await db
//     .update(todoTable)
//     .set(data)
//     .where(and(...conditions))
//     .returning();

//   if (!todo) {
//     throw new AppError('Failed to update todo', StatusCodes.INTERNAL_SERVER_ERROR);
//   }

//   return todo;
// };

// const deleteTodoById = async (todoId: string, userId?: string): Promise<Todo> => {
//   const conditions = [eq(todoTable.id, Number(todoId))];
//   if (userId) {
//     conditions.push(eq(todoTable.userId, userId));
//   }

//   const [todo] = await db
//     .delete(todoTable)
//     .where(and(...conditions))
//     .returning();

//   if (!todo) {
//     throw new AppError('Failed to delete todo', StatusCodes.INTERNAL_SERVER_ERROR);
//   }

//   return todo;
// };

export const createRoom = async (data: NewRoom): Promise<Room> => {
  const [roomValue] = await db.insert(room).values(data).returning();

  if (!roomValue) {
    throw new AppError('Failed to create room', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return roomValue;
};

export const getRoomById = async (id: string, userId: string): Promise<Room> => {
  const [roomValue] = await db
    .select()
    .from(room)
    .where(and(eq(room.id, id), eq(room.ownerId, userId)))
    .limit(1);

  if (!roomValue) {
    throw new AppError('Room not found', StatusCodes.NOT_FOUND);
  }

  return roomValue;
};

export const getRoomsByOwnerId = async (ownerId: string): Promise<Room[]> => {
  const rooms = await db.select().from(room).where(eq(room.ownerId, ownerId)).limit(10);

  return rooms;
};

export const deleteRoomById = async (id: string, userId: string): Promise<Room> => {
  const conditions = [eq(room.id, id), eq(room.ownerId, userId)];
  const [roomValue] = await db
    .delete(room)
    .where(and(...conditions))
    .returning();

  if (!roomValue) {
    throw new AppError('Failed to delete room', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return roomValue;
};

export const RoomRepository = {
  createRoom,
  getRoomById,
  getRoomsByOwnerId,
  deleteRoomById,
};

export default RoomRepository;
