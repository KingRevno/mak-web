"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BlockType = "activity" | "water";

type SessionBlock = {
  id: string;
  icon: string;
  type: BlockType;
  title: string;
  durationMinutes: number;
  objective: string;
  setup: string;
  coachingTip: string;
  scriptLine: string;
};

const SESSION_BLOCKS: SessionBlock[] = [
  {
    id: "freeze-tag",
    icon: "🏃",
    type: "activity",
    title: 'Warm-Up — "Freeze Tag with the Ball"',
    durationMinutes: 8,
    objective: "Get every player comfortable touching the ball in a fun and low-pressure start.",
    setup: "Every player has a ball and dribbles around in a marked grid.",
    coachingTip: 'When you call "freeze," remind them to stop the ball with the sole of the foot.',
    scriptLine: "Big smiles, little touches, and stop it strong when I say freeze.",
  },
  {
    id: "water-1",
    icon: "💧",
    type: "water",
    title: "Water Break",
    durationMinutes: 3,
    objective: "Hydrate and reset attention before the next game.",
    setup: "Bring team to sideline, quick sip, and gather back in the grid.",
    coachingTip: "Keep this break short and upbeat so focus stays high.",
    scriptLine: "Quick water, then right back for our next challenge.",
  },
  {
    id: "red-light-green-light",
    icon: "🚦",
    type: "activity",
    title: 'Drill — "Red Light, Green Light Dribbling"',
    durationMinutes: 10,
    objective: "Build basic control and listening skills while dribbling toward coach.",
    setup: "Players start on one line with a ball each and move toward coach on calls.",
    coachingTip:
      "Green = go, Red = stop ball with foot, Yellow = slow dribble. Praise quick reactions.",
    scriptLine: "Green means go, yellow means tiny touches, and red means foot on top of the ball.",
  },
  {
    id: "water-2",
    icon: "💧",
    type: "water",
    title: "Water Break",
    durationMinutes: 3,
    objective: "Hydrate and lower energy spikes before the next game.",
    setup: "Circle up by cones and count down together to restart quickly.",
    coachingTip: "Give one positive shoutout while players drink.",
    scriptLine: "Sip and breathe, then we play sharks and minnows.",
  },
  {
    id: "sharks-minnows",
    icon: "🦈",
    type: "activity",
    title: 'Fun Game — "Sharks and Minnows"',
    durationMinutes: 10,
    objective: "Encourage shielding, changing direction, and decision making under pressure.",
    setup: "2-3 sharks without balls. Minnows dribble in the grid and avoid losing possession.",
    coachingTip: "Rotate sharks each round so everyone gets turns and stays engaged.",
    scriptLine: "Minnows protect your ball, sharks chase with control and quick feet.",
  },
  {
    id: "water-3",
    icon: "💧",
    type: "water",
    title: "Water Break",
    durationMinutes: 3,
    objective: "Hydrate and transition to a focused directional drill.",
    setup: "Use this break to set cone gates while players drink.",
    coachingTip: "Set expectations for light kicks and eyes up before restarting.",
    scriptLine: "One more drink, then we shoot through the gates.",
  },
  {
    id: "kick-in-gate",
    icon: "🚩",
    type: "activity",
    title: 'Drill — "Kick It In the Gate"',
    durationMinutes: 8,
    objective: "Practice dribbling with direction and simple controlled shooting.",
    setup: "Place 4-5 cone gates around a small grid. Players dribble and kick through gates.",
    coachingTip: "Encourage gentle passes through the gate, then recover and dribble again.",
    scriptLine: "Eyes up, pick a gate, and pass it through with control.",
  },
  {
    id: "water-4",
    icon: "💧",
    type: "water",
    title: "Water Break",
    durationMinutes: 3,
    objective: "Hydrate before free-play scrimmage.",
    setup: "Gather near mini goals so restart is immediate.",
    coachingTip: "Set one simple reminder: spread out and have fun.",
    scriptLine: "Quick water and then it is game time.",
  },
  {
    id: "mini-game",
    icon: "⚽",
    type: "activity",
    title: 'Scrimmage — "Mini Game Free Play"',
    durationMinutes: 8,
    objective: "Let players play freely and build confidence in a game-like setting.",
    setup: "Split into two small teams on a short field with small goals.",
    coachingTip: "No rules coaching. Keep feedback positive and cheer every effort.",
    scriptLine: "Play, smile, and try your best. Coach is cheering for everyone.",
  },
  {
    id: "cool-down",
    icon: "👏",
    type: "activity",
    title: "Cool Down + Huddle",
    durationMinutes: 4,
    objective: "Help players calm down and reflect on their first practice.",
    setup: "Sit in a circle, take deep breaths, then each kid shares one word.",
    coachingTip: "Model a word first so shy players can follow.",
    scriptLine: "One deep breath, one proud word, and great job today team.",
  },
];

