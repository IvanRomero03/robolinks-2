import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "r/components/ui/button";
import { Input } from "r/components/ui/input";
import { Copy, Pencil } from "lucide-react";
import { LatestPost } from "rbrgs/app/_components/post";
import { getServerAuthSession } from "rbrgs/server/auth";
import { api, HydrateClient } from "rbrgs/trpc/server";
import { CreateLink } from "./_components/CreateLink";
import { Card, CardContent, CardHeader } from "r/components/ui/card";
import ShortName from "rbrgs/app/_components/ShortName";
import { CopyToClipboard } from "./_components/CopyToClipboard";
import { Avatar, AvatarFallback, AvatarImage } from "r/components/ui/avatar";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    redirect("/login");
    return (
      <>
        <p>Redirecting...</p>
      </>
    );
  }
  const links = await api.link.getLinks();
  return (
    <div className="flex w-screen flex-col">
      <div className="w-3xl m-8 flex justify-center gap-2">
        <Input placeholder="Search " className="max-w-3xl" />
        <Button className="ml-2" variant={"outline"}>
          Search
        </Button>
        <CreateLink edit={false} />
      </div>
      <div className="flex justify-center">
        {links.map((link) => (
          <Card key={link.id} className="m-4 w-1/5">
            <CardHeader className="">
              <div className="flex items-center justify-between align-middle">
                <Link href={"/links/" + link.id} className="hover:underline">
                  {link.name}
                </Link>
                <div className="flex gap-x-2">
                  <CreateLink
                    edit
                    initialValues={{
                      name: link.name,
                      short: link.short,
                      url: link.url,
                      description: link.description,
                      id: link.id,
                    }}
                  />
                  <CopyToClipboard text={link.short} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ShortName short={link.short} url={link.url} />
              <div className="m-4 flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src={link.createdBy.image as string | undefined}
                    alt={link.createdBy.name as string | undefined}
                  />
                  <AvatarFallback>
                    {link.createdBy.name?.charAt(0).toUpperCase() +
                      (link.createdBy.name?.split(" ")?.length &&
                      link.createdBy.name?.split(" ")?.length > 1
                        ? link.createdBy.name
                            ?.split(" ")[1]
                            ?.charAt(0)
                            .toUpperCase()
                        : "")!}
                  </AvatarFallback>
                </Avatar>
                <p>{link.createdBy.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
