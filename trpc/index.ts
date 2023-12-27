import { privateProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { followUser, unfollowUser } from '@/services/follow.service';
import { blockUser, unblockUser } from '@/services/block.service';
import { getStreamByUserId } from '@/services/stream.service';
import { db } from '@/database';
import { UTApi } from 'uploadthing/server';
import { extractFileName } from '@/lib/utils';
import { RoomServiceClient } from 'livekit-server-sdk';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const appRouter = router({
  follow: privateProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const followedUser = await followUser(id);
      if (!followedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }
      return followedUser;
    }),
  unfollow: privateProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const unfollowedUser = await unfollowUser(id);
      if (!unfollowedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }
      return unfollowedUser;
    }),
  block: privateProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { userId } = ctx;
      let blockedUser;
      try {
        blockedUser = await blockUser(id);
      } catch {
        //! This User is Guest
      }
      try {
        //! This work on both Guest and Registered User
        await roomService.removeParticipant(userId, id);
      } catch {
        //* User isn't in the room
      }

      if (!blockedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }
      return blockedUser;
    }),
  unblock: privateProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const unblockedUser = await unblockUser(id);
      if (!unblockedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }
      return unblockedUser;
    }),
  updateStream: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        thumbnailUrl: z.string().nullable().optional(),
        isChatEnabled: z.boolean().optional(),
        isChatDelayed: z.boolean().optional(),
        isChatFollowersOnly: z.boolean().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const selfStream = await getStreamByUserId(userId);
      if (!selfStream) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Stream not found'
        });
      }
      const validData = {
        thumbnailUrl: input.thumbnailUrl,
        name: input.name,
        isChatEnabled: input.isChatEnabled,
        isChatFollowersOnly: input.isChatFollowersOnly,
        isChatDelayed: input.isChatDelayed
      };
      //* Delete Thumbnail from UT if it's null
      if (validData.thumbnailUrl === null && selfStream.thumbnailUrl !== null) {
        const utapi = new UTApi();
        const url = extractFileName(selfStream.thumbnailUrl);
        await utapi.deleteFiles(String(url));
      }

      const stream = await db.stream.update({
        where: {
          id: selfStream.id
        },
        data: {
          ...validData
        }
      });

      return stream;
    }),
  updateUser: privateProcedure
    .input(
      z.object({
        bio: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const user = await db.user.update({
        where: {
          id: userId
        },
        data: {
          bio: input.bio
        }
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }
      return user;
    })
});

export type AppRouter = typeof appRouter;
