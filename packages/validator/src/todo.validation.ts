import { z } from 'zod';

export const roomCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

export const roomIdParamSchema = z.object({
  roomId: z.string().min(1, 'roomId is required'),
});

export type RoomCreateInput = z.infer<typeof roomCreateSchema>;
export type RoomIdParamInput = z.infer<typeof roomIdParamSchema>;

export default {
  roomCreateSchema,
  roomIdParamSchema,
};
