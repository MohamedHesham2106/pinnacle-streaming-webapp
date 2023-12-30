import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useFollow = () => {
  const router = useRouter();
  //* Follow mutation
  const { mutate: onFollow } = trpc.follow.useMutation({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`You are now following ${data.following.username}`, {
        action: {
          label: 'Dismiss',
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: () => {
      toast.error('Something went wrong.', {
        action: {
          label: 'Dismiss',
          onClick: () => toast.dismiss()
        }
      });
    }
  });
  //* Unfollow mutation
  const { mutate: OnUnfollow } = trpc.unfollow.useMutation({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`You now unfollowed ${data.following.username}`);
    },
    onError: () => {
      toast.error('Something went wrong.');
    }
  });
  return {
    onFollow,
    OnUnfollow
  };
};
