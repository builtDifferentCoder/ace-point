import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const CategoryList = () => {
  const trpc = useTRPC();
  const { data: categories } = useQuery(trpc.category.getMany.queryOptions());
  return (
    <>
      <h1 className="text-xl font-bold text-white mt-6 ml-2.5">
        Select by Category
      </h1>
      <div className="text-white flex items-center justify-between mt-6">
        {categories?.map((category) => (
          <div key={category.id} className="px-2 py-1">
            <Button className="hover:bg-background/70 hover:text-black shadow-lg px-6 py-4 ">
              {category.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
