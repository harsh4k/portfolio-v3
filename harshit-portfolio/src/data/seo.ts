import type { CollectionEntry } from "astro:content";
import { profile } from "./profile";

/**
 * Everything search engines and AI assistants read about the site, built from
 * profile.ts and projects.json so it can never drift from what the page shows.
 * Used by the layout's JSON-LD and by the /llms.txt endpoint.
 */

type Project = CollectionEntry<"projects">;

/** The schema.org graph for the home page: the site, the profile page and the person it is about. */
export function structuredData(site: URL, projects: Project[]) {
  const personId = new URL("/#person", site).href;
  const websiteId = new URL("/#website", site).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.href,
        name: `${profile.name} Portfolio`,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": new URL("/#profile", site).href,
        url: site.href,
        name: `${profile.name} — ${profile.role}`,
        description: profile.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.description,
        url: site.href,
        email: profile.email,
        telephone: profile.phone.tel,
        address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
        knowsAbout: profile.stack,
        sameAs: profile.socials.map((social) => social.url),
      },
      // The Work section's projects, each credited to the person above.
      ...projects.map(({ data }) => ({
        "@type": "CreativeWork",
        name: data.title,
        url: data.url,
        ...(data.summary ? { description: data.summary } : {}),
        creator: { "@id": personId },
      })),
    ],
  };
}

/** /llms.txt (llmstxt.org): a plain Markdown summary that AI assistants can read without running the page's scripts. */
export function llmsText(site: URL, projects: Project[]) {
  const link = (path: string) => new URL(path, site).href;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.description}`,
    "",
    `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location}, studying Computer Engineering at ${profile.school}. ${profile.availability}.`,
    "",
    "This is a single-page portfolio with an about section, selected work, a photo archive and contact details.",
    "",
    "## Work",
    "",
    ...projects.map(({ data }) => `- [${data.title}](${data.url})${data.summary ? `: ${data.summary}` : ""}`),
    "",
    "## Contact",
    "",
    ...profile.socials.map((social) => `- [${social.label}](${social.url})`),
    `- [Email](mailto:${profile.email})`,
    `- [Phone](tel:${profile.phone.tel}): ${profile.phone.display}`,
    "",
    "## Notes",
    "",
    `- Stack: ${profile.stack.join(", ")}`,
    `- Building since ${profile.since}`,
    `- Resume: [resume.pdf](${link(profile.resume.pdf)})`,
    `- Portfolio: [${site.host}](${site.href})`,
    "",
  ];
  return lines.join("\n");
}
