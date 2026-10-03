import { RoomRepository } from '../repository/room.repository.js';
import type { NewRoom, Room } from '@repo/db/schema';
import { generateSlug } from '../utils/slugs.js';

type CreateRoomType = Pick<NewRoom, 'name' | 'description' | 'imageUrl'>;

const createRoom = async (data: CreateRoomType, ownerId: string): Promise<Room> => {
  const slug = generateSlug(data.name);

  return await RoomRepository.createRoom({ ...data, slug, ownerId });
};

const getRoomById = async (roomId: string, userId: string): Promise<Room> => {
  return await RoomRepository.getRoomById(roomId, userId);
};

const getRoomsByOwnerId = async (ownerId: string): Promise<Room[]> => {
  return await RoomRepository.getRoomsByOwnerId(ownerId);
};

const deleteRoomById = async (roomId: string, userId: string): Promise<Room> => {
  return await RoomRepository.deleteRoomById(roomId, userId);
};

export const RoomService = {
  createRoom,
  getRoomById,
  getRoomsByOwnerId,
  deleteRoomById,
};

export default RoomService;
