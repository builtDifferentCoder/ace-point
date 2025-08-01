import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { FilteredProducts } from "./filtered-products";
import { useSearchParams } from "next/navigation";
import { useCategoryFilter } from "../../search-params";

interface Props {
  categoryFilter?: string | null;
}
export const CategoryList = ({ categoryFilter }: Props) => {
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const { data: categories } = useQuery(
    trpc.category.getMany.queryOptions({ categoryFilter })
  );
  const hasAnyFilters = searchParams.get("category");
  const [filters, setFilters] = useCategoryFilter();
  const onClear = () => {
    setFilters(null);
  };
  const name = categories?.filteredData?.map((item) => item.categoryName);
  const render = name?.some(
    (item) => item?.toLowerCase() === categoryFilter?.toLowerCase()
  );
  console.log(categories);
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2  mt-6 ">
        <h1 className="text-xl font-bold text-white ml-2.5">
          Select by Category
        </h1>
        {hasAnyFilters && (
          <Button
            onClick={() => onClear()}
            className="ml-3 px-4 py-2 hover:bg-background/20"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="text-white flex items-center justify-between mt-6">
        {categories?.categories.map((category) => (
          <div key={category.id} className="px-2 py-1">
            <Button
              className="hover:bg-background/70 hover:text-black shadow-lg px-6 py-4 "
              onClick={() => setFilters({ category: category.name })}
            >
              {category.name}
            </Button>
          </div>
        ))}
      </div>
      {render ? (
        <FilteredProducts data={categories?.filteredData} />
      ) : (
        <ProductCard />
      )}
    </>
  );
};
