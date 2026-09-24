import { useEffect, useState } from "react"
import { USER } from "@/data/user"

const sentences = USER.flipSentences.length > 0 ? USER.flipSentences : [USER.bio]

export function ProfileHeader() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (sentences.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sentences.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="screen-line-bottom border-x border-line">
      <div className="flex items-end gap-3 p-3 sm:gap-4 sm:p-4">
        <img
          src={USER.avatar}
          alt={USER.displayName}
          width={144}
          height={144}
          className="size-28 shrink-0 rounded-full bg-muted object-cover ring-1 ring-line sm:size-36"
        />
        <div className="min-w-0">
          <h1 className="text-[2rem]/none font-medium tracking-tight">
            {USER.displayName}
          </h1>
          <p
            className="mt-3 min-h-12 text-base text-muted-foreground text-balance leading-relaxed glow-bio sm:min-h-6"
            aria-live="polite"
          >
            <span
              key={index}
              className="inline-block animate-in slide-in-from-bottom-3 fade-in duration-700 ease-out"
            >
              {sentences[index]}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}