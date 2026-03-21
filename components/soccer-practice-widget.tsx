"use client";

import { useMemo, useState } from "react";

type ScriptLine = {
  speaker: "Coach" | "Tip" | "Players";
  text: string;
};

type SegmentType =
  | "warmup"
  | "drill"
  | "game"
  | "drill2"
  | "game2"
  | "scrimmage"
  | "freeplay";

type PracticeSegment = {
  id: string;
  icon: string;
  type: SegmentType;
  title: string;
  time: string;
  durationMinutes: number;
  objective: string;
  setup: string;
  coachingFocus: string;
  sayThis: string;
  tags: string[];
  script: ScriptLine[];
};

const SEGMENT_STYLES: Record<
  SegmentType,
  { container: string; chip: string; text: string; progress: string }
> = {
  warmup: {
    container: "border-yellow-300/50 bg-yellow-50",
    chip: "bg-yellow-100 text-yellow-800",
    text: "text-yellow-900",
    progress: "bg-yellow-500",
  },
  drill: {
    container: "border-blue-300/40 bg-blue-50",
    chip: "bg-blue-100 text-blue-800",
    text: "text-blue-900",
    progress: "bg-blue-600",
  },
  game: {
    container: "border-emerald-300/40 bg-emerald-50",
    chip: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-900",
    progress: "bg-emerald-600",
  },
  drill2: {
    container: "border-orange-300/40 bg-orange-50",
    chip: "bg-orange-100 text-orange-800",
    text: "text-orange-900",
    progress: "bg-orange-500",
  },
  game2: {
    container: "border-teal-300/40 bg-teal-50",
    chip: "bg-teal-100 text-teal-800",
    text: "text-teal-900",
    progress: "bg-teal-600",
  },
  scrimmage: {
    container: "border-violet-300/40 bg-violet-50",
    chip: "bg-violet-100 text-violet-800",
    text: "text-violet-900",
    progress: "bg-violet-600",
  },
  freeplay: {
    container: "border-rose-300/40 bg-rose-50",
    chip: "bg-rose-100 text-rose-800",
    text: "text-rose-900",
    progress: "bg-rose-600",
  },
};

const SPEAKER_STYLES: Record<ScriptLine["speaker"], string> = {
  Coach: "bg-emerald-100 text-emerald-800",
  Tip: "bg-amber-100 text-amber-800",
  Players: "bg-blue-100 text-blue-800",
};

