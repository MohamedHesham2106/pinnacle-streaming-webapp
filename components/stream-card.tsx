import { Stream, User } from '@prisma/client';
import Link from 'next/link';
import { Thumbnail, ThumbnailSkeleton } from './thumbnail';
import { UserAvatar, UserAvatarSkeleton } from './user-avatar';
import { Skeleton } from './ui/skeleton';

interface IStreamCardProps {
  stream: Stream & { user: User };
}

export const StreamCard = ({ stream }: IStreamCardProps) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={stream.thumbnailUrl}
          fallback={stream.user.imageUrl}
          isLive={stream.isLive}
          username={stream.user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={stream.user.username}
            imageUrl={stream.user.imageUrl}
            isLive={stream.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-primary">{stream.name}</p>
            <p className="text-muted-foreground">{stream.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const StreamCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
