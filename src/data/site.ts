export type NavigationItem = {
  href: string;
  label: string;
};

const primaryNavigation: NavigationItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/what-makes-a-pm-role-real", label: "What Makes a PM Role Real?" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/methodology", label: "Methodology" },
];

export const siteConfig = {
  name: "Real PM Jobs",
  description:
    "A tighter board for PM roles with real outcome ownership, decision rights, and discovery capacity.",
  thesis:
    "Real PM Jobs screens for genuine scope: outcomes to own, decisions to make, and room to learn.",
  employerSubmissionHref:
    "mailto:YOUR_EMAIL@example.com?subject=Real%20PM%20Jobs%20Role%20Submission",
  socialImagePath: "/social-card.svg",
  primaryNavigation,
  footerNavigation: [{ href: "/", label: "Home" }, ...primaryNavigation],
};

export const withBase = (path: string) => {
  if (!path.startsWith("/")) {
    return path;
  }

  const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

  return path === "/" ? `${basePath}/` || "/" : `${basePath}${path}`;
};
