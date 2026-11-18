import { Router } from 'express';
import { ShapeController } from '../../controllers/shapes.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { validateBody } from '../../middlewares/validation.middleware.js';
import { shapeCreateSchema } from '@repo/validator';

const ShapesRouter: Router = Router();

ShapesRouter.use(requireAuth);

ShapesRouter.post('/', validateBody(shapeCreateSchema), ShapeController.createShape);
ShapesRouter.get('/room/:roomId', ShapeController.getShapesByRoom);

export default ShapesRouter;
