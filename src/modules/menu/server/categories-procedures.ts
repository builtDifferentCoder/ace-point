import { category, foodItem } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";

export const categoryRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .insert(category)
        .values({
          name: input.name,
        })
        .returning();
      if (!data)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Failed to create category",
        });
    }),
  getMany: baseProcedure
    .input(
      z.object({
        categoryFilter: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db.select().from(category);
      if (!categories)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No categories found.",
        });
      let filteredData;
      const { categoryFilter } = input;
      if (categoryFilter) {
        filteredData = await ctx.db
          .select({
            categoryName: category.name,
            name: foodItem.name,
            id: foodItem.id,
            price: foodItem.price,
            rating: foodItem.rating,
            imageUrl: foodItem.imageUrl,
          })
          .from(category)
          .rightJoin(foodItem, eq(foodItem.categoryId, category.id))
          .where(eq(category.name, categoryFilter));
      }
      // if (!filteredData)
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "No products found",
      //   });

      return { categories: categories, filteredData: filteredData };
    }),
});
