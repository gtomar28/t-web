import { Link } from "react-router-dom";
import { isExternalPlumHref, resolvePlumHref } from "../../../lib/plumRoutes";
import { beginRouteTransition } from "../../../utils/routeTransitionOverlay";

type PlumLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function PlumLink({ href, className, children }: PlumLinkProps) {
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  if (isExternalPlumHref(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link
      to={resolvePlumHref(href)}
      className={className}
      onClick={() => beginRouteTransition()}
    >
      {children}
    </Link>
  );
}
