import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const AddCategory = ({ isOpen, onOpenChange }: Props) => {
  const [category, setCategory] = useState("");
  const trpc = useTRPC();
  const { mutateAsync } = useMutation(trpc.category.create.mutationOptions());
  const handleClick = async () => {
    await mutateAsync(
      {
        name: category,
      },
      {
        onSuccess: () => toast("Category added successfully."),
        onError: () => toast("Failed to add category."),
      }
    );
    setCategory("");
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <div className="truncate">
          <DialogTrigger className="gap-2 cursor-pointer hover:bg-background/20 rounded-lg p-2">
            Add Category
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogTitle className="text-center">Add Category</DialogTitle>
          <DialogHeader>
            <Input
              placeholder="Enter category name..."
              className="rounded-lg mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button type="submit" onClick={handleClick}>
              Add
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
