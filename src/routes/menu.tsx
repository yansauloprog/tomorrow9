import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

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
      <main className="menu-preview">
        <p className="eyebrow">Breakfast · Brunch · Specialty coffee</p>
        <h1>Our menu<br /><span>is almost ready.</span></h1>
        <div className="menu-preview-bottom">
          <p>We're preparing the full menu. In the meantime, come by for a slow morning or get in touch to book a table.</p>
          <div className="hero-actions">
            <Button asChild className="bg-background text-foreground hover:bg-foreground hover:text-background"><Link to="/"><ArrowLeft size={16} /> Back home</Link></Button>
            <Button asChild className="border-background bg-transparent text-background hover:bg-background hover:text-foreground"><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a table <ArrowUpRight size={16} /></a></Button>
          </div>
        </div>
        <div className="outline-run" aria-hidden="true">COMING SOON · COMING SOON ·</div>
      </main>
      <SiteFooter />
    </div>
  );
}