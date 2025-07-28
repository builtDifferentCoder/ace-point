import { caller } from "@/trpc/server";

const Home = async () => {
  const greeting = await caller.hello({ text: "world" });
  return <div>{greeting.greeting}</div>;
};

export default Home;
