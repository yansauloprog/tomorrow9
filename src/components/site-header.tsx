import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage, type Language } from "@/lib/language";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import mascotImage from "@/assets/uploads/2950.png";

const BOOKING_URL =
  "https://wa.me/351927703617?text=Hello%21%20I%27d%20like%20to%20book%20a%20table%20at%20Tomorrow%20at%209.";

export function bookingUrl(language: Language) {
  const message = language === "pt"
    ? "Olá! Gostaria de reservar uma mesa no Tomorrow at 9."
    : language === "es"
      ? "¡Hola! Me gustaría reservar una mesa en Tomorrow at 9."
      : "Hello! I’d like to book a table at Tomorrow at 9.";
  return `https://wa.me/351927703617?text=${encodeURIComponent(message)}`;
}

const links = [
  { label: "Home", to: "/", hash: "top" },
  { label: "Our story", to: "/", hash: "our-story" },
  { label: "The menu", to: "/menu" },
  { label: "Find us", to: "/", hash: "find-us" },
] as const;

export function SiteHeader() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const onMenuPage = location.pathname === "/menu";
  const [orderCount, setOrderCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateOrder = (event: Event) =>
      setOrderCount((event as CustomEvent<{ count: number }>).detail.count);
    window.addEventListener("tomorrow9:order-state", updateOrder);
    return () => window.removeEventListener("tomorrow9:order-state", updateOrder);
  }, []);

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
        <Link to="/" className="brand-signature" aria-label={t("Tomorrow at 9 home")}>
          <img className="brand-mascot" src={mascotImage} alt="" aria-hidden="true" />
          <span className="brand-wordmark">Tomorrow <span>at 9</span><sup>↗</sup></span>
        </Link>
        <nav className="desktop-nav" aria-label={t("Primary navigation")}>
          {links.map((link) => (
            <Link key={link.label} to={link.to} {...("hash" in link ? { hash: link.hash } : {})} className="nav-link">
              {t(link.label)}
            </Link>
          ))}
          {onMenuPage && (
            <button type="button" className="header-order-trigger" onClick={() => window.dispatchEvent(new Event("tomorrow9:open-order"))}
              aria-label={t("View order") + (orderCount ? ` · ${orderCount} ${t("items")}` : "")}>
              <ShoppingBag size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{t("Your order")}</span>
              {orderCount > 0 && <strong>{orderCount}</strong>}
            </button>
          )}
          <LanguageSwitcher />
        </nav>
        <Button
          asChild
          className="hidden !border-primary !bg-primary !text-foreground hover:!border-foreground hover:!bg-foreground hover:!text-background focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:inline-flex"
        >
          <a href={bookingUrl(language)} target="_blank" rel="noreferrer">{t("Book a table")} <ArrowUpRight size={15} /></a>
        </Button>
        <Button
          className="size-11 !border-primary !bg-primary p-0 !text-primary-foreground hover:!border-foreground hover:!bg-foreground hover:!text-primary-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:hidden"
          aria-label={t(open ? "Close menu" : "Open menu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </Button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <Link to="/" className="mobile-brand-signature" aria-label={t("Tomorrow at 9 home")} onClick={() => setOpen(false)}>
          <img className="brand-mascot" src={mascotImage} alt="" aria-hidden="true" />
          <span className="brand-wordmark">Tomorrow <span>at 9</span><sup>↗</sup></span>
        </Link>
        <nav aria-label={t("Mobile navigation")}>
          {links.map((link) => (
            <Link key={link.label} to={link.to} {...("hash" in link ? { hash: link.hash } : {})} onClick={() => setOpen(false)}>
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher mobile />
        <Button
          asChild
          className="w-full !border-foreground !bg-foreground !text-background hover:!border-background hover:!bg-background hover:!text-foreground focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <a href={bookingUrl(language)} target="_blank" rel="noreferrer">{t("Book a table")} <ArrowUpRight size={16} /></a>
        </Button>
      </div>
    </header>
  );
}

export { BOOKING_URL };