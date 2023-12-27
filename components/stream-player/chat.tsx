'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from 'usehooks-ts';
import { ChatVariant, useChatSidebar } from '@/hooks/use-chat-sidebar';

import ChatHeader, { ChatHeaderSkeleton } from '@/components/stream-player/chat-header';
import { ChatForm, ChatFormSkeleton } from '@/components/stream-player/chat-form';
import { ChatList, ChatListSkeleton } from '@/components/stream-player/chat-list';
import { ChatCommunity } from '@/components/stream-player/chat-community';

import { ConnectionState } from 'livekit-client';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';

interface IChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
  viewerName
}: IChatProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  //* Hide Chat if: user isn't online or chat is disabled.
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState<string>('');
  //* Its wrapped inside LiveKitRoom component which contain token and serverURL.
  //* So you don't need to pass options here as it already have the context.
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSend = () => {
    if (!send) return;
    send(value);
    setValue('');
  };
  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-56px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <Fragment>
          <ChatList messages={reverseMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSend}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </Fragment>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity viewerName={viewerName} isHidden={isHidden} hostName={hostName} />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
