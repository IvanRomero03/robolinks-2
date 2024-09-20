"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ShortName({
  short,
  url,
}: {
  short: string;
  url: string;
}) {
  return (
    <Link href={url} className="items-center align-middle hover:underline">
      {(window && window?.location?.host) ?? ""}/{short}
      <ExternalLink className="ml-1 inline-block h-4 w-4" />
    </Link>
  );
}
