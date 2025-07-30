import { categoryRouter } from "@/modules/menu/server/categories-procedures";
import { createTRPCRouter } from "../init";
import { foodItemRouter } from "@/modules/menu/server/foodItem-procedures";
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  foodItem: foodItemRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
