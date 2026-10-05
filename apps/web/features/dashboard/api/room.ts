import { api } from '@/utils/api';
import type { RoomCreateInput, RoomUpdateInput } from '@repo/validator';

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  ownerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type Rooms = Room[];

export async function createRoom(body: RoomCreateInput): Promise<Room> {
  const res = await api.post<Room>('/api/v1/rooms', body);
  return res.data;
}

export async function getRooms(): Promise<Rooms> {
  const res = await api.get<Rooms>('/api/v1/rooms');
  return res.data;
}

export async function getRoomById(roomId: string): Promise<Room> {
  const res = await api.get<Room>(`/api/v1/rooms/${roomId}`);
  return res.data;
}

export async function updateRoom(roomId: string, body: RoomUpdateInput): Promise<Room> {
  const res = await api.put<Room>(`/api/v1/rooms/${roomId}`, body);
  return res.data;
}

export async function deleteRoom(roomId: string): Promise<Room> {
  const res = await api.delete<Room>(`/api/v1/rooms/${roomId}`);
  return res.data;
}
