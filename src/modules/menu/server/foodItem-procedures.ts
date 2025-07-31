import { category, foodItem } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
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
      const [data] = await ctx.db
        .insert(foodItem)
        .values({
          categoryId: input.categoryId,
          name: input.name,
          rating: input.rating,
          price: input.price,
          imageUrl: input.imageUrl,
        })
        .returning();
      if (!data)
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "Can't create product",
        });
    }),
  getMany: baseProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        rating: foodItem.rating,
        imageUrl: foodItem.imageUrl,
        categoryName: category.name,
      })
      .from(foodItem)
      .leftJoin(category, eq(foodItem.categoryId, category.id));

    return result;
  }),
  remove: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(foodItem).where(eq(foodItem.id, input.id));
    }),
});
