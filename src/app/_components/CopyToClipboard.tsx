"use client";

import { Copy, CopyCheck } from "lucide-react";
import { Button } from "r/components/ui/button";
import { useEffect, useState } from "react";

export function CopyToClipboard({ text }: { text: string }) {
  const copyToClipboard = async () => {
    try {
      setCopied(true);
      await navigator.clipboard.writeText(window.location.host + "/" + text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <Button
      variant="outline"
      size="icon"
      className=""
      onClick={() => {
        setCopied(false);
        void copyToClipboard();
      }}
    >
      {copied ? (
        <CopyCheck className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
