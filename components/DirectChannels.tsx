import { MailIcon } from "@/components/ui/icons";
import { contact } from "@/lib/content";

/* Direct Channels band shared by the Partnership and Contact
   artboards: heading, one-line intro, then the department inboxes. Default
   is the four-up light panel; `rows` draws the contact page's drafting
   table, rows split by dashed hairlines. Every prop can be overridden when
   a page needs its own set. */
type DirectChannel = { department: string; email: string };

export default function DirectChannels({
  title = contact.directChannels.title,
  subtitle = contact.directChannels.subtitle,
  channels = contact.directChannels.channels,
  hideIntro = false,
  variant = "grid",
}: {
  title?: string;
  subtitle?: string;
  channels?: readonly DirectChannel[];
  hideIntro?: boolean;
  variant?: "grid" | "rows";
}) {
  const heading = (
    <>
      <h2 className="font-display text-lead font-medium tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {hideIntro ? null : (
        <p className="mt-3 text-small text-body">
          {subtitle}
        </p>
      )}
    </>
  );

  if (variant === "rows") {
    return (
      <section className="mt-16 sm:mt-20">
        {heading}

        <ul className="mt-8 border-t border-dashed border-line-strong">
          {channels.map((channel) => (
            <li
              key={channel.department}
              className="border-b border-dashed border-line-strong"
            >
              {/* The whole row is the mail link: bigger target than the
                  address alone, and one hover plate across the drafting row. */}
              <a
                href={`mailto:${channel.email}`}
                className="group -mx-4 flex min-h-14 flex-col gap-1 px-4 py-4 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:-mx-5 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <span className="text-small font-semibold text-ink">
                  {channel.department}
                </span>
                <span className="inline-flex items-center gap-2 text-small text-ink transition-colors group-hover:text-link">
                  <MailIcon className="h-[18px] w-[18px] shrink-0" />
                  {channel.email}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="mt-16 sm:mt-20">
      {heading}

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
