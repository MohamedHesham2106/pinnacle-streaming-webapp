'use client';
import { Button } from '@/components/ui/button';
import { useBlock } from '@/hooks/use-block';
import { useFollow } from '@/hooks/use-follow';
import { Fragment, useTransition } from 'react';
interface IActionsProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: IActionsProps) => {
  const { onFollow, OnUnfollow } = useFollow();
  const { OnBlock } = useBlock();

  //* Replace isLoading with useTransition
  const [isPending, startTransition] = useTransition();

  //* handle both follow and unfollow mutations
  const handleFollow = () => {
    if (isFollowing) {
      startTransition(() => {
        OnUnfollow({ id: userId });
      });
    } else {
      startTransition(() => {
        onFollow({ id: userId });
      });
    }
  };
  const handleBlock = () => {
    startTransition(() => {
      OnBlock({ id: userId });
    });
  };
  return (
    <Fragment>
      <Button disabled={isPending} onClick={handleFollow} variant="primary">
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlock} disabled={isPending} variant="secondary">
        Block
      </Button>
    </Fragment>
  );
};
