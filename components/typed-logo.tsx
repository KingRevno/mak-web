"use client";

import { useEffect, useState } from "react";

type TypedLogoProps = {
  className?: string;
  startDelayMs?: number;
};

const FRAMES = ["<", "<M", "<Ma", "<Mak", "<Mak ", "<Mak /", "<Mak />"];

export function TypedLogo({ className = "", startDelayMs = 200 }: TypedLogoProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let intervalId: number | undefined;
    let cursorTimeout: number | undefined;

    const startTimeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setFrameIndex((previous) => {
          if (previous >= FRAMES.length - 1) {
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
      }, 135);
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
  }, [startDelayMs]);

  return (
    <span className={`inline-flex items-center font-mono tracking-tight ${className}`}>
      <span className="text-sky-200/95">{FRAMES[frameIndex]}</span>
      {showCursor ? <span className="cursor-blink ml-0.5 text-sky-100">|</span> : null}
    </span>
  );
}
