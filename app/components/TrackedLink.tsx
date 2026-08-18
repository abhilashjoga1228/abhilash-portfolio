"use client";

import type { ReactNode } from "react";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  location: string;
  label: string;
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

export default function TrackedLink({
  href,
  eventName,
  location,
  label,
  children,
  className,
  target,
  rel,
}: TrackedLinkProps) {
  const trackClick = () => {
    if (typeof window === "undefined") return;

    const gtag = (
      window as typeof window & {
        gtag?: (
          command: string,
          eventName: string,
          params?: Record<string, string>
        ) => void;
      }
    ).gtag;

    if (typeof gtag === "function") {
      gtag("event", eventName, {
        link_name: label,
        location,
        destination: href,
      });
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={trackClick}
      className={className}
    >
      {children}
    </a>
  );
}