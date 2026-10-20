import type { Metadata } from "next";
import { Mail } from "lucide-react";
import DotHero from "@/components/DotHero";
import { contact, partners } from "@/lib/content";

/* Replicates the "MacBook Pro 16\" - 12" Paper artboard for the partnership
   page: hero chip + dot grid, split intro, number-on-blue advantage cards
   over a gradient strip, and the direct channels row. Sizes follow the
   Paper values at 1728 and scale down through the site tokens. */

export const metadata: Metadata = {
  title: "Partnership | Eastwards Consulting",
  description: partners.lede,
};

export default function PartnersPage() {
  return (
    <main id="main" className="bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-20 pt-3 sm:px-10 lg:px-[5.35%]">
        <DotHero title={partners.title} lede={partners.lede} />

        {/* Split intro: eyebrow + muted statement left, relationship copy right.
            Paper: eyebrow 25px y418, statement 60px y461, body 35px/775px y441. */}
        <section className="mt-14 md:grid md:grid-cols-2 md:gap-8">
          <div>
            <p className="text-[clamp(17px,1.7vw,25px)] font-medium leading-[1.2] text-primary">
              {partners.eyebrow}
            </p>
            <p className="mt-5 whitespace-pre-line text-[clamp(38px,3.5vw,60px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#0000008A]">
              {partners.statement}
            </p>
          </div>
          <p className="mt-8 text-[clamp(20px,2.2vw,35px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#252525] md:mt-6">
            {partners.statementBody}
          </p>
        </section>

        {/* Why team up: three blue cards over a gradient strip. Paper: strip
            y920-1132, cards 425x383 r30 from y962, numbers 100px #4062E0. */}
        <section className="mt-16 sm:mt-20">
          <h2 className="font-display text-[clamp(30px,3.5vw,60px)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#272727]">
            {partners.why.title}
          </h2>

          <div className="relative mt-10">
            {/* partnership artwork strip behind the top of the cards */}
            <img
              src="/images/partnerhip.svg"
              alt=""
              className="absolute inset-x-0 top-0 w-full"
            />
            <div className="relative mt-[36px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,425px)] lg:justify-end lg:gap-[74px]">
              {partners.why.advantages.map((advantage, index) => (
                <article
                  key={advantage.title}
                  className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[30px] bg-[#496EFD] p-7 text-white lg:h-[383px]"
                >
                  {/* masked polygon face, a different one per card (bottom
                      right, top right, bottom left) like the Paper mask */}
                  <img
                    src="/images/polygon-6.svg"
                    alt=""
                    aria-hidden="true"
                    className={`pointer-events-none absolute h-[95%] max-w-none ${
                      index === 0
                        ? "bottom-[-6%] right-[-4%]"
                        : index === 1
                          ? "-top-[8%] right-[-10%] h-[75%]"
                          : "bottom-[-12%] left-[35%]"
                    }`}
                  />
                  <div className="relative z-10 flex flex-1 flex-col text-white">
                    <p className="font-display text-[clamp(64px,5.8vw,100px)] font-extrabold leading-[1.2] text-[#4062E0]">
                      0{index + 1}
                    </p>
                    <div className="mt-auto">
                      <h3 className="font-display text-[clamp(22px,1.9vw,30px)] font-bold leading-[1.2] text-white">
                        {advantage.title}
                      </h3>
                      <p className="mt-3 max-w-[290px] text-[clamp(15px,1.2vw,20px)] leading-[1.2] text-white">
                        {advantage.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Direct channels row from the same artboard */}
        <section className="mt-16 sm:mt-20">
          <h2 className="font-display text-[clamp(22px,2vw,35px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#272727]">
            Direct Channels
          </h2>
          <p className="mt-3 text-[clamp(14px,1.2vw,20px)] leading-[1.2] text-[#757575]">
            Need to reach a specific department? Use the direct lines below for
            a faster response.
          </p>
          <div className="mt-8 border border-[#EEEEEE] bg-[#FAFAFA] lg:h-[150px]">
            <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2 lg:px-8 lg:py-7">
              {contact.directChannels.channels.map((channel) => (
                <div key={channel.department}>
                  <p className="text-[clamp(15px,1.2vw,20px)] font-semibold text-[#45484D]">
                    {channel.department}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Mail
                      className="h-[20px] w-[25px] shrink-0 text-[#4E4E4E]"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                    <a
                      href={`mailto:${channel.email}`}
                      className="truncate text-[clamp(15px,1.2vw,20px)] font-light text-black"
                    >
                      {channel.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
