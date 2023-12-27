import { cn } from '@/lib/utils';
interface ILiveBadgeProps {
  className?: string;
}
export const LiveBadge = ({ className }: ILiveBadgeProps) => {
  return (
    <div
      className={cn(
        'bg-primary text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide',
        className
      )}
    >
      Live
    </div>
  );
};
