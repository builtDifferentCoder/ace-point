"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddCategory } from "../components/add-category";
import { AddFoodItem } from "../components/add-food-item";
import { CategoryList } from "../components/category-list";

export const CategoryView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  return (
    <div className="max-w-7xl mx-auto min-h-screen w-full px-8 py-4 shadow-lg ">
      <div className="flex justify-between gap-4 mt-4 items-center">
        <div className="w-[800px]">
          <Input placeholder="Search by category..." className="rounded-3xl" />
        </div>
        <AddCategory isOpen={isOpen} onOpenChange={setIsOpen} />
        <AddFoodItem isOpen={isItemOpen} onOpenChange={setIsItemOpen} />
      </div>
      <CategoryList />
    </div>
  );
};
