import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
  })
    .middleware(async () => {
      const user = await auth.api.getSession({
        headers: await headers(),
      });
      if (!user) throw new UploadThingError("You are not authorized");
      return { user: user.session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { imageUrl: file.customId, userId: metadata.user.id };
    }),
} satisfies FileRouter;

export type uploadRouter = typeof uploadRouter;
