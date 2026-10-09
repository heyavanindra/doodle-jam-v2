import { Router } from 'express';
import { RoomController } from '../../controllers/rooms.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { validateBody, validateParams } from '../../middlewares/validation.middleware.js';
import { roomCreateSchema, roomIdParamSchema } from '@repo/validator/room';

const RoomRouter: Router = Router();

RoomRouter.use(requireAuth);

RoomRouter.get('/', RoomController.getRooms);
RoomRouter.post('/', validateBody(roomCreateSchema), RoomController.createRoom);
RoomRouter.get('/:roomId', validateParams(roomIdParamSchema), RoomController.getRoom);
RoomRouter.delete('/:roomId', validateParams(roomIdParamSchema), RoomController.deleteRoom);

export default RoomRouter;
