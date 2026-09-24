import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BrunchSection, HeroSection, KitchenSection, MenuCallout, StorySection, SweetSection, VisitSection } from "@/components/home-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tomorrow at 9 — Breakfast, Brunch & Coffee in Lisbon" },
      { name: "description", content: "Tomorrow at 9 is your Lisbon spot for breakfast, brunch and specialty coffee, open daily from 08:00 to 17:00." },
      { property: "og:title", content: "Tomorrow at 9 — Lisbon" },
      { property: "og:description", content: "Good coffee, slow mornings and something delicious in the heart of Lisbon." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="site-page">
      <SiteHeader />
      <main>
        <HeroSection />
        <StorySection />
        <BrunchSection />
        <KitchenSection />
        <MenuCallout />
        <SweetSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </div>
  );
}
