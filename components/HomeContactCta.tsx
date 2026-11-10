import { ArrowUpRight } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { SECTION_LANE } from "@/components/ui/lane";

/* A direct close to the homepage story, using the existing brand palette and
   typography instead of introducing another visual treatment. The dot lattice
   is the site's own connection motif, faded to texture under the statement. */
export default function HomeContactCta() {
  return (
    <section className={`${SECTION_LANE} relative pb-16 sm:pb-20`}>
      <div
        aria-hidden="true"
        className="dot-field pointer-events-none absolute inset-x-6 top-0 h-40 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)] sm:inset-x-10 lg:inset-x-[5.35%]"
      />

      <div className="relative grid gap-6 border-t border-line-strong pt-7 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10 sm:pt-8">
        <div>
          <h2 className="max-w-[18ch] text-balance text-title font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            Have a technology challenge to solve?
          </h2>
          <p className="mt-3 max-w-[60ch] text-pretty text-small leading-[1.55] text-body">
            Talk with our team about the right next step for your business.
          </p>
        </div>
        <PrimaryButton
          href="/contact"
          className="min-h-11 w-fit gap-2 px-6 text-small lg:min-h-[52px] lg:px-7"
        >
          Talk to our team
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </PrimaryButton>
      </div>
    </section>
  );
}
