import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({
  children,
  reverse = false,
  speed = 150,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  /** Target travel speed in px/s. Set to 0 to freeze. */
  speed?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sliceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(speed);
  const reverseRef = useRef(reverse);

  useEffect(() => {
    targetRef.current = speed;
  }, [speed]);

  useEffect(() => {
    reverseRef.current = reverse;
  }, [reverse]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const slice = sliceRef.current;
    if (!wrap || !track || !slice) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.classList.add("overflow-x-auto");
      return;
    }

    const state = { pos: 0, setW: 0 };
    const measure = () => {
      state.setW = slice.getBoundingClientRect().width;
      if (state.setW > 0 && state.pos === 0) state.pos = -state.setW * 0.2;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(slice);
    measure();

    let raf = 0;
    let last = performance.now();
    let vel = 0;
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      let dt = (now - last) / 1000;
      last = now;
      dt = Math.min(dt, 0.05);
      const target = targetRef.current;
      vel += (target - vel) * Math.min(dt * 8, 1);
      const dir = reverseRef.current ? 1 : -1;
      state.pos += vel * dir * dt;
      if (state.setW > 0) {
        if (state.pos < -state.setW) state.pos += state.setW;
        if (state.pos > 0) state.pos -= state.setW;
        track.style.transform = `translateX(${state.pos}px)`;
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-marquee
      className={cn(
        "marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={sliceRef} className="flex gap-1.5 sm:gap-2 md:gap-3 pr-1.5 sm:pr-2 md:pr-3">
          {children}
        </div>
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 pr-1.5 sm:pr-2 md:pr-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
