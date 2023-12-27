import { db } from '@/database';
import { getSelf } from './auth.service';

export async function getRecommended() {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];
  if (userId) {
    //* If user is logged in, show all users except the logged in user
    users = await db.user.findMany({
      where: {
        //* Multiple Queries
        AND: [
          {
            //! Don't Recommend the User itself
            NOT: {
              id: userId
            }
          },
          {
            //!  Don't Recommend Users that are already followed
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            //! Don't Recommend Users that are already blocked
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } else {
    //* If user is not logged in, show all users
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  return users;
}
