"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCartIcon,
  HomeIcon,
  MenuIcon,
  Contact2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";

export const Navbar = () => {
  const { data: session } = authClient.useSession();
  const activePath = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const isAuthPage = activePath === "/sign-in" || activePath === "/sign-up";
  if (isAuthPage) return null;
  const isActive = (href: string) => {
    return activePath === href;
  };
  return (
    <nav className="w-full  h-18 z-100 flex items-center justify-between px-4 sm:px-6 border-b border-b-white overflow-x-auto">
      <div className="flex  items-center px-4 py-2 rounded-lg shadow ">
        <Image src="/logo.jpg" alt="logo" width={48} height={48} />
      </div>
      <div className="flex items-center  justify-between gap-4 font-bold">
        <div
          className={cn(
            "flex items-center px-2 py-1 justify-between gap-2 hover:bg-background/20 rounded-lg  shadow-sm",
            isActive("/") && "bg-background/20"
          )}
        >
          <HomeIcon className="size-6" />
          <Link href="/">Home</Link>
        </div>
        <div
          className={cn(
            "flex items-center px-2 py-1 justify-between gap-2 hover:bg-background/20 rounded-lg shadow-sm",
            isActive("/menu") && "bg-background/20"
          )}
        >
          <MenuIcon className="size-6" />
          <Link href="/menu">Menu</Link>
        </div>

        <div
          className={cn(
            "flex items-center px-2 py-1 justify-between gap-2 hover:bg-background/20 rounded-lg shadow-sm ",
            isActive("/contact") && "bg-background/20"
          )}
        >
          <Contact2Icon className="size-6" />
          <Link href="/contact">Contact</Link>
        </div>
        <Link className="relative" href="/cart">
          <ShoppingCartIcon className="size-6" />
          <div className="absolute -top-[9px] left-[8.5px] z-100">0</div>
        </Link>
        {session?.user ? (
          <UserMenu
            name={session.user.name}
            email={session.user.email}
            imageUrl={session.user.image}
          />
        ) : (
          <div className="space-x-3 shrink-0">
            <Button
              variant="default"
              className="bg-white text-black hover:bg-white/70"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" className="hover:bg-background/20">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
