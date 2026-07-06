import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stroke-soft bg-bg py-9">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-5 px-7 font-mono text-[12.5px] text-text-3">
        <div>© 2026 {site.name} — designed &amp; built with care</div>
        <div>
          {site.location} ·{" "}
          <a href={`mailto:${site.email}`} className="text-text-2 hover:text-accent">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
