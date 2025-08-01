"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddCategory } from "../components/add-category";
import { AddFoodItem } from "../components/add-food-item";
import { CategoryList } from "../components/category-list";
import { useCategoryFilter } from "../../search-params";

export const CategoryView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [filters, setFilters] = useCategoryFilter();
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };
  // const hasAnyFilters = searchParams.get("category");
  // const onClear = () => {
  //   setFilters(null);
  // };
  return (
    <div className="max-w-7xl mx-auto min-h-screen w-full px-8 py-4 shadow-lg ">
      <div className="flex justify-between gap-4 mt-4 items-center">
        <div className="w-[800px] flex">
          <Input
            placeholder="Search by category..."
            className="rounded-3xl bg-white"
            value={filters.category || ""}
            onChange={(e) => onChange("category", e.target.value || null)}
          />
          {/* {hasAnyFilters && (
            <Button
              onClick={() => onClear()}
              className="ml-3 px-4 py-2 hover:bg-background/20"
            >
              Clear
            </Button>
          )} */}
        </div>
        <AddCategory isOpen={isOpen} onOpenChange={setIsOpen} />
        <AddFoodItem isOpen={isItemOpen} onOpenChange={setIsItemOpen} />
      </div>
      <CategoryList categoryFilter={filters.category} />
    </div>
  );
};
