import DotField from "@/components/ui/DotField";
import TextBlur from "@/components/ui/TextBlur";
import PrimaryButton from "@/components/ui/PrimaryButton";

/* Services hero, the mock's centered statement band: the grey dot texture
   covers the whole hero and fades out at the edges, the page title keeps the
   site's Inter Display Bold uppercase, lede and colors stay the site's own,
   and one CTA closes the band. Text sits on the shared solid-white chips
   (the page background) so the denser field never fights the type. Text and
   copy are the page's own; nothing here is invented. */
export default function ServiceHero({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <DotField className="dot-drift bottom-0 top-0 [-webkit-mask-image:radial-gradient(85%_115%_at_50%_40%,black_45%,transparent_100%)] [mask-image:radial-gradient(85%_115%_at_50%_40%,black_45%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center py-16 text-center sm:py-20 lg:py-24">
        <h1 className="font-display text-display font-bold uppercase leading-none tracking-[-0.03em] text-ink">
          <TextBlur>{title}</TextBlur>
        </h1>

        <p className="mt-6 max-w-[640px] text-small leading-[1.6] text-body">
          <TextBlur>{lede}</TextBlur>
        </p>

        <PrimaryButton href="/contact" className="mt-9 h-11 px-7 text-small">
          Contact Us
        </PrimaryButton>
      </div>
    </section>
  );
}
