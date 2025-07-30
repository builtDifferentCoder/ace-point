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
import { UploadButton } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AddFoodItem = ({ isOpen, onOpenChange }: Props) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const trpc = useTRPC();
  const { data } = useQuery(trpc.category.getMany.queryOptions());
  const { mutateAsync } = useMutation(trpc.foodItem.create.mutationOptions());
  console.log(name, rating, price, imageUrl, category);
  const handleClick = async () => {
    await mutateAsync(
      {
        name,
        categoryId: category ? category : "",
        rating: Number(rating ? rating : 0),
        price: Number(price ? price : 0),
        imageUrl: imageUrl,
      },
      {
        onSuccess: () => toast.success("Food Item added successfully."),
        onError: (e) => toast.error(e.message),
      }
    );
    setName("");
    setRating("");
    setPrice("");
    setCategory("");
    setImageUrl("");
  };
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
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {data?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
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
            </DialogHeader>
            <div className="flex items-center justify-center bg-black/90 text-white rounded-2xl shadow-md p-2 hover:bg-black/70">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const image = res?.[0].ufsUrl;
                  if (!image)
                    throw new Error("No image found.Please try again");
                  setImageUrl(image);
                  toast("Image uploaded successfully");
                }}
              />
            </div>
            <Button className="w-full hover:bg-black/70" onClick={handleClick}>
              Add Product
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};
