import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";

interface Props {
  name: string;
  email: string;
  imageUrl?: string | null;
}
export const UserMenu = ({ name, email, imageUrl }: Props) => {
  const firstLetter = (name: string) => {
    return name.split("")[0].toUpperCase();
  };
  const fullName = (name: string) => {
    return name.split("")[0].toUpperCase() + name.slice(1, name.length);
  };
  const handleLogout = async () => {
    await authClient.signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {imageUrl ? (
          <Image src={imageUrl} alt="name" width={32} height={32} />
        ) : (
          firstLetter(name)
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center text-black/70 hover:cursor-pointer hover:text-black">
          {fullName(name)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-black/70 hover:cursor-pointer ">
          {email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="text-black/70 hover:scale-105 hover:bg-red-500"
          >
            Sign Out <LogOutIcon className="text-black/70" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
