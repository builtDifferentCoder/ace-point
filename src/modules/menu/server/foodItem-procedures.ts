import { foodItem } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const foodItemRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        categoryId: z.string(),
        name: z.string(),
        rating: z.number(),
        price: z.number(),
        imageUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(foodItem).values({
        categoryId: input.categoryId,
        name: input.name,
        rating: input.rating,
        price: input.price,
        imageUrl: input.imageUrl,
      });
      if (!data)
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "Can't create product",
        });
    }),
});
