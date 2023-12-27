'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Hint } from '@/components/hint';
import { Textarea } from '@/components/ui/textarea';
import { useState, useTransition, useRef, ElementRef } from 'react';
import { trpc } from '@/app/_trpc/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface IBioModalProps {
  initialValue: string | null;
}
export const BioModal = ({ initialValue }: IBioModalProps) => {
  const [value, setValue] = useState(initialValue || '');
  const [isPending, startTransition] = useTransition();

  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();

  const { mutate: updateBio } = trpc.updateUser.useMutation({
    onSuccess() {
      toast.success('Bio updated successfully.');
      router.refresh();
      closeRef.current?.click();
    },
    onError() {
      toast.error('Failed to update bio');
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateBio({ bio: value });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Write something about yourself"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
