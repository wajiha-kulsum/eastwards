import { SectionLabel } from "@/components/ui/SectionLabel";
import { LocationPin, PhoneIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

export function LocationCards() {
  return (
    <div className="flex flex-col justify-between">
      {/* Eyebrow + main narrative headline */}
      <div>
        <SectionLabel>{contact.eyebrow}</SectionLabel>

        <h2 className="mt-3.5 max-w-[675px] text-[22px] font-semibold leading-[1.3] tracking-tight text-ink">
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
            <h3 className="mt-6 text-[19px] font-semibold">
              {contact.location.title}
            </h3>
          </div>

          <address className="not-italic text-[14px] leading-[1.5] text-white/95">
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
            <h3 className="mt-6 text-[19px] font-semibold text-primary">
              {contact.call.title}
            </h3>
          </div>

          <div className="text-[14px] leading-[1.5] text-neutral-600">
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
