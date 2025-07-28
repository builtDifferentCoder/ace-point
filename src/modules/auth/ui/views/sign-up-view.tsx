"use client";
import { RegisterSchema, RegisterType } from "../../schemas";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpView = () => {
  const router = useRouter();
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async ({ name, email, password }: RegisterType) => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast("Signed up successfully.");
          router.push("/");
        },
        onError: (ctx) => {
          toast(ctx.error.message);
        },
      }
    );
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={64}
            height={64}
            className="rounded-lg shadow-sm"
          />
        </div>
        <h1 className="mt-3 text-2xl font-bold text-black text-center">
          Ace Point
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 p-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/70 ml-1">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-none rounded-lg shadow-lg"
                        type="text"
                        placeholder="Enter your name e.g john"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 p-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/70 ml-1">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:ring-2 focus:ring-pink-500 border-none rounded-lg shadow-lg"
                        type="email"
                        placeholder="john123@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 p-2">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/70 ml-1">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus:ring-2 focus:ring-pink-500 border-none rounded-lg shadow-lg"
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Sign Up
            </Button>
            <div className="text-black/70 text-center mt-2">or</div>
            <Button
              type="submit"
              className="w-full mt-2"
              onClick={async () =>
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                  errorCallbackURL: "/sign-up",
                })
              }
            >
              Continue with Google
              <FaGoogle className="size-4" />
            </Button>
          </form>
          <div className="mt-3">
            <p className="text-xs text-black/70 text-center">
              Already have an account?
              <small className="p-1 m-1 bg-gradient-to-r from-pink-300 via-pink-500/70 to-pink-700 text-white rounded">
                <Link href="/sign-in">Sign In</Link>
              </small>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};
