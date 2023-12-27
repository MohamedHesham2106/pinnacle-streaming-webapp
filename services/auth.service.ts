import { currentUser } from '@clerk/nextjs';
import { db } from '@/database';

export async function getSelf() {
  const self = await currentUser();
  if (!self || !self.username) throw new Error('unauthorized');
  const user = await db.user.findUnique({
    where: { externalUserId: self.id }
  });
  if (!user) throw new Error('Not found');
  return user;
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser();
  if (!self || !self.username) throw new Error('unauthorized');
  const user = await db.user.findUnique({
    where: { username }
  });
  if (!user) throw new Error('Not found');
  if (self.username !== username) throw new Error('unauthorized');

  return user;
}
