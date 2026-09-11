"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "span" | "article";

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: cn(
        "io",
        visible && "!opacity-100 !translate-y-0",
        className,
      ),
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}
