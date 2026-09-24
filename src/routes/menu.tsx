import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MenuContent } from "@/components/menu-content";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Tomorrow at 9 Lisbon" },
      { name: "description", content: "The Tomorrow at 9 breakfast, brunch and specialty coffee menu is coming soon." },
      { property: "og:title", content: "The Menu — Tomorrow at 9" },
      { property: "og:description", content: "Breakfast, brunch, specialty coffee and everything in between." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="site-page menu-page">
      <SiteHeader />
      <MenuContent />
      <SiteFooter />
    </div>
  );
}