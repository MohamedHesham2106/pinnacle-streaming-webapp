import { getStreams } from '@/services/feed.service';
import { FeedCarousel, FeedCarouselSkeleton } from './feed-carousel';
import { Skeleton } from '../ui/skeleton';

export const FeedStream = async () => {
  const data = await getStreams();
  const LiveStreams = data.filter((stream) => stream.isLive === true);
  return (
    <div className="text-lg font-semibold mb-4 space-y-5">
      {data.length === 0 && <div className="text-muted-foreground text-sm">No streams yet.</div>}
      <h2 className="text-lg font-semibold mb-4">Live Streams</h2>
      {LiveStreams.length > 0 ? (
        <div className="flex items-center justify-center py-6 px-16 w-full bg-background/50 rounded-xl border-zinc-500">
          <FeedCarousel data={LiveStreams} />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-6">
          Currently No streams are active.
        </p>
      )}
    </div>
  );
};

export const FeedStreamSkeleton = () => {
  return (
    <div className="text-lg font-semibold mb-4 space-y-5">
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex items-center justify-center py-6 px-16 w-full bg-background/50 rounded-xl border-zinc-500">
        <FeedCarouselSkeleton />
      </div>
    </div>
  );
};
