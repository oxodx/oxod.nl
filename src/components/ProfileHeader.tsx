import { USER } from "@/data/user"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom border-x border-line">
      <div className="p-4 sm:p-6">
        <h1 className="text-[2rem]/none font-medium tracking-tight">
          {USER.displayName}
        </h1>
        <p className="mt-3 text-base text-muted-foreground text-balance leading-relaxed">
          {USER.bio}
        </p>
      </div>
    </div>
  )
}
