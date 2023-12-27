import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useBlock = () => {
  const router = useRouter();
  //* Block mutation
  const { mutate: OnBlock } = trpc.block.useMutation({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`Blocked the user ${data.blocked.username}`);
    },
    onError: () => {
      toast.error('Something went wrong.');
    }
  });
  //* Unblock mutation
  const { mutate: onUnblock } = trpc.unblock.useMutation({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`unBlocked the user ${data.blocked.username}`);
    },
    onError: () => {
      toast.error('Something went wrong.');
    }
  });
  return {
    OnBlock,
    onUnblock
  };
};
