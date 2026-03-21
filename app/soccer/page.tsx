import type { Metadata } from "next";
import Link from "next/link";
import { SoccerPracticeWidget } from "@/components/soccer-practice-widget";

export const metadata: Metadata = {
  title: "Soccer Practice | mak.codes",
  description:
    "Mobile-friendly soccer practice plan and coaching widget for quick use on the field.",
};

export default function SoccerPage() {
  return (
    <main className="min-h-screen bg-[#F7F6F2] pb-10 pt-4 text-slate-900">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-4">
        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            <span aria-hidden>←</span> Back to mak.codes
          </Link>
        </div>
      </div>

      <SoccerPracticeWidget />
    </main>
  );
}
