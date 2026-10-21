import { MailIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

/* Direct Channels band shared by the About and Partnership artboards:
   heading, one-line intro, then the department inboxes on a light panel. */
export default function DirectChannels() {
  return (
    <section className="mt-16 sm:mt-20">
      <h2 className="font-display text-lead font-medium tracking-[-0.02em] text-ink">
        {contact.directChannels.title}
      </h2>
      <p className="mt-3 text-small text-body">
        {contact.directChannels.subtitle}
      </p>

      <div className="mt-8 rounded-[10px] border border-line bg-surface lg:h-[150px]">
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2 lg:px-[6.8%] lg:py-7">
          {contact.directChannels.channels.map((channel) => (
            <div key={channel.department}>
              <p className="text-small font-semibold text-ink">
                {channel.department}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <MailIcon className="h-[18px] w-[18px] shrink-0 text-ink" />
                <a
                  href={`mailto:${channel.email}`}
                  className="truncate text-small font-light text-ink"
                >
                  {channel.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