const PRACTICE_SEGMENTS: PracticeSegment[] = [
  {
    id: "dynamic-warmup",
    icon: "🏃",
    type: "warmup",
    title: "Dynamic Warmup + Ball Touches",
    time: "0:00 - 0:08",
    durationMinutes: 8,
    objective: "Raise heart rate, improve mobility, and get everyone active with the ball.",
    setup: "Each player with a ball in a 20x20 yard grid. Cones on corners.",
    coachingFocus: "Light feet, heads up, and quality first touch.",
    sayThis: "Fast feet, big smile, and touch the ball every 2 seconds.",
    tags: ["Warmup", "Ball Mastery", "Movement"],
    script: [
      { speaker: "Coach", text: "Quick feet in place, now dribble anywhere in the grid." },
      { speaker: "Tip", text: "Keep your knees bent and push the ball, don't kick it far." },
      { speaker: "Players", text: "Can we use both feet? Yes. Challenge mode starts now." },
    ],
  },
  {
    id: "gates-dribbling",
    icon: "🚩",
    type: "drill",
    title: "Gates Dribbling Challenge",
    time: "0:08 - 0:18",
    durationMinutes: 10,
    objective: "Improve control while dribbling and scanning for space.",
    setup: "Place 8-10 cone gates. Players score by dribbling through as many gates as possible.",
    coachingFocus: "Scan early, change pace after each gate, and use both feet.",
    sayThis: "Eyes up before every gate. Burst out fast after your touch.",
    tags: ["Dribbling", "Scanning", "Agility"],
    script: [
      { speaker: "Coach", text: "Score points by dribbling through a gate and turning away quickly." },
      { speaker: "Tip", text: "Try inside-outside touches to turn faster." },
      { speaker: "Players", text: "I'm at 6 gates. Going for 8 this round." },
    ],
  },
  {
    id: "passing-triangles",
    icon: "🔺",
    type: "game",
    title: "Passing Triangles",
    time: "0:18 - 0:30",
    durationMinutes: 12,
    objective: "Build passing rhythm and movement after the pass.",
    setup: "Groups of 3 in triangles, one ball per group.",
    coachingFocus: "First touch to prepare the pass and move to support immediately.",
    sayThis: "Pass, move, show, repeat. Keep the triangle alive.",
    tags: ["Passing", "Support", "Teamwork"],
    script: [
      { speaker: "Coach", text: "Pass and follow your pass. Keep your shape." },
      { speaker: "Tip", text: "Open your body so your next pass is easy." },
      { speaker: "Players", text: "One touch if we can, two touch if we need." },
    ],
  },
  {
    id: "1v1-to-goals",
    icon: "⚡",
    type: "drill2",
    title: "1v1 to Mini Goals",
    time: "0:30 - 0:42",
    durationMinutes: 12,
    objective: "Develop attacking confidence and defending technique.",
    setup: "Two mini goals, rotate pairs quickly. Start from coach pass-in.",
    coachingFocus: "Attack with speed, defend side-on, recover quickly after transition.",
    sayThis: "Explode into space. Defenders, delay first and win second touch.",
    tags: ["1v1", "Transition", "Finishing"],
    script: [
      { speaker: "Coach", text: "Winner stays in. Play at game speed." },
      { speaker: "Tip", text: "One fake, one burst. Keep it simple." },
      { speaker: "Players", text: "Defender pressure! I'm turning out." },
    ],
  },
  {
    id: "small-sided",
    icon: "🎯",
    type: "game2",
    title: "4v4 Small-Sided Game",
    time: "0:42 - 0:56",
    durationMinutes: 14,
    objective: "Apply dribbling, passing, and transition habits in game moments.",
    setup: "Two teams, small field, no goalkeepers. Quick restarts.",
    coachingFocus: "Create width, communicate, and transition quickly after loss.",
    sayThis: "Win the ball in 3 seconds, then play forward.",
    tags: ["Small-Sided", "Decision Making", "Compete"],
    script: [
      { speaker: "Coach", text: "Play fast. Restarts in 3 seconds." },
      { speaker: "Tip", text: "Use the wide player to reset if crowded." },
      { speaker: "Players", text: "Switch! Time! Player on your back!" },
    ],
  },
  {
    id: "scrimmage",
    icon: "🧠",
    type: "scrimmage",
    title: "Conditioned Scrimmage",
    time: "0:56 - 1:08",
    durationMinutes: 12,
    objective: "Transfer core principles into realistic game flow.",
    setup: "Normal scrimmage with one focus rule per round.",
    coachingFocus: "First pass forward when possible, compact shape when defending.",
    sayThis: "Play brave, stay connected, and talk every minute.",
    tags: ["Scrimmage", "Tactics", "Communication"],
    script: [
      { speaker: "Coach", text: "Round 1 rule: goal counts double after 3 passes." },
      { speaker: "Tip", text: "Check your shoulder before receiving." },
      { speaker: "Players", text: "Set! Turn! Through ball on!" },
    ],
  },
  {
    id: "cooldown",
    icon: "👏",
    type: "freeplay",
    title: "Cool Down + Team Huddle",
    time: "1:08 - 1:15",
    durationMinutes: 7,
    objective: "Recover, reflect, and lock in one focus for next session.",
    setup: "Light jogging, stretch circle, quick debrief.",
    coachingFocus: "Breathing down, hydration, and positive finish.",
    sayThis: "What is one thing you did better today than last practice?",
    tags: ["Recovery", "Reflection", "Culture"],
    script: [
      { speaker: "Coach", text: "One win, one challenge, one goal for next practice." },
      { speaker: "Tip", text: "Keep feedback short and specific." },
      { speaker: "Players", text: "I scanned more before receiving today." },
    ],
  },
];

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function SoccerPracticeWidget() {
  const [openSegmentId, setOpenSegmentId] = useState<string>(PRACTICE_SEGMENTS[0].id);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed],
  );
  const progress = (completedCount / PRACTICE_SEGMENTS.length) * 100;

  function toggleComplete(id: string) {
    setCompleted((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  function markAllDone() {
    const next: Record<string, boolean> = {};
    for (const segment of PRACTICE_SEGMENTS) next[segment.id] = true;
    setCompleted(next);
  }

  function resetSession() {
    setCompleted({});
    setOpenSegmentId(PRACTICE_SEGMENTS[0].id);
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-3 pb-10 pt-4 sm:px-4">
      <div className="overflow-hidden rounded-2xl border border-emerald-800/20 bg-emerald-700 shadow-lg">
        <div className="relative px-4 py-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_42px,transparent_42px,transparent_84px)]" />
          <div className="relative flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              ⚽
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Practice Plan
              </h1>
              <p className="text-xs font-semibold text-emerald-100 sm:text-sm">
                Mobile quick-view for tomorrow&apos;s session
              </p>
            </div>
            <span className="ml-auto rounded-full bg-white/20 px-2 py-1 text-[11px] font-bold text-white">
              75 min
            </span>
          </div>
        </div>

        <div className="border-t border-white/15 bg-white/95 px-4 py-3 sm:px-6">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <span>Progress</span>
            <span>
              {completedCount}/{PRACTICE_SEGMENTS.length} complete
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-600 transition-all duration-500"
              style={{ width: formatPercent(progress) }}
            />
          </div>
        </div>
      </div>

      <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
        Keep this page open during practice. Tap each block to expand and mark complete.
      </p>

      <div className="sticky top-3 z-20 mt-3 flex gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={markAllDone}
          className="min-h-10 flex-1 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Mark all done
        </button>
        <button
          type="button"
          onClick={resetSession}
          className="min-h-10 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {PRACTICE_SEGMENTS.map((segment, index) => {
          const styles = SEGMENT_STYLES[segment.type];
          const isOpen = openSegmentId === segment.id;
          const isDone = Boolean(completed[segment.id]);

          return (
            <article
              key={segment.id}
              className={`rounded-2xl border ${styles.container} shadow-sm transition hover:shadow-md`}
            >
              <button
                type="button"
                onClick={() => setOpenSegmentId(isOpen ? "" : segment.id)}
                className="flex w-full items-center gap-3 px-3 py-3 text-left sm:px-4"
                aria-expanded={isOpen}
                aria-controls={`segment-${segment.id}`}
              >
                <span className="text-2xl" aria-hidden>
                  {segment.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {segment.time} - {segment.durationMinutes}m
                  </p>
                  <p className={`truncate text-sm font-extrabold sm:text-base ${styles.text}`}>
                    {segment.title}
                  </p>
                </div>
                <span
                  className={`ml-auto rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${styles.chip}`}
                >
                  {index + 1}
                </span>
              </button>

              <div id={`segment-${segment.id}`} className={isOpen ? "block px-3 pb-3 sm:px-4" : "hidden"}>
                <div className="mb-3 h-px bg-slate-300/60" />
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-black/5 bg-white/80 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Objective
                    </p>
                    <p className="mt-1 text-sm text-slate-800">{segment.objective}</p>
                  </div>
                  <div className="rounded-lg border border-black/5 bg-white/80 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Setup</p>
                    <p className="mt-1 text-sm text-slate-800">{segment.setup}</p>
                  </div>
                  <div className="rounded-lg border border-black/5 bg-white/80 p-2.5 sm:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Coaching focus
                    </p>
                    <p className="mt-1 text-sm text-slate-800">{segment.coachingFocus}</p>
                  </div>
                </div>

                <div className="mt-2 rounded-lg border border-black/5 bg-white/80 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Script</p>
                  <div className="mt-2 space-y-2">
                    {segment.script.map((line) => (
                      <div key={`${segment.id}-${line.speaker}-${line.text}`} className="flex gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${SPEAKER_STYLES[line.speaker]}`}
                        >
                          {line.speaker}
                        </span>
                        <p className="text-sm text-slate-700">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 rounded-lg border border-black/5 bg-white/85 p-2.5">
                  <p className="text-sm font-extrabold italic text-slate-800">
                    &ldquo;{segment.sayThis}&rdquo;
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {segment.tags.map((tag) => (
                      <span
                        key={`${segment.id}-${tag}`}
                        className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleComplete(segment.id)}
                  className={`mt-2 min-h-10 rounded-full px-3 text-sm font-bold ${
                    isDone
                      ? `${styles.progress} text-white`
                      : "border border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {isDone ? "Completed" : "Mark complete"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
