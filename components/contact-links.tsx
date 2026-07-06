import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const LINKS = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { icon: LinkedinIcon, label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin, external: true },
  { icon: GithubIcon, label: "GitHub", value: site.githubHandle, href: site.github, external: true },
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref, external: false },
];

export function ContactLinks() {
  return (
    <div className="mt-8 grid gap-3">
      {LINKS.map((link, i) => {
        const Icon = link.icon;
        return (
          <Reveal key={link.label} delay={i * 0.06}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              className="flex items-center gap-4 rounded-2xl border border-stroke-soft bg-bg-card p-[18px_22px] transition-all hover:translate-x-1.5 hover:border-accent/32 hover:bg-white/[0.045]"
            >
              <span className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon size={19} />
              </span>
              <span>
                <b className="block text-[15px]">{link.label}</b>
                <span className="font-mono text-[12.5px] text-text-3">{link.value}</span>
              </span>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
