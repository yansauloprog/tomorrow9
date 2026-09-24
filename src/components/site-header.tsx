import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const BOOKING_URL =
  "https://wa.me/351927703617?text=Hello%21%20I%27d%20like%20to%20book%20a%20table%20at%20Tomorrow%20at%209.";

const links = [
  { label: "Home", href: "/#top" },
  { label: "Our story", href: "/#story" },
  { label: "The menu", href: "/menu" },
  { label: "Find us", href: "/#visit" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link to="/" className="brand-signature" aria-label="Tomorrow at 9 home">
          Tomorrow <span>at 9</span><sup>↗</sup>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) =>
            link.href === "/menu" ? (
              <Link key={link.label} to="/menu" className="nav-link">{link.label}</Link>
            ) : (
              <a key={link.label} href={link.href} className="nav-link">{link.label}</a>
            ),
          )}
        </nav>
        <Button asChild className="hidden bg-primary text-primary-foreground hover:bg-foreground md:inline-flex">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a table <ArrowUpRight size={15} /></a>
        </Button>
        <Button
          className="size-11 bg-primary p-0 text-primary-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </Button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link) =>
            link.href === "/menu" ? (
              <Link key={link.label} to="/menu" onClick={() => setOpen(false)}>{link.label}</Link>
            ) : (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            ),
          )}
        </nav>
        <Button asChild className="w-full bg-foreground text-background hover:bg-primary">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a table <ArrowUpRight size={16} /></a>
        </Button>
      </div>
    </header>
  );
}

export { BOOKING_URL };