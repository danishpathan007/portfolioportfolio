export function FlutterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M13.9 2 4 11.9l3.05 3.05L21 1.95h-6.1L13.9 2zm.05 9.1-5 5L13.9 21H20l-6.05-6.05 4.1-4.1h-6.1l2 .25z"
        fill="#54C5F8"
      />
    </svg>
  );
}

export function SwiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M17.6 14.7c1.8-3.1 1.3-7-1.5-10.4 1.5 1.3 2.6 2.9 3.2 4.5 1.4 3.8.3 7.8-2.4 9.9-1.9 1.5-4.5 1.9-6.9 1.1-1.6-.5-3-1.5-4-2.8 1.5 1 3.3 1.3 4.9.8-2.4-1.5-4.5-3.6-6-6 .8.7 1.7 1.4 2.6 1.9-1.3-1.5-2.4-3.2-3.2-4.9 2.3 2.3 5 4.2 7.4 5.3-1.7-1.9-3.2-4.2-4.3-6.4 2.8 2.8 6 5.2 8.1 6.2 1.1.5 2 .8 2.1.8z"
        fill="#FA7343"
      />
    </svg>
  );
}

export function SupabaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M13.3 21.4c-.5.7-1.7.3-1.7-.6v-7.6H4.4c-1 0-1.5-1.1-.9-1.9L10.7 2.6c.5-.7 1.7-.3 1.7.6v7.6h7.2c1 0 1.5 1.1.9 1.9l-7.2 8.7z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function GithubIcon({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.4 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5a10.2 10.2 0 0 0 6.8-9.7C22 6.6 17.5 2 12 2z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M6.5 8.8v10.7H3.1V8.8h3.4zM4.8 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM20.9 13.4v6.1h-3.4v-5.7c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.8 1.3-.1.2-.1.6-.1.9v5.9H10.4V8.8h3.4v1.5c.5-.7 1.3-1.7 3.1-1.7 2.3 0 4 1.5 4 4.8z" />
    </svg>
  );
}
