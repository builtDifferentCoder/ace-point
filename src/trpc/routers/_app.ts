import { categoryRouter } from "@/modules/menu/server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  category: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
