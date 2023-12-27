import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/services/user.service';
import { currentUser } from '@clerk/nextjs';

interface ICreatorPageProps {
  params: {
    username: string;
  };
}
export default async function CreatorPage({ params }: ICreatorPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);
  if (!user || user.externalUserId !== externalUser?.id || !user.stream)
    throw new Error('unauthorized');

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
