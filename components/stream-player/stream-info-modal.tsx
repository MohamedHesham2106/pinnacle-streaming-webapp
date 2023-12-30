'use client';

import { useState, useTransition, useRef, ElementRef } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { trpc } from '@/app/_trpc/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface IStreamInfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const StreamInfoModal = ({ initialName, initialThumbnailUrl }: IStreamInfoModalProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setTumbnailUrl] = useState(initialThumbnailUrl);

  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);

  const [isPending, startTransition] = useTransition();
  const { mutate: updateStream } = trpc.updateStream.useMutation({
    onSuccess: () => {
      toast.success('Stream info updated', {
        action: {
          label: 'Dismiss',
          onClick: () => toast.dismiss()
        }
      });
      router.refresh();
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Something went wrong', {
        action: {
          label: 'Dismiss',
          onClick: () => toast.dismiss()
        }
      });
    }
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name });
    });
  };

  const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ thumbnailUrl: null });
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
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Stream Name</Label>
            <Input
              placeholder="Enter a name for your stream"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Stream Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-10">
                  <Hint label="Remove Thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemoveThumbnail}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Hint>
                </div>
                <Image src={thumbnailUrl} alt="thumbnail" fill className="object-cover" />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: '#FFFFFF'
                    },
                    allowedContent: {
                      color: '#FFFFFF'
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setTumbnailUrl(res?.[0].url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                  onUploadError={(err) => {
                    toast.error(err.message);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
