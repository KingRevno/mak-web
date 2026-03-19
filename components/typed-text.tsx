"use client";

import { useEffect, useState } from "react";

type TypedTextProps = {
  text: string;
  className?: string;
  startDelayMs?: number;
  stepMs?: number;
};

export function TypedText({
  text,
  className = "",
  startDelayMs = 200,
  stepMs = 90,
}: TypedTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let intervalId: number | undefined;
    let cursorTimeout: number | undefined;

    const startTimeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleCount((previous) => {
          if (previous >= text.length) {
            if (intervalId !== undefined) {
              window.clearInterval(intervalId);
            }

            if (cursorTimeout === undefined) {
              cursorTimeout = window.setTimeout(() => setShowCursor(false), 550);
            }

            return previous;
          }

          return previous + 1;
        });
      }, stepMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
      if (cursorTimeout !== undefined) {
        window.clearTimeout(cursorTimeout);
      }
    };
  }, [startDelayMs, stepMs, text]);

  return (
    <span className={`inline-flex items-center tracking-tight ${className}`}>
      <span>{text.slice(0, visibleCount)}</span>
      {showCursor ? <span className="cursor-blink ml-0.5">|</span> : null}
    </span>
  );
}
