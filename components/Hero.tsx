"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart } from "lucide-react";
import { BabyIcon } from "@/components/BabyIcon";
import { siteContent } from "@/lib/content";

export function Hero({ messageCount }: { messageCount: number }) {
  const { quranAyah } = siteContent;

  return (
    <section className="celebration-card relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 px-4 py-8 text-center shadow-[0_20px_80px_rgba(126,200,227,0.25)] backdrop-blur-2xl sm:rounded-[2rem] sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(126,200,227,0.18),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 sm:gap-7"
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 scale-125 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="relative rounded-full border border-white/70 bg-white/70 p-2.5 shadow-lg sm:p-3">
            <BabyIcon className="h-24 w-24 sm:h-32 sm:w-32" />
          </div>
        </motion.div>

        <div className="relative w-full space-y-4 sm:space-y-5">
          <div className="relative mx-auto max-w-2xl overflow-visible rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white/80 via-sky-50/50 to-violet-50/40 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm sm:rounded-[1.75rem] sm:px-10 sm:py-8">
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-200/40 via-transparent to-violet-200/40 sm:rounded-[1.75rem]" />

            <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center sm:gap-8">
              <span
                className="font-arabic text-[3.25rem] font-bold leading-[1.45] text-sky-700 sm:text-[5.5rem]"
                style={{ paddingBlock: "0.15em" }}
              >
                {siteContent.babyNameAr}
              </span>

              <span
                aria-hidden="true"
                className="h-[2px] w-14 shrink-0 rounded-full bg-sky-400 sm:hidden"
              />

              <span
                aria-hidden="true"
                className="hidden h-20 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sky-300 via-sky-500 to-sky-300 sm:block"
              />

              <span
                className="font-display text-[3.25rem] font-bold leading-[1.45] text-sky-700 sm:text-[5.5rem]"
                style={{ paddingBlock: "0.15em" }}
              >
                {siteContent.babyName}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-base font-medium text-slate-700/90 sm:text-lg">
              {siteContent.subtitle}
            </p>
            <p className="text-sm text-slate-500 sm:text-base">
              {siteContent.birthDate}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="w-full max-w-2xl rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/90 to-orange-50/60 px-4 py-5 shadow-inner sm:px-6 sm:py-6"
        >
          <p className="font-arabic text-base leading-[2.2] text-amber-950 sm:text-lg sm:leading-[2.3]">
            {siteContent.birthAnnouncement}
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative w-full max-w-2xl rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 to-sky-50/80 px-4 py-5 shadow-inner sm:px-6 sm:py-7"
        >
          <BookOpen className="mx-auto mb-3 h-5 w-5 text-emerald-600/80 sm:mb-4" />
          <p className="font-arabic text-xl leading-[2.1] text-emerald-900 sm:text-3xl sm:leading-[2.2]">
            {quranAyah.arabic}
          </p>
          <footer className="mt-4 text-xs font-semibold text-emerald-700/80 sm:mt-5 sm:text-sm">
            {quranAyah.reference}
          </footer>
        </motion.blockquote>

        {messageCount > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex flex-row items-center gap-2 rounded-full border border-rose-200 bg-rose-50/90 px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-sm"
          >
            <span>{siteContent.messagesLabel(messageCount)}</span>
            <Heart className="h-4 w-4 shrink-0 fill-rose-400 text-rose-400" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
