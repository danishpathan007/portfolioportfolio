import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { ContactLinks } from "@/components/contact-links";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={540} color="accent" className="bottom-[-220px] right-[-160px] opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 gap-11 px-7 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <SectionHead
            kicker="Contact"
            title="Let's build something together."
            description="Open to new projects, full-time roles, and interesting collaborations in mobile."
          />
          <ContactLinks />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
