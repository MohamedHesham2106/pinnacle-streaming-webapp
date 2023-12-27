import { StreamPlayer } from '@/components/stream-player';
import { isBlockedByUser } from '@/services/block.service';
import { isFollowingUser } from '@/services/follow.service';
import { getUserByUsername } from '@/services/user.service';
import { notFound } from 'next/navigation';

interface IUserPageProps {
  params: {
    username: string;
  };
}
export default async function UserPage({ params }: IUserPageProps) {
  const user = await getUserByUsername(params.username);
  if (!user || !user.stream) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) notFound();

  return <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />;
}
