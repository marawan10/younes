import { BookOpen, Heart } from "lucide-react";
import { BabyIcon } from "@/components/BabyIcon";
import { siteContent } from "@/lib/content";

export function Hero({ messageCount }: { messageCount: number }) {
  const { quranAyah } = siteContent;

  return (
    <section className="celebration-card page-section relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-4 py-8 text-center shadow-sm sm:rounded-[2rem] sm:border-white/60 sm:bg-white/55 sm:px-10 sm:py-16 sm:shadow-[0_20px_80px_rgba(126,200,227,0.25)] sm:backdrop-blur-2xl">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 sm:gap-7">
        <div className="relative">
          <div className="relative rounded-full border border-white/70 bg-white p-2.5 shadow-sm sm:bg-white/70 sm:p-3 sm:shadow-lg">
            <BabyIcon className="h-24 w-24 sm:h-32 sm:w-32" />
          </div>
        </div>

        <div className="relative w-full space-y-4 sm:space-y-5">
          <div className="relative mx-auto max-w-2xl overflow-visible rounded-2xl border border-sky-100/80 bg-white px-5 py-5 sm:rounded-[1.75rem] sm:bg-gradient-to-br sm:from-white/80 sm:via-sky-50/50 sm:to-violet-50/40 sm:px-10 sm:py-8 sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:backdrop-blur-sm">
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

        <div className="w-full max-w-2xl rounded-2xl border border-amber-200/70 bg-amber-50 px-4 py-5 sm:bg-gradient-to-br sm:from-amber-50/90 sm:to-orange-50/60 sm:px-6 sm:py-6 sm:shadow-inner">
          <p className="font-arabic text-base leading-[2.2] text-amber-950 sm:text-lg sm:leading-[2.3]">
            {siteContent.birthAnnouncement}
          </p>
        </div>

        <blockquote className="relative w-full max-w-2xl rounded-2xl border border-emerald-200/70 bg-emerald-50 px-4 py-5 sm:bg-gradient-to-br sm:from-emerald-50/90 sm:to-sky-50/80 sm:px-6 sm:py-7 sm:shadow-inner">
          <BookOpen className="mx-auto mb-3 h-5 w-5 text-emerald-600/80 sm:mb-4" />
          <p className="font-arabic text-xl leading-[2.1] text-emerald-900 sm:text-3xl sm:leading-[2.2]">
            {quranAyah.arabic}
          </p>
          <footer className="mt-4 text-xs font-semibold text-emerald-700/80 sm:mt-5 sm:text-sm">
            {quranAyah.reference}
          </footer>
        </blockquote>

        {messageCount > 0 && (
          <div className="inline-flex flex-row items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700">
            <span>{siteContent.messagesLabel(messageCount)}</span>
            <Heart className="h-4 w-4 shrink-0 fill-rose-400 text-rose-400" />
          </div>
        )}
      </div>
    </section>
  );
}
