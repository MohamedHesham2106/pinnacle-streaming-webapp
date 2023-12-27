'use client';

import { toast } from 'sonner';
import { Heart, HeartCrack } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFollow } from '@/hooks/use-follow';
import { useHover } from 'usehooks-ts';

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const StreamActions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();
  const { onFollow, OnUnfollow } = useFollow();
  const heartRef = useRef<HTMLButtonElement>(null);
  const isHover = useHover(heartRef);

  const handleFollow = () => {
    startTransition(() => {
      onFollow({ id: hostIdentity });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      OnUnfollow({ id: hostIdentity });
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  const HeartIcon = isHover ? HeartCrack : Heart;
  return (
    <Button
      ref={heartRef}
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto uppercase text-xs"
    >
      {isFollowing ? (
        <HeartIcon className={cn('h-4 w-4 fill-white', isHover && 'stroke-black')} />
      ) : (
        <>
          <Heart className={cn('h-4 w-4 mr-2', isHover ? 'fill-white' : 'fill-none')} /> {'Follow'}
        </>
      )}
    </Button>
  );
};

export const StreamActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