const TOTAL_SESSION_MINUTES = SESSION_BLOCKS.reduce(
  (total, block) => total + block.durationMinutes,
  0,
);
const STORAGE_KEY = "soccer-practice-widget-state-v1";

function formatClock(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function nowMs() {
  return new Date().valueOf();
}

function toTimerState() {
  const state: Record<string, number> = {};
  for (const block of SESSION_BLOCKS) {
    state[block.id] = block.durationMinutes * 60;
  }
  return state;
}

function scheduleWhistleTone(audioCtx: AudioContext, gainScale = 1) {
  const now = audioCtx.currentTime;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.connect(audioCtx.destination);

  const oscillatorA = audioCtx.createOscillator();
  oscillatorA.type = "sawtooth";
  oscillatorA.frequency.setValueAtTime(1500, now);
  oscillatorA.frequency.exponentialRampToValueAtTime(2200, now + 0.22);
  oscillatorA.frequency.exponentialRampToValueAtTime(1300, now + 0.45);

  const oscillatorB = audioCtx.createOscillator();
  oscillatorB.type = "square";
  oscillatorB.frequency.setValueAtTime(1200, now);
  oscillatorB.frequency.exponentialRampToValueAtTime(1700, now + 0.3);

  oscillatorA.connect(gain);
  oscillatorB.connect(gain);

  gain.gain.exponentialRampToValueAtTime(0.22 * gainScale, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.14 * gainScale, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

  oscillatorA.start(now);
  oscillatorB.start(now);
  oscillatorA.stop(now + 0.58);
  oscillatorB.stop(now + 0.58);
}

export function SoccerPracticeWidget() {
  const [openBlockId, setOpenBlockId] = useState<string>(SESSION_BLOCKS[0].id);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [timers, setTimers] = useState<Record<string, number>>(toTimerState);
  const [activeTimerBlockId, setActiveTimerBlockId] = useState<string | null>(null);
  const [activeTimerEndAtMs, setActiveTimerEndAtMs] = useState<number | null>(null);
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);
  const [soundReady, setSoundReady] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const timerRef = useRef<number | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed],
  );
  const progressPercent = (completedCount / SESSION_BLOCKS.length) * 100;
  const wakeLockSupported = typeof navigator !== "undefined" && "wakeLock" in navigator;
  const soundSupported =
    typeof window !== "undefined" &&
    ("AudioContext" in window ||
      "webkitAudioContext" in (window as Window & { webkitAudioContext?: unknown }));

  const requestWakeLock = useCallback(async () => {
    if (!wakeLockSupported || wakeLockRef.current) return;
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch {
      setKeepScreenAwake(false);
    }
  }, [wakeLockSupported]);

  const releaseWakeLock = useCallback(async () => {
    if (!wakeLockRef.current) return;
    try {
      await wakeLockRef.current.release();
    } catch {
      // Ignore wake lock release errors.
    } finally {
      wakeLockRef.current = null;
    }
  }, []);

  const ensureAudioReady = useCallback(
    async (playTestTone: boolean) => {
      if (!soundSupported) return false;
      try {
        if (!audioContextRef.current) {
          const AudioContextCtor =
            window.AudioContext ||
            (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextCtor) return false;
          audioContextRef.current = new AudioContextCtor();
        }

        const audioCtx = audioContextRef.current;
        if (audioCtx.state === "suspended") {
          await audioCtx.resume();
        }

        if (playTestTone) {
          scheduleWhistleTone(audioCtx, 0.5);
        }

        setSoundReady(true);
        setSupportMessage("Sound enabled. You should now hear timer whistles.");
        return true;
      } catch {
        setSoundReady(false);
        setSupportMessage("Sound is blocked. Check silent mode and tap Enable Sound again.");
        return false;
      }
    },
    [soundSupported],
  );

  const playWhistleTone = useCallback(async () => {
    const isReady = await ensureAudioReady(false);
    if (!isReady || !audioContextRef.current) return;
    scheduleWhistleTone(audioContextRef.current);
  }, [ensureAudioReady]);

  function toggleKeepScreenAwake() {
    if (!wakeLockSupported) {
      setSupportMessage("Keep Screen Awake is not supported by this iPhone browser.");
      return;
    }
    setSupportMessage("");
    setKeepScreenAwake((current) => !current);
  }

  const reconcileActiveTimer = useCallback(
    (shouldPlaySound: boolean) => {
      if (!activeTimerBlockId || !activeTimerEndAtMs) return;
      const remaining = Math.max(0, Math.ceil((activeTimerEndAtMs - nowMs()) / 1000));

      if (remaining <= 0) {
        setTimers((current) => ({ ...current, [activeTimerBlockId]: 0 }));
        setCompleted((existing) => ({ ...existing, [activeTimerBlockId]: true }));
        setActiveTimerBlockId(null);
        setActiveTimerEndAtMs(null);
        if (shouldPlaySound) void playWhistleTone();
        return;
      }

      setTimers((current) => {
        if (current[activeTimerBlockId] === remaining) return current;
        return { ...current, [activeTimerBlockId]: remaining };
      });
    },
    [activeTimerBlockId, activeTimerEndAtMs, playWhistleTone],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedRaw = window.localStorage.getItem(STORAGE_KEY);
      if (!savedRaw) return;

      const saved = JSON.parse(savedRaw) as {
        openBlockId?: unknown;
        completed?: unknown;
        timers?: unknown;
        activeTimerBlockId?: unknown;
        activeTimerEndAtMs?: unknown;
      };

      const nextTimers = toTimerState();
      if (saved.timers && typeof saved.timers === "object") {
        for (const block of SESSION_BLOCKS) {
          const value = (saved.timers as Record<string, unknown>)[block.id];
          if (typeof value === "number" && Number.isFinite(value)) {
            nextTimers[block.id] = Math.max(0, Math.round(value));
          }
        }
      }
      const nextCompleted: Record<string, boolean> = {};
      if (saved.completed && typeof saved.completed === "object") {
        for (const block of SESSION_BLOCKS) {
          nextCompleted[block.id] = Boolean((saved.completed as Record<string, unknown>)[block.id]);
        }
      }

      window.setTimeout(() => {
        setTimers(nextTimers);
        setCompleted(nextCompleted);

        if (typeof saved.openBlockId === "string") {
          setOpenBlockId(saved.openBlockId);
        }
        if (typeof saved.activeTimerBlockId === "string") {
          setActiveTimerBlockId(saved.activeTimerBlockId);
        }
        if (
          typeof saved.activeTimerEndAtMs === "number" &&
          Number.isFinite(saved.activeTimerEndAtMs)
        ) {
          setActiveTimerEndAtMs(saved.activeTimerEndAtMs);
        }
      }, 0);
    } catch {
      // Ignore invalid saved state and start fresh.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      openBlockId,
      completed,
      timers,
      activeTimerBlockId,
      activeTimerEndAtMs,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [openBlockId, completed, timers, activeTimerBlockId, activeTimerEndAtMs]);

  useEffect(() => {
    if (!activeTimerBlockId || !activeTimerEndAtMs) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      reconcileActiveTimer(true);
    }, 300);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeTimerBlockId, activeTimerEndAtMs, keepScreenAwake, reconcileActiveTimer, requestWakeLock]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        reconcileActiveTimer(true);
        if (keepScreenAwake && activeTimerBlockId) {
          void requestWakeLock();
        }
      }
    }

    function onFocus() {
      reconcileActiveTimer(true);
    }

    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [activeTimerBlockId, keepScreenAwake, reconcileActiveTimer, requestWakeLock]);

  useEffect(() => {
    if (keepScreenAwake && activeTimerBlockId) {
      void requestWakeLock();
      return;
    }
    void releaseWakeLock();
  }, [keepScreenAwake, activeTimerBlockId, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    return () => {
      void releaseWakeLock();
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, [releaseWakeLock]);

  function toggleComplete(id: string) {
    setCompleted((current) => ({ ...current, [id]: !current[id] }));
  }

  function resetBlockTimer(id: string, durationMinutes: number) {
    setTimers((current) => ({ ...current, [id]: durationMinutes * 60 }));
    if (activeTimerBlockId === id) {
      setActiveTimerBlockId(null);
      setActiveTimerEndAtMs(null);
    }
  }

  function startOrPauseTimer(id: string) {
    void ensureAudioReady(false);
    setOpenBlockId(id);

    if (activeTimerBlockId === id) {
      if (activeTimerEndAtMs) {
        const remaining = Math.max(0, Math.ceil((activeTimerEndAtMs - nowMs()) / 1000));
        setTimers((current) => ({ ...current, [id]: remaining }));
      }
      setActiveTimerBlockId(null);
      setActiveTimerEndAtMs(null);
      return;
    }

    if (activeTimerBlockId && activeTimerEndAtMs) {
      const previousRemaining = Math.max(0, Math.ceil((activeTimerEndAtMs - nowMs()) / 1000));
      setTimers((current) => ({ ...current, [activeTimerBlockId]: previousRemaining }));
    }

    const fallbackSeconds =
      SESSION_BLOCKS.find((block) => block.id === id)?.durationMinutes ?? 0;
    const startSeconds = timers[id] > 0 ? timers[id] : fallbackSeconds * 60;

    setTimers((current) => ({ ...current, [id]: startSeconds }));
    setActiveTimerBlockId(id);
    setActiveTimerEndAtMs(nowMs() + startSeconds * 1000);
  }

  function resetAll() {
    setCompleted({});
    setTimers(toTimerState());
    setActiveTimerBlockId(null);
    setActiveTimerEndAtMs(null);
    setOpenBlockId(SESSION_BLOCKS[0].id);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-3 pb-8 pt-4 sm:px-4">
      <div className="overflow-hidden rounded-2xl border border-emerald-600/30 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 shadow-xl">
        <div className="relative px-4 py-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_36px,transparent_36px,transparent_72px)]" />
          <div className="relative flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              ⚽
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold text-white sm:text-2xl">
                6U First Practice Tracker
              </h1>
              <p className="text-xs font-semibold text-emerald-100 sm:text-sm">
                Field-ready mobile view for tomorrow
              </p>
            </div>
            <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold text-white">
              {TOTAL_SESSION_MINUTES} min
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 bg-slate-950/60 px-4 py-3 sm:px-6">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-200">
            <span>Session progress</span>
            <span>
              {completedCount} of {SESSION_BLOCKS.length} complete
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="sticky top-2 z-20 mt-3 rounded-xl border border-slate-700 bg-slate-900/90 p-2 shadow-md backdrop-blur">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={resetAll}
            className="min-h-11 rounded-lg border border-slate-600 bg-slate-800 px-3 text-sm font-semibold text-slate-100 hover:bg-slate-700"
          >
            Reset Session
          </button>
          <button
            type="button"
            onClick={toggleKeepScreenAwake}
            className="min-h-11 rounded-lg border border-slate-600 bg-slate-800 px-3 text-sm font-semibold text-slate-100 hover:bg-slate-700"
          >
            {keepScreenAwake ? "Keep Screen Awake: On" : "Keep Screen Awake: Off"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!soundSupported) {
                setSupportMessage("Audio is not supported in this browser.");
                return;
              }
              void ensureAudioReady(true);
            }}
            className="min-h-11 rounded-lg border border-slate-600 bg-slate-800 px-3 text-sm font-semibold text-slate-100 hover:bg-slate-700"
          >
            {soundReady ? "Sound Enabled" : "Enable Sound"}
          </button>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Tap Enable Sound once on mobile, then keep screen awake while timer runs for best reliability.
        </p>
        {supportMessage ? (
          <p className="mt-1 text-[11px] font-semibold text-amber-300">{supportMessage}</p>
        ) : null}
      </div>

      <div className="mt-3 space-y-3">
        {SESSION_BLOCKS.map((block, index) => {
          const isOpen = openBlockId === block.id;
          const isActiveTimer = activeTimerBlockId === block.id;
          const isDone = Boolean(completed[block.id]);
          const isWater = block.type === "water";

          return (
            <article
              key={block.id}
              className={`overflow-hidden rounded-2xl border ${
                isWater
                  ? "border-sky-400/40 bg-sky-900/40"
                  : "border-slate-700 bg-slate-900"
              } shadow-md`}
            >
              <button
                type="button"
                onClick={() => setOpenBlockId(isOpen ? "" : block.id)}
                className="flex w-full items-center gap-3 px-3 py-3 text-left sm:px-4"
                aria-expanded={isOpen}
                aria-controls={`block-${block.id}`}
              >
                <span className="text-2xl" aria-hidden>
                  {block.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-300">
                    Block {index + 1} - {block.durationMinutes} min
                  </p>
                  <p className="truncate text-sm font-extrabold text-white sm:text-base">
                    {block.title}
                  </p>
                </div>
                <span
                  className={`ml-auto rounded-full px-2 py-1 text-xs font-bold ${
                    isWater ? "bg-sky-300 text-sky-900" : "bg-emerald-300 text-emerald-900"
                  }`}
                >
                  {formatClock(timers[block.id])}
                </span>
              </button>

              <div id={`block-${block.id}`} className={isOpen ? "block px-3 pb-3 sm:px-4" : "hidden"}>
                <div className="mb-3 h-px bg-slate-700" />
                <div className="space-y-2">
                  <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Objective
                    </p>
                    <p className="mt-1 text-sm text-slate-100">{block.objective}</p>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Setup</p>
                    <p className="mt-1 text-sm text-slate-100">{block.setup}</p>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Coaching tip
                    </p>
                    <p className="mt-1 text-sm text-slate-100">{block.coachingTip}</p>
                  </div>
                  <div
                    className={`rounded-lg border p-2.5 ${
                      isWater
                        ? "border-sky-400/40 bg-sky-500/10"
                        : "border-emerald-500/30 bg-emerald-500/10"
                    }`}
                  >
                    <p className="text-sm font-bold italic text-slate-50">
                      &ldquo;{block.scriptLine}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => startOrPauseTimer(block.id)}
                    className={`min-h-11 rounded-lg px-3 text-sm font-bold ${
                      isActiveTimer
                        ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                        : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    }`}
                  >
                    {isActiveTimer ? "Pause Timer" : "Start Timer"}
                  </button>
                  <button
                    type="button"
                    onClick={() => resetBlockTimer(block.id, block.durationMinutes)}
                    className="min-h-11 rounded-lg border border-slate-600 bg-slate-800 px-3 text-sm font-semibold text-slate-100 hover:bg-slate-700"
                  >
                    Reset Timer
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleComplete(block.id)}
                    className={`min-h-11 rounded-lg px-3 text-sm font-bold ${
                      isDone
                        ? "bg-emerald-700 text-white hover:bg-emerald-600"
                        : "border border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    {isDone ? "Completed" : "Mark Complete"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
