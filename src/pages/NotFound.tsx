import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="bg-muted flex size-16 items-center justify-center rounded-full font-mono text-2xl font-medium select-none">
        404
      </div>
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back home
      </Link>
    </main>
  );
}
