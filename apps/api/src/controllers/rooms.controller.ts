import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendSuccess } from '../helper/response-helper.js';
import RoomService from '../services/room.service.js';
import type { RoomCreateInput, RoomIdParamInput } from '@repo/validator';

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.validatedBody as RoomCreateInput;

    const createdRoom = await RoomService.createRoom(
      {
        name,
        description,
      },
      req.user!.id,
    );
    req.log?.info({ roomId: createdRoom.id }, 'Room created successfully');

    return sendSuccess(res, createdRoom, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.validatedParams as RoomIdParamInput;

    const room = await RoomService.getRoomById(roomId, req.user!.id);
    req.log?.info({ roomId: room.id }, 'Room fetched successfully');

    return sendSuccess(res, room, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await RoomService.getRoomsByOwnerId(req.user!.id);
    req.log?.info({ count: rooms.length }, 'Rooms fetched successfully');

    return sendSuccess(res, rooms, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.validatedParams as RoomIdParamInput;

    const deletedRoom = await RoomService.deleteRoomById(roomId, req.user!.id);
    req.log?.info({ roomId: deletedRoom.id }, 'Room deleted successfully');

    return sendSuccess(res, deletedRoom, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const RoomController = {
  createRoom,
  getRoom,
  getRooms,
  deleteRoom,
};

export default RoomController;
