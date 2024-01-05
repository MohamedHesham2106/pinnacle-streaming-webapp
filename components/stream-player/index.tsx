'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { cn } from '@/lib/utils';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { useChatSidebar } from '@/hooks/use-chat-sidebar';
import { ChatToggle } from '@/components/stream-player/chat-toggle';
import { StreamHeader, StreamHeaderSkeleton } from '@/components/stream-player/stream-header';
import { StreamInfoCard } from '@/components/stream-player/stream-info-card';
import { Chat, ChatSkeleton } from '@/components/stream-player/chat';
import { Video, VideoSkeleton } from '@/components/stream-player/video';
import { StreamAboutCard } from './stream-about-card';

type CustomStream = {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
};
type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface IStreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}
export const StreamPlayer = ({ user, stream, isFollowing }: IStreamPlayerProps) => {
  const { viewerToken, identity, name } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);
  if (!viewerToken || !name! || !identity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50 ">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={viewerToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <StreamHeader
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <StreamInfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <StreamAboutCard
            hostIdentity={user.id}
            hostName={user.username}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>

        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <StreamHeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
