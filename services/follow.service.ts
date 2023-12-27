import { db } from '@/database';
import { getSelf } from '@/services/auth.service';

export async function getFollowedUsers() {
  try {
    const self = await getSelf();
    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          //! Prevent User we are following not blocking us
          blocking: {
            none: {
              blockedId: self.id
            }
          }
        }
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true
              }
            }
          }
        }
      }
    });
    return followedUsers;
  } catch (error) {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();
    const other = await db.user.findUnique({
      where: { id }
    });
    if (!other) throw new Error('Not found');
    if (other.id === self.id) return true;
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: other.id
      }
    });
    return !!existingFollow;
  } catch (error) {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();
  const other = await db.user.findUnique({
    where: { id }
  });
  if (!other) throw new Error('Not found');
  if (other.id === self.id) throw new Error('Cannot follow yourself');
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: other.id
    }
  });
  if (existingFollow) throw new Error('Already following');
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: other.id
    },
    include: {
      follower: true,
      following: true
    }
  });
  return follow;
}

export async function unfollowUser(id: string) {
  const self = await getSelf();
  const other = await db.user.findUnique({
    where: { id }
  });
  if (!other) throw new Error('Not found');
  if (other.id === self.id) throw new Error('Cannot unfollow yourself');
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: other.id
    }
  });
  if (!existingFollow) throw new Error('Not following');
  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id
    },
    include: {
      following: true
    }
  });
  return follow;
}
