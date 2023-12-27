import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LiveBadge } from '@/components/live-badge';
const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'w-8 h-8',
      lg: 'w-14 h-14'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

interface IUserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}
export const UserAvatar = ({ imageUrl, username, isLive, showBadge, size }: IUserAvatarProps) => {
  const canShowBadge = isLive && showBadge;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-primary border border-background',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} alt={username} className="object-cover" />
        <AvatarFallback>
          {username[0].toUpperCase()}
          {username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2
            "
        >
          <LiveBadge />
        </div>
      )}
    </div>
  );
};
interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}
export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
};
