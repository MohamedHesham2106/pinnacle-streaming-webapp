import { db } from '@/database';
import { getSelf } from '@/services/auth.service';

export async function isBlockedByUser(id: string) {
  try {
    const self = await getSelf();

    const other = await db.user.findUnique({
      where: { id }
    });
    if (!other) throw new Error('User not found');
    if (other.id === self.id) {
      return false;
    }

    /*
    !Using unique constraint (Indexing) to check if block exists
    !This is faster than using findFirst 
    */
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: other.id,
          blockedId: self.id
        }
      }
    });
    return !!existingBlock;
  } catch {
    return false;
  }
}
export async function blockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) throw new Error('You cannot block yourself');
  const other = await db.user.findUnique({
    where: {
      id
    }
  });
  if (!other) throw new Error('User not found');
  /*
    !Using unique constraint (Indexing) to check if block exists
    !This is faster than using findFirst 
    */
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: other.id
      }
    }
  });
  if (existingBlock) throw new Error('User already blocked');
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: other.id
    },
    include: {
      blocked: true
    }
  });
  return block;
}

export async function unblockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) throw new Error('You cannot unblock yourself');
  const other = await db.user.findUnique({
    where: {
      id
    }
  });
  if (!other) throw new Error('User not found');
  /*
    !Using unique constraint (Indexing) to check if block exists
    !This is faster than using findFirst 
    */
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: other.id
      }
    }
  });
  if (!existingBlock) throw new Error('User not blocked');
  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id
    },
    include: {
      blocked: true
    }
  });
  return unblock;
}
