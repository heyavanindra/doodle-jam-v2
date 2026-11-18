import { ShapeRepository } from '../repository/shape.repository.js';
import type { NewShape, Shape } from '@repo/db/schema';

const createShape = async (data: NewShape): Promise<Shape> => {
  return await ShapeRepository.createShape(data);
};

const getShapesByRoomId = async (roomId: string): Promise<Shape[]> => {
  return await ShapeRepository.getShapesByRoomId(roomId);
};

export const ShapeService = {
  createShape,
  getShapesByRoomId,
};

export default ShapeService;
