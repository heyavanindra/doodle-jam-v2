import { Router } from 'express';
import RoomRouter from './room.route.js';
import ShapesRouter from './shapes.route.js';

const v1Router: Router = Router();

v1Router.use('/rooms', RoomRouter);
v1Router.use('/shapes', ShapesRouter);

export default v1Router;
