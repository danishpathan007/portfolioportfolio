import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SLOTS = [1, 2];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Recommendations"
          title="What colleagues say."
          description="Recommendations are on their way — check back soon."
          className="mb-14"
        />
        <RevealGroup className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {SLOTS.map((slot) => (
            <RevealItem
              key={slot}
              className="grid gap-[18px] rounded-[18px] border border-dashed border-stroke bg-bg-card p-[30px]"
            >
              <span className="font-serif text-[44px] leading-[0.6] text-accent/80">&ldquo;</span>
              <p className="text-pretty text-[15.5px] italic text-text-3">
                A recommendation is on its way — this slot will hold a quote from a manager,
                client, or teammate.
              </p>
              <div className="flex items-center gap-3">
                <div className="grid h-[42px] w-[42px] place-items-center rounded-full border border-stroke bg-white/6 font-mono text-[13px] text-text-3">
                  ?
                </div>
                <div>
                  <b className="block text-[14.5px] text-text-2">Coming soon</b>
                  <span className="font-mono text-[12px] text-text-3">Role · Company</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
