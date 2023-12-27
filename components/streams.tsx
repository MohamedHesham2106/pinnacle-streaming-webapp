import { getStreams } from '@/services/feed.service';
import React from 'react';
import { StreamCard, StreamCardSkeleton } from './stream-card';
import { Skeleton } from './ui/skeleton';

export const Streams = async () => {
  const data = await getStreams();
  return (
    <div className="text-lg font-semibold mb-4">
      <h2 className="text-lg font-semibold mb-4">Streams we think you&apos;ll like</h2>
      {data.length === 0 && <div className="text-muted-foreground text-sm">No streams yet.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((stream) => (
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
