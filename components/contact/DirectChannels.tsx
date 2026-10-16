import { MailIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

export function DirectChannels() {
  return (
    <section className="mx-auto mt-16 max-w-[1440px] px-4 pb-20 md:mt-24 md:px-[17px]">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight text-black sm:text-3xl lg:text-[35px]">
          {contact.directChannels.title}
        </h2>
        <p className="mt-2 text-[15px] font-medium text-body sm:text-[17px] lg:text-[20px]">
          {contact.directChannels.subtitle}
        </p>
      </div>

      {/* Directory Card */}
      <div className="mt-8 rounded-[24px] border border-[#EEEEEE] bg-[#FAFAFA] p-7 sm:p-9 lg:p-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contact.directChannels.channels.map((channel) => (
            <div key={channel.department} className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-semibold text-neutral-900/90 sm:text-[20px]">
                {channel.department}
              </h3>
              <a
                href={`mailto:${channel.email}`}
                className="group flex items-center gap-2 text-[15px] font-normal text-neutral-800 transition-colors hover:text-primary sm:text-[17px] lg:text-[19px]"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-neutral-700 transition-colors group-hover:text-primary" />
                <span>{channel.email}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
