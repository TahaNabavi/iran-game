"use client";

import { useEffect } from "react";

interface Shortcut {
  keys: string[];
  callback: () => void;
}

export default function useShortcuts(
  shortcuts: Shortcut[],
  preventDefault: boolean = false
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        if (
          shortcut.keys.every((key) => {
            if (key === "ctrl") return event.ctrlKey;
            if (key === "shift") return event.shiftKey;
            if (key === "alt") return event.altKey;
            return event.key === key;
          })
        ) {
          if (preventDefault) {
            event.preventDefault();
          }
          shortcut.callback();
        }
      });
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [shortcuts, preventDefault]);
}
