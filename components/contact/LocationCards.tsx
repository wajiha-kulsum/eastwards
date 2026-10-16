import { SectionLabel } from "@/components/ui/SectionLabel";
import { LocationPin, PhoneIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

export function LocationCards() {
  return (
    <div className="flex flex-col justify-between">
      {/* Eyebrow + main narrative headline */}
      <div>
        <SectionLabel className="text-xl font-medium text-primary sm:text-2xl lg:text-[25px]">
          {contact.eyebrow}
        </SectionLabel>

        <h2 className="mt-3.5 max-w-[675px] font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-neutral-800/90 sm:text-3xl lg:text-[35px] lg:leading-[42px]">
          {contact.headline}
        </h2>
      </div>

      {/* Two cards: Location & Call Us */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12">
        {/* Card 1: Our Location (Solid Blue) */}
        <div className="flex min-h-[297px] flex-col justify-between rounded-[30px] bg-[#496EFD] p-7 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <LocationPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold lg:text-[30px] lg:leading-[36px]">
              {contact.location.title}
            </h3>
          </div>

          <address className="not-italic text-[15px] font-normal leading-6 text-white/95 sm:text-[17px] lg:text-[20px] lg:leading-[24px]">
            <p>{contact.location.headquarters}</p>
            <p>{contact.location.company}</p>
            <p>{contact.location.building}</p>
            <p>{contact.location.postalCode}</p>
          </address>
        </div>

        {/* Card 2: Call Us (Light with border) */}
        <div className="flex min-h-[297px] flex-col justify-between rounded-[30px] border-2 border-[#EEEEEE] bg-[#F9F9F9] p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <PhoneIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-primary lg:text-[30px] lg:leading-[36px]">
              {contact.call.title}
            </h3>
          </div>

          <div className="text-[15px] font-normal leading-6 text-neutral-600 sm:text-[17px] lg:text-[20px] lg:leading-[24px]">
            {contact.call.phones.map((phone) => (
              <p key={phone}>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {phone}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
