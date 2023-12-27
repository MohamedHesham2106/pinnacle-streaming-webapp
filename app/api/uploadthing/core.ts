import { db } from '@/database';
import { getSelf } from '@/services/auth.service';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      const self = await getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id
        },
        data: {
          thumbnailUrl: file.url
        }
      });
      return { fileUrl: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
