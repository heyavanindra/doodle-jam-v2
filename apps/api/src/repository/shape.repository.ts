import { StatusCodes } from 'http-status-codes';
import { db } from '../lib/db.js';
import { NewShape, shapes, Shape } from '@repo/db/schema';
import { AppError } from '../lib/errors.js';
import { eq } from 'drizzle-orm';

export const createShape = async (data: NewShape): Promise<Shape> => {
  const [shapeValue] = await db.insert(shapes).values(data).returning();

  if (!shapeValue) {
    throw new AppError('Failed to create shape', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return shapeValue;
};

export const getShapesByRoomId = async (roomId: string): Promise<Shape[]> => {
  return await db
    .select()
    .from(shapes)
    .where(eq(shapes.roomId, roomId))
    .orderBy(shapes.zIndex, shapes.createdAt);
};

export const ShapeRepository = {
  createShape,
  getShapesByRoomId,
};

export default ShapeRepository;
