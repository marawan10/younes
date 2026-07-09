"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { siteContent } from "@/lib/content";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const text = siteContent.shareText;

    if (navigator.share) {
      try {
        await navigator.share({ title: siteContent.metaTitle, text, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white px-6 py-3 text-sm font-semibold text-amber-800 shadow-md transition hover:bg-amber-50 sm:bg-white/80 sm:backdrop-blur sm:hover:scale-[1.04] sm:active:scale-[0.97]"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {siteContent.copied}
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          {siteContent.share}
        </>
      )}
    </button>
  );
}
