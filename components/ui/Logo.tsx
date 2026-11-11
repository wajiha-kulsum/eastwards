import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/* "Eastwards" plus the blue mark. Text colour and any scale come from the
   caller (ink in the header, white on the footer band). Extra props pass
   through so Radix asChild wrappers can attach their handlers. */
export function Logo({ className, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/"
      aria-label="Eastwards home"
      className={cn(
        "flex shrink-0 items-center rounded-sm text-small font-bold tracking-[-0.5px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className
      )}
      {...props}
    >
      Eastwards
      <Image
        src="/images/logo.svg"
        alt=""
        aria-hidden="true"
        width={27}
        height={32}
        className="ml-2 h-[16px] w-auto lg:h-[18px]"
      />
    </Link>
  );
}
