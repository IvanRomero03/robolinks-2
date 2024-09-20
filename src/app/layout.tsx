import "rbrgs/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "rbrgs/trpc/react";
import { Card } from "r/components/ui/card";
import { getServerAuthSession } from "rbrgs/server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "r/components/ui/avatar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "r/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "r/components/ui/navigation-menu";
import NavMenu from "./_components/NavMenu";

export const metadata: Metadata = {
  title: "RoboLinks",
  description: "Link shortener for the RoBorregos Team",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Card className="b-2 flex items-center justify-between rounded-none py-4">
          <div className="flex w-full justify-end">
            <p className="text-2xl font-bold">RoboLinks</p>
          </div>
          <div className="mr-12 flex w-full justify-end">
            <NavMenu session={session} />
          </div>
        </Card>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
