import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
  type Room,
  type Rooms,
} from '../api/room';
import type { RoomCreateInput, RoomUpdateInput } from '@repo/validator';
import { toast } from 'sonner';

export function useGetRooms() {
  return useQuery<Rooms>({
    queryKey: ['rooms'],
    queryFn: () => getRooms(),
  });
}

export function useGetRoomById(roomId: string) {
  return useQuery<Room>({
    queryKey: ['rooms', roomId],
    queryFn: () => getRoomById(roomId),
    enabled: Boolean(roomId),
  });
}

export function useCreateRoom(initialInput?: RoomCreateInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input?: RoomCreateInput) => {
      const payload = input ?? initialInput;
      if (!payload) {
        toast.error('Provide an info');
        return;
      }
      return await createRoom(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}

export function useUpdateRoom(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RoomUpdateInput) => updateRoom(roomId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', roomId] });
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
