import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  p: ({ children, ...props }) => (
    <p
      className="my-[0.5em] text-balance leading-relaxed first:mt-0 last:mb-0"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-2 decoration-from-font transition-colors hover:opacity-70"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  del: ({ children, ...props }) => (
    <del className="text-muted-foreground/60" {...props}>
      {children}
    </del>
  ),
  code: ({ className, children, ...props }) => (
    <code
      className={`rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground ${className ?? ""}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-[0.5em] overflow-x-auto rounded-lg border border-line bg-muted p-3 text-xs leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-4 mb-2 font-heading text-xl font-medium tracking-tight text-balance first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-4 mb-2 font-heading text-lg font-medium tracking-tight text-balance first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-4 mb-2 font-heading text-base font-medium tracking-tight first:mt-0"
      {...props}
    >
      {children}
    </h4>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="my-[0.5em] list-disc space-y-0.5 pl-5 marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-[0.5em] list-decimal space-y-0.5 pl-5 marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-[0.5em] border-l-2 border-line pl-3 text-muted-foreground/80 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-[1em] border-line" {...props} />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-sm text-muted-foreground space-y-2 [&>p]:my-0 [&>ul]:my-0 [&>ol]:my-0 [&>pre]:my-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
