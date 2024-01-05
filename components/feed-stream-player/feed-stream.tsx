'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { FeedVideo, FeedVideoSkeleton } from './feed-video';
type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
};

interface IStreamPlayerProps {
  user: CustomUser;
}

export const FeedStreamPlayer = ({ user }: IStreamPlayerProps) => {
  const { viewerToken } = useViewerToken(user.id);
  if(!viewerToken)
  return <FeedVideoSkeleton />;
  return (
    <LiveKitRoom token={viewerToken} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
      <FeedVideo hostName={user.username} hostIdentity={user.id} />
    </LiveKitRoom>
  );
};
