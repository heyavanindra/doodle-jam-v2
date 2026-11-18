import { z } from 'zod';

export const shapeCreateSchema = z.object({
  id: z.string().uuid().optional(),
  roomId: z.string().uuid('Invalid room ID'),
  type: z.string().min(1, 'Type is required'),
  data: z.record(z.string(), z.any()),
  zIndex: z.number().int().optional().default(0),
});

export const shapeIdParamSchema = z.object({
  shapeId: z.string().uuid('Invalid shape ID'),
});

export type ShapeCreateInput = z.infer<typeof shapeCreateSchema>;
export type ShapeIdParamInput = z.infer<typeof shapeIdParamSchema>;
