import { category } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
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
});
