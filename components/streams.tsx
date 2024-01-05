import { getStreams } from '@/services/feed.service';
import { StreamCard, StreamCardSkeleton } from './stream-card';
import { Skeleton } from '@/components/ui/skeleton';

export const Streams = async () => {
  const data = await getStreams();
  const OfflineStreams = data.filter((stream) => stream.isLive === false);
  return (
    <div className="text-lg font-semibold pb-6 space-y-5">
      {data.length === 0 && <div className="text-muted-foreground text-sm">No streams yet.</div>}
      <h2 className="text-lg font-semibold mb-4">Suggested Streamers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {OfflineStreams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

export const StreamsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <StreamCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
