import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendSuccess } from '../helper/response-helper.js';
import ShapeService from '../services/shape.service.js';
import type { ShapeCreateInput } from '@repo/validator';

export const createShape = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId, type, data, zIndex, id } = req.validatedBody as ShapeCreateInput;

    const createdShape = await ShapeService.createShape({
      ...(id ? { id } : {}),
      roomId,
      type,
      data,
      ...(zIndex !== undefined ? { zIndex } : {}),
    });

    req.log?.info(
      { shapeId: createdShape.id, roomId: createdShape.roomId },
      'Shape created successfully',
    );

    return sendSuccess(res, createdShape, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getShapesByRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params;
    const shapes = await ShapeService.getShapesByRoomId(roomId as string);

    return sendSuccess(res, shapes, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const ShapeController = {
  createShape,
  getShapesByRoom,
};

export default ShapeController;
