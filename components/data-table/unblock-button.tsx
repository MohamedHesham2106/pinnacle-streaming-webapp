'use client';

import { toast } from 'sonner';
import { useTransition } from 'react';

import { useBlock } from '@/hooks/use-block';
import { Button } from '@/components/ui/button';

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { onUnblock } = useBlock();

  const onClick = () => {
    startTransition(() => {
      onUnblock({ id: userId });
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
