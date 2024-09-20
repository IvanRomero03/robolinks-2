"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "r/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "r/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "r/components/ui/avatar";
import type { Session } from "rbrgs/server/auth";

export default function NavMenu({ session }: { session: Session | null }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-80 lg:w-96 lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 text-lg font-medium">RoboLinks</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A link shortener for the RoBorregos Team. By the RoboWeb
                      Team.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/settings" title="Settings">
                Manage your account settings.
              </ListItem>
              <ListItem href="/pages" title="Pages">
                Create and manage your RoboPages
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {session && session.user ? (
              <div className="flex items-center gap-6">
                <div className="text-sm">{session.user.name}</div>
                <Avatar>
                  <AvatarImage
                    src={session.user.image as string | undefined}
                    alt={session.user.name as string | undefined}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase() +
                      (session.user.name?.split(" ")?.length &&
                      session.user.name?.split(" ")?.length > 1
                        ? session.user.name
                            ?.split(" ")[1]
                            ?.charAt(0)
                            .toUpperCase()
                        : "")!}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <div className="text-sm">Sign In</div>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </div>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-80 lg:w-96 lg:grid-cols-1">
              {session && session.user ? (
                <div>
                  <ListItem href="/api/auth/signout" title="Sign out">
                    Sign out of your account.
                  </ListItem>
                  <ListItem href="/profile" title="Profile">
                    View and edit your profile.
                  </ListItem>
                </div>
              ) : (
                <div>
                  <ListItem href="/api/auth/signin" title="Sign in">
                    Sign in to your account.
                  </ListItem>
                </div>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
