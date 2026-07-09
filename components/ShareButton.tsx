"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white/80 px-6 py-3 text-sm font-semibold text-amber-800 shadow-md backdrop-blur transition hover:bg-amber-50"
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
    </motion.button>
  );
}
