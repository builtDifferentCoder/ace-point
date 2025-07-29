import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const AddFoodItem = ({ isOpen, onOpenChange }: Props) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <div className="truncate">
          <DialogTrigger className="gap-2 cursor-pointer hover:bg-background/20 rounded-lg p-2">
            Add Product
          </DialogTrigger>
        </div>
        <div className="flex items-center justify-center">
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add Product</DialogTitle>
              {/* to do make the select dynamic */}
              <Select>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="item">Rice</SelectItem>
                    <SelectItem value="item">Curry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                className="mt-2 w-full"
                placeholder="Enter the name of the item..."
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="mt-2 w-full"
                placeholder="Enter the rating..."
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <Input
                className="mt-2 w-full"
                placeholder="Enter the price of the item..."
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                className="mt-2 w-full"
                type="file"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </DialogHeader>
            <Button className="w-full hover:bg-black/70">Add Product</Button>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};
