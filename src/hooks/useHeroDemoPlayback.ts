"use client";

import type { HeroDemoScene } from "@/content/landing-hero-demo";
import { useEffect, useRef, useState } from "react";

export type DemoPlaybackState = {
  sceneIndex: number;
  openCount: number;
  typed: string[];
  done: boolean;
  reduceMotion: boolean;
  mounted: boolean;
  goScene: (index: number) => void;
};

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}

/**
 * Typewriter + auto-advance for hero demo scenes.
 * Cancel via AbortController on scene change / unmount.
 */
export function useHeroDemoPlayback(
  scenes: HeroDemoScene[],
): DemoPlaybackState {
  const [mounted, setMounted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scenesRef = useRef(scenes);
  scenesRef.current = scenes;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const list = scenesRef.current;
    if (!Array.isArray(list) || list.length === 0) return;
    const scene = list[sceneIndex] ?? list[0];
    if (!scene) return;
    const rows = Array.isArray(scene.rows) ? scene.rows : [];

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const { signal } = ac;

    const run = async () => {
      try {
        if (reduceMotion) {
          setOpenCount(rows.length);
          setTyped(rows.map((r) => r.value));
          setDone(true);
          if (list.length > 1) {
            await delay(5000, signal);
            setSceneIndex((i) => (i + 1) % list.length);
          }
          return;
        }

        setOpenCount(0);
        setTyped(rows.map(() => ""));
        setDone(false);

        await delay(380, signal);

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!row) continue;
          setOpenCount(i + 1);
          setTyped((prev) => {
            const next = [...prev];
            next[i] = "";
            return next;
          });
          await delay(160, signal);

          for (let c = 1; c <= row.value.length; c++) {
            const slice = row.value.slice(0, c);
            setTyped((prev) => {
              const next = [...prev];
              next[i] = slice;
              return next;
            });
            await delay(32, signal);
          }
          await delay(260, signal);
        }

        setDone(true);
        if (list.length > 1) {
          await delay(2800, signal);
          setSceneIndex((i) => (i + 1) % list.length);
        }
      } catch (err) {
        if (!isAbort(err)) throw err;
      }
    };

    void run();

    return () => {
      ac.abort();
    };
  }, [mounted, sceneIndex, reduceMotion, scenes]);

  const goScene = (index: number) => {
    if (index === sceneIndex) return;
    abortRef.current?.abort();
    setSceneIndex(index);
  };

  return {
    sceneIndex,
    openCount,
    typed,
    done,
    reduceMotion,
    mounted,
    goScene,
  };
}
