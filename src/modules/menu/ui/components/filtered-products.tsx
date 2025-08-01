import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingBagIcon, StarIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data:
    | {
        categoryName: string | null;
        name: string | null;
        id: string | null;
        price: number | null;
        rating: number | null;
        imageUrl: string | null;
      }[]
    | undefined;
}

export const FilteredProducts = ({ data }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(trpc.foodItem.remove.mutationOptions());
  const handleRemove = async (id: string) => {
    await mutateAsync(
      { id },
      {
        onSuccess: () => {
          toast.success("Food Item deleted successfully.");
          queryClient.invalidateQueries(trpc.foodItem.getMany.queryOptions());
        },
        onError: (e) => toast.error(e.message),
      }
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 space-y-4">
      {(data ?? []).map((item) => (
        <div
          className="relative flex flex-col w-[300px] p-4 bg-white h-[320px] rounded-xl shadow-md transition hover:shadow-lg"
          key={item.id}
        >
          <div className="relative h-40 flex items-center justify-center overflow-hidden rounded-xl">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name!}
                width={300}
                height={120}
                className="object-contain  hover:scale-110 transition-all ease-in-out"
              />
            ) : (
              <span className="text-lg text-black">No Image</span>
            )}
          </div>
          <div className="mt-3 ml-1 flex justify-between items-center">
            <h2 className="text-black/70 font-lg leading-tight">{item.name}</h2>
            <h1 className="text-black text-2xl ">{item.categoryName}</h1>
          </div>
          <div className="flex justify-between px-4 py-2 items-center">
            {item?.rating ? (
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) =>
                  item.rating! > i ? (
                    <StarIcon key={uuidv4()} fill="blue" />
                  ) : (
                    <StarIcon key={uuidv4()} fill="black" />
                  )
                )}
              </div>
            ) : null}
            <h3 className="text-black">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
                maximumFractionDigits: 2,
              }).format(item.price!)}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Button className="hover:bg-black/70 w-[220px]">
              Add to Cart <ShoppingBagIcon className="size-4" />
            </Button>
            <Button
              variant="destructive"
              className="hover:bg-red-500/90"
              onClick={() => handleRemove(item.id!)}
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
