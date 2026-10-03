import { Router } from 'express';
import RoomRouter from './room.route.js';

const v1Router: Router = Router();

v1Router.use('/rooms', RoomRouter);

export default v1Router;
