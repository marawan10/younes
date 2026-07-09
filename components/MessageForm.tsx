"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { fireCelebrationConfetti } from "@/components/celebration-effects";
import { siteContent } from "@/lib/content";
import type { Message } from "@/lib/db/schema";

export function MessageForm({
  onMessageSent,
}: {
  onMessageSent: (message: Message) => void;
}) {
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, body, website }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorText(
          data.error === "rate_limited"
            ? siteContent.rateLimited
            : siteContent.sentError,
        );
        return;
      }

      setAuthorName("");
      setBody("");
      setStatus("success");
      fireCelebrationConfetti();
      onMessageSent(data.message);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorText(siteContent.sentError);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-4 shadow-[0_20px_70px_rgba(126,200,227,0.18)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-10">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mb-6 text-center sm:mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          {siteContent.sendTitle}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base">
          {siteContent.sendSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mx-auto max-w-xl space-y-4 sm:space-y-5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="authorName"
            className="block text-sm font-semibold text-slate-700"
          >
            {siteContent.nameLabel}
          </label>
          <input
            id="authorName"
            type="text"
            required
            maxLength={50}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder={siteContent.namePlaceholder}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4 text-base text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="body"
              className="block text-sm font-semibold text-slate-700"
            >
              {siteContent.messageLabel}
            </label>
            <span className="text-xs font-medium text-slate-400">
              {siteContent.charCount(body.length, 300)}
            </span>
          </div>
          <textarea
            id="body"
            required
            rows={5}
            maxLength={300}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={siteContent.messagePlaceholder}
            className="w-full resize-none rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4 text-base text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {siteContent.sentSuccess}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorText}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
          className="group relative flex min-h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500 bg-[length:200%_100%] px-6 py-4 text-base font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[position:100%_0] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {siteContent.sending}
            </>
          ) : (
            <>
              {siteContent.sendButton}
              <Send className="h-5 w-5 transition group-hover:-translate-x-0.5" />
            </>
          )}
        </motion.button>
      </form>
    </section>
  );
}
