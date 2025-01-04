import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { PrismaClient } from "@prisma/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  console.log("We should be seeing something from server logs?!?!?")
  const prisma = new PrismaClient();
  const users = await prisma.user.findFirst();
  console.log(users);
  return { message: context.VALUE_FROM_VERCEL, users };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <>
  <Welcome message={loaderData.message} />
  asdfasdf
  <div>{loaderData.users?.name}</div>
  </>;
}
