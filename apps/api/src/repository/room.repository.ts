import { StatusCodes } from 'http-status-codes';
import { db } from '../lib/db.js';
import { NewRoom, room, Room } from '@repo/db/schema';
import { AppError } from '../lib/errors.js';
import { and, eq } from 'drizzle-orm';

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

export const updateRoomById = async (
  id: string,
  userId: string,
  data: Partial<Pick<NewRoom, 'name' | 'description' | 'imageUrl'>>,
): Promise<Room> => {
  const conditions = [eq(room.id, id), eq(room.ownerId, userId)];
  const [roomValue] = await db
    .update(room)
    .set({ ...data, updatedAt: new Date() })
    .where(and(...conditions))
    .returning();

  if (!roomValue) {
    throw new AppError('Room not found or update failed', StatusCodes.NOT_FOUND);
  }

  return roomValue;
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
  updateRoomById,
  deleteRoomById,
};

export default RoomRepository;
