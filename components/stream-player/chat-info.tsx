import { useMemo } from 'react';
import { Info } from 'lucide-react';
import { Hint } from '@/components/hint';

interface IChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: IChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) return 'Only followers can chat';
    if (!isFollowersOnly && isDelayed) return 'Chat is delayed by 3 seconds';
    if (isFollowersOnly && isDelayed) return 'Chat is delayed and only followers can chat.';
    return '';
  }, [isDelayed, isFollowersOnly]);
  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) return 'Followers Only';
    if (!isFollowersOnly && isDelayed) return 'Slow Mode';
    if (isFollowersOnly && isDelayed) return 'Followers Only & Slow Mode';
    return '';
  }, [isDelayed, isFollowersOnly]);
  if (!isDelayed && !isFollowersOnly) return null;
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
