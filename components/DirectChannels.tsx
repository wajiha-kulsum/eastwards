import { MailIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

/* Direct Channels band shared by the About, Partnership and Contact
   artboards: heading, one-line intro, then the department inboxes on a
   light panel. Defaults come from contact.directChannels; every prop can
   be overridden when a page needs its own set. */
type DirectChannel = { department: string; email: string };

export default function DirectChannels({
  title = contact.directChannels.title,
  subtitle = contact.directChannels.subtitle,
  channels = contact.directChannels.channels,
  hideIntro = false,
}: {
  title?: string;
  subtitle?: string;
  channels?: readonly DirectChannel[];
  hideIntro?: boolean;
}) {
  return (
    <section className="mt-16 sm:mt-20">
      <h2 className="font-display text-lead font-medium tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {hideIntro ? null : (
        <p className="mt-3 text-small text-body">
          {subtitle}
        </p>
      )}

      <div className="mt-8 rounded-[10px] border border-line bg-surface lg:h-[150px]">
        <div className="grid grid-cols-1 gap-8 px-5 py-8 sm:px-6 lg:grid-cols-4 lg:gap-2 lg:px-[6.8%] lg:py-7">
          {channels.map((channel) => (
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
