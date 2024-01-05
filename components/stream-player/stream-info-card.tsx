'use client';

import Image from 'next/image';
import { Pencil } from 'lucide-react';

import { StreamInfoModal } from '@/components/stream-player/stream-info-modal';
import { Separator } from '@/components/ui/separator';

interface IStreamInfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
}
export const StreamInfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl
}: IStreamInfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;
  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-primary p-2 w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">Edit your stream info</h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility by adding a title and thumbnail to your stream.
            </p>
          </div>
          <StreamInfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Stream Title</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Stream Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-square rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image fill src={thumbnailUrl} alt={name} className='object-cover' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
