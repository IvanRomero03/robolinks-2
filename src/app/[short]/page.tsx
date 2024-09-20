import { redirect } from "next/navigation";
import { getServerAuthSession } from "rbrgs/server/auth";
import { api } from "rbrgs/trpc/server";

export default async function Short({
  params,
}: {
  params: {
    short: string;
  };
}) {
  //   const session = await getServerAuthSession();
  const link = await api.link.fastGetLink({ short: params.short });
  if (!link) {
    redirect("/404");
  }
  redirect(link.url);
}
