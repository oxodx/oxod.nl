import { useEffect, useState } from "react";
import { USER } from "@/data/user";

const sentences =
  USER.flipSentences.length > 0 ? USER.flipSentences : [USER.bio];

export function ProfileHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sentences.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sentences.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="screen-line-bottom border-x border-line">
      <div className="flex items-end gap-2 p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
        <img
          src={USER.avatar}
          alt={USER.displayName}
          width={144}
          height={144}
          className="size-24 sm:size-28 lg:size-36 shrink-0 rounded-full bg-muted object-cover ring-1 ring-line"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-[2rem] font-medium tracking-tight leading-tight">
            {USER.displayName}
          </h1>
          <p
            className="mt-2 min-h-6 text-xs sm:text-sm lg:text-base text-muted-foreground text-balance leading-relaxed"
            aria-live="polite"
          >
            <span
              key={index}
              className="inline-block animate-in slide-in-from-bottom-3 fade-in duration-700 ease-out"
            >
              {sentences[index].split("").map((char, i) =>
                char === " " ? (
                  <span key={i}> </span>
                ) : (
                  <span
                    key={i}
                    className="glow-bio"
                    style={{ animationDelay: `-${i * 0.22}s` }}
                  >
                    {char}
                  </span>
                ),
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
