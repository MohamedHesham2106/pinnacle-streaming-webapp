import { StreamPlayerSkeleton } from '@/components/stream-player';
import React from 'react';

export default function UserLoading() {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
}
