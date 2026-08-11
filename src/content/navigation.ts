export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/overview" },
      { title: "Architecture", href: "/architecture" },
      { title: "Tech Stack", href: "/tech-stack" },
      { title: "Project Structure", href: "/project-structure" },
      { title: "Directory Tree", href: "/directory-tree" },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Authentication", href: "/features/authentication" },
      { title: "Companies", href: "/features/companies" },
      { title: "Applications", href: "/features/applications" },
      { title: "Outreach", href: "/features/outreach" },
      { title: "Resumes", href: "/features/resumes" },
      { title: "Gmail Integration", href: "/features/gmail" },
      { title: "Subscriptions", href: "/features/subscriptions" },
      { title: "Notifications", href: "/features/notifications" },
      { title: "Monitoring & Health", href: "/features/monitoring" },
      { title: "Support Tickets", href: "/features/support" },
      { title: "Admin Platform", href: "/features/admin" },
      { title: "Analytics", href: "/features/analytics" },
    ],
  },
  {
    title: "System Design",
    items: [
      { title: "Data Model", href: "/data-model" },
      { title: "Request Flows", href: "/flows" },
      { title: "Security", href: "/security" },
      { title: "Email Architecture", href: "/email-architecture" },
      { title: "Scheduled Jobs", href: "/scheduled-jobs" },
    ],
  },
  {
    title: "Showcase",
    items: [
      { title: "UI Showcase", href: "/ui-showcase" },
      { title: "Engineering Decisions", href: "/engineering-decisions" },
      { title: "Project Challenges", href: "/challenges" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Testing & Quality", href: "/testing" },
      { title: "Developer Setup", href: "/developer-setup" },
      { title: "Project Summary", href: "/project-summary" },
    ],
  },
];

/** Flat list of all pages for prev/next navigation and search index */
export const allPages = navigation.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.title,
  }))
);
