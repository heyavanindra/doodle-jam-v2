'use client';

import { useCreateRoom } from '@/features/dashboard/hooks/use-room';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { roomCreateSchema, type RoomCreateInput } from '@repo/validator';
import { useForm } from '@tanstack/react-form';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CreateRoomDialogProps {
  trigger?: React.ReactElement;
}

export function CreateRoomDialog({ trigger }: CreateRoomDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createRoom } = useCreateRoom();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    } as RoomCreateInput,
    validators: {
      onChange: roomCreateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createRoom(value);
        toast.success('Room created successfully');
        form.reset();
        setOpen(false);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to create room');
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button size="sm" className="mt-5 cursor-pointer gap-1.5 shadow-xs">
              <Plus className="size-3.5" />
              <span>Create Room</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-md">
        <form
          id="create-room-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Set up a new canvas room to start drawing and collaborating in real time.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-3 py-1">
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      Name
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Sprint Planning, UI Sketches"
                      aria-invalid={isInvalid}
                      autoFocus
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      Description
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Brief description of what this room is for..."
                      aria-invalid={isInvalid}
                      rows={3}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <DialogFooter className="gap-x-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer py-2.5 hover:shadow-control"
                >
                  Cancel
                </Button>
              }
            />
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!canSubmit || isSubmitting}
                  className="cursor-pointer gap-1.5"
                >
                  {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{isSubmitting ? 'Creating...' : 'Create Room'}</span>
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Backwards-compatible alias
export const DialogCloseButton = CreateRoomDialog;
