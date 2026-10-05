'use client';

import { useCreateRoom, useDeleteRoom, useGetRooms } from '@/features/dashboard/hooks/use-room';
// import { Button, Input } from '@repo/ui';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { data: rooms, isLoading, isError, error } = useGetRooms();
  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();
  const { mutate: mutateDeleteRoom, isPending: isDeleting } = useDeleteRoom();
  const [input, setInput] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });

  const handleCreateRoom = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.name.trim()) {
      toast.error('Room name is required');
      return;
    }

    createRoom(input, {
      onSuccess: () => {
        toast.success('Room created successfully');
        setInput({ name: '', description: '' });
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to create room');
      },
    });
  };

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
    <main className="bg-canvas-bg flex min-h-screen items-center justify-center p-6">
      {/* <div className="bg-surface-1 border-border shadow-card rounded-[6px] border px-8 py-6 text-center w-full max-w-md">
        <h1 className="text-text-primary text-[15px] font-[450] tracking-[-0.14px] mb-4">
          welcome to doodleJam
        </h1>

        <form onSubmit={handleCreateRoom} className="flex flex-col gap-3 mb-6">
          <Input
            onChange={(e) => {
              setInput({ ...input, name: e.target.value });
            }}
            value={input.name}
            placeholder="Room Name"
            disabled={isCreating}
          />
          <Input
            onChange={(e) => {
              setInput({ ...input, description: e.target.value });
            }}
            value={input.description}
            placeholder="Room Description"
            disabled={isCreating}
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isCreating || !input.name.trim()}
          >
            <Plus className="size-4 mr-1.5" />
            {isCreating ? 'Creating Room...' : 'Create Room'}
          </Button>
        </form>

        {isLoading && (
          <div className="text-text-secondary text-sm py-4">Loading rooms...</div>
        )}

        {isError && (
          <div className="text-danger text-sm py-2">
            Failed to load rooms: {error?.message ?? 'Unknown error'}
          </div>
        )}

        {!isLoading && !isError && rooms && rooms.length === 0 && (
          <div className="text-text-secondary text-sm py-4">No rooms found.</div>
        )}

        {!isLoading && rooms && rooms.length > 0 && (
          <div className="flex flex-col gap-2 text-left">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-surface-2 border-border rounded-[4px] border p-3 flex flex-col gap-1"
              >
                <span className="text-text-primary font-medium text-sm">{room.name}</span>
                {room.description && (
                  <span className="text-text-secondary text-xs">{room.description}</span>
                )}
                <Button disabled={isDeleting} variant="danger" className="border-border bg-surface-2 text-danger hover:bg-danger-2 rounded-[4px] border cursor-pointer flex items-center gap-2 px-2 py-1" onClick={() => deleteRoom(room.id)}>
                  <Trash className="size-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </main>
  );
}
