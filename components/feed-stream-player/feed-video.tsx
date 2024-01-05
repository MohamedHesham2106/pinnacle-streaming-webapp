'use client';

import { Track, ConnectionState } from 'livekit-client';
import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';

import { LoadingVideo } from '@/components/stream-player/loading-video';
import { Skeleton } from '../ui/skeleton';
import { FeedLiveVideo } from './feed-live-video';
import { OfflineVideo } from '../stream-player/offline-video';

interface IVideoProps {
  hostName: string;
  hostIdentity: string;
}
export const FeedVideo = ({ hostIdentity, hostName }: IVideoProps) => {
  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    (t) => t.participant === participant
  );

  let content;

  if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <FeedLiveVideo participant={participant} hostName={hostName} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const FeedVideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-72 w-full rounded-none" />
    </div>
  );
};
