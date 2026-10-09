'use client';

import { DashboardNav } from '@/features/dashboard/components/dashboard-nav';
import { RoomsView } from '@/features/dashboard/components/rooms-view';
import { useCreateRoom, useDeleteRoom, useGetRooms } from '@/features/dashboard/hooks/use-room';
// import { Button, Input } from '@repo/ui';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { data: rooms, isLoading, isError, error } = useGetRooms();
  const { mutate: mutateDeleteRoom, isPending: isDeleting } = useDeleteRoom();
  const deleteRoom = (id: string) => {
    mutateDeleteRoom(id, {
      onSuccess: () => {
        toast.success('Room deleted successfully');
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to delete room');
      },
    });
  };

  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center p-6">
      <DashboardNav />
      <RoomsView rooms={rooms} />
    </main>
  );
}
