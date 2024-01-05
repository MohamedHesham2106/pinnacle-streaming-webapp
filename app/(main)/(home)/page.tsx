import { FeedStream, FeedStreamSkeleton } from '@/components/feed-stream-player';
import { Streams, StreamsSkeleton } from '@/components/streams';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto space-y-12">
      <Suspense fallback={<FeedStreamSkeleton />}>
        <FeedStream />
      </Suspense>
      <Suspense fallback={<StreamsSkeleton />}>
        <Streams />
      </Suspense>
    </div>
  );
}
