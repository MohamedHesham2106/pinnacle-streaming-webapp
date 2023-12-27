'use client';

import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';
interface IToggleCardProps {
  label: string;
  field: FieldTypes;
  value: boolean;
}
export const ToggleCard = ({ field, label, value = false }: IToggleCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutate } = trpc.updateStream.useMutation({
    onSuccess() {
      router.refresh();
      toast.success('Chat settings updated!');
    },
    onError() {
      toast.error('Something went wrong');
    }
  });
  const onChange = () => {
    startTransition(() => {
      mutate({ [field]: !value });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch onCheckedChange={onChange} disabled={isPending} checked={value}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};
export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-fulls" />;
};
