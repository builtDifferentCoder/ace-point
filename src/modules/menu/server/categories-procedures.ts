import { category } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const categoryRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(category).values({
        name: input.name,
      });
      return data;
    }),
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.select().from(category);
    if (!categories)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No categories found.",
      });

    return categories;
  }),
});
