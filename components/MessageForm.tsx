"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteContent } from "@/lib/content";

export function MessageForm() {
  const router = useRouter();
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
            : data.error === "storage_unavailable"
              ? siteContent.storageError
              : siteContent.sentError,
        );
        return;
      }

      setAuthorName("");
      setBody("");
      setStatus("success");
      router.refresh();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorText(siteContent.sentError);
    }
  }

  return (
    <section className="page-section relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 md:rounded-[2rem] md:border-white/70 md:bg-white/60 md:p-10 md:shadow-[0_20px_70px_rgba(126,200,227,0.18)] md:backdrop-blur-2xl">
      <div className="form-glow pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-violet-200/40 blur-3xl md:block" />
      <div className="form-glow pointer-events-none absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full bg-sky-200/40 blur-3xl md:block" />

      <div className="relative mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-4xl">
          {siteContent.sendTitle}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 md:mt-2 md:text-base">
          {siteContent.sendSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mx-auto max-w-xl space-y-4 md:space-y-5">
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
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-base text-slate-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
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
            className="w-full resize-none rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-base text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {siteContent.sentSuccess}
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorText}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {siteContent.sending}
            </>
          ) : (
            <>
              {siteContent.sendButton}
              <Send className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
