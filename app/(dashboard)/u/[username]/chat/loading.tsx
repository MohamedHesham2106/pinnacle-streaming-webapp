import { ToggleCardSkeleton } from '@/components/chat/toggle-card';
import { Skeleton } from '@/components/ui/skeleton';

//* Loading state for async page
export default function ChatLoading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
}
