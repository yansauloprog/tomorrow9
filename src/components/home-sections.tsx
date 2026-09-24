import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingUrl } from "@/components/site-header";
import { useLanguage } from "@/lib/language";
import heroImage from "@/assets/uploads/2947.png";
import toastImage from "@/assets/uploads/2943.png";
import bowlImage from "@/assets/uploads/2941.png";
import dessertImage from "@/assets/uploads/2944.png";
import pastryImage from "@/assets/uploads/2942.png";
import sweetWaffleImage from "@/assets/uploads/2957.png";
import kitchenMeatImage from "@/assets/uploads/2953.png";
import kitchenShakshukaImage from "@/assets/uploads/2954.png";
import kitchenBowlImage from "@/assets/uploads/2955.png";
import kitchenCrepeImage from "@/assets/uploads/2956.png";

export function HeroSection() {
  const { t, language } = useLanguage();
  return (
    <section id="top" className="hero-section">
      <div className="hero-copy reveal-up">
        <p className="eyebrow">{t("Lisbon · Breakfast · Brunch · Specialty coffee")}</p>
        <h1>{t("Tomorrow")}<br />{t("starts at")} <span className="outlined-nine">9.</span></h1>
        <p className="hero-intro">{t("Your everyday spot for good coffee, slow mornings and something delicious.")}</p>
        <div className="hero-actions">
          <Button asChild variant="ghost" className="hero-primary-button">
            <Link to="/menu">{t("Explore the menu")} <ArrowUpRight size={16} /></Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-foreground bg-background text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:border-primary active:bg-primary active:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href={bookingUrl(language)} target="_blank" rel="noreferrer">{t("Book a table")}</a>
          </Button>
        </div>
        <div className="hero-details"><span>{t("Rua Viriato 9B, Lisboa")}</span><span>08:00–17:00</span></div>
      </div>
      <div className="hero-image-wrap reveal-image">
        <img src={heroImage} width="1122" height="1402" alt="Breakfast plate with eggs, hash browns, bacon, salad and coffee" fetchPriority="high" />
        <span className="image-stamp">{t("More than morning coffee")}</span>
      </div>
      <Link className="scroll-cue" to="/" hash="our-story" aria-label={t("Scroll to our story")}><ArrowDown size={18} /></Link>
    </section>
  );
}

export function StorySection() {
  const { t, language } = useLanguage();
  return (
    <section id="our-story" className="story-section">
      <p className="micro-label">{t("Our kind of morning")}</p>
      <div className="story-heading">
        <h2>{t("Breakfast.")}<br /><span>{t("Brunch.")}</span><br />{t("Specialty coffee.")}</h2>
        <p>{t("Breakfast, brunch and specialty coffee in Lisbon.")}</p>
      </div>
    </section>
  );
}

export function BrunchSection() {
  const { t, language } = useLanguage();
  return (
    <section className="brunch-section">
      <div className="brunch-image-large photo-frame">
        <img src={toastImage} width="1024" height="768" alt="Salmon toast with tomato, cream cheese and fresh herbs" loading="lazy" />
      </div>
      <div className="brunch-copy">
        <p className="micro-label">{t("Breakfast & brunch")}</p>
        <h2>{t("Breakfast")}<br /><span>{t("& brunch.")}</span></h2>
        <p>{t("From savoury breakfasts to something sweet, explore our brunch menu.")}</p>
      </div>
      <figure className="brunch-image-small photo-frame">
        <img src={bowlImage} width="768" height="768" alt="Breakfast bowl with banana, fruit, coconut and nuts" loading="lazy" />
        <figcaption>Morning colour, served in a bowl.</figcaption>
      </figure>
    </section>
  );
}

export function KitchenSection() {
  const { t, language } = useLanguage();
  return (
    <section className="kitchen-section">
      <div className="kitchen-heading">
        <p className="micro-label">{t("From the kitchen")}</p>
        <h2>{t("From the")}<br /><span>{t("kitchen.")}</span></h2>
        <p>{t("Breakfast, brunch and lunch in Lisbon.")}</p>
      </div>

      <div className="kitchen-gallery">
        <figure className="kitchen-image kitchen-image-featured">
          <img
            src={kitchenMeatImage}
            width="1152"
            height="1402"
            alt="Bowl of sliced meat, potatoes, tomatoes and greens"
            loading="lazy"
          />
        </figure>

        <figure className="kitchen-image kitchen-image-shakshuka">
          <img
            src={kitchenShakshukaImage}
            width="1254"
            height="1254"
            alt="Shakshuka with bread and fresh herbs"
            loading="lazy"
          />
        </figure>

        <div className="kitchen-image-pair">
          <figure className="kitchen-image">
            <img
              src={kitchenBowlImage}
              width="1254"
              height="1254"
              alt="Breakfast bowl with strawberries, raspberries, granola and coconut"
              loading="lazy"
            />
          </figure>
          <figure className="kitchen-image">
            <img
              src={kitchenCrepeImage}
              width="1254"
              height="1402"
              alt="Folded crepes with fruit and lime zest"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

export function MenuCallout() {
  const { t, language } = useLanguage();
  return (
    <section className="menu-callout">
      <p className="micro-label">{t("The menu")}</p>
      <div className="menu-callout-grid">
        <h2>{t("Explore")}<br /><span>{t("our menu.")}</span></h2>
        <div>
          <p>{t("Breakfast, brunch, lunch and specialty coffee.")}</p>
          <Button
            asChild
            className="menu-button !border !border-foreground !bg-background !text-foreground transition-colors duration-200 hover:!border-foreground hover:!bg-foreground hover:!text-background focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Link to="/menu">{t("Explore the menu")} <ArrowUpRight size={18} /></Link>
          </Button>
        </div>
      </div>
      <div className="outline-run" aria-hidden="true">{t("BREAKFAST · BRUNCH · COFFEE ·")}</div>
    </section>
  );
}


export function VisitSection() {
  const { t, language } = useLanguage();
  const directions = "https://www.google.com/maps/search/?api=1&query=Rua%20Viriato%209B%2C%201050-227%20Lisboa%2C%20Portugal";
  return (
    <section id="find-us" className="visit-section">
      <p className="micro-label">{t("Find us in Lisbon")}</p>
      <div className="visit-grid">
        <h2>{t("Find us")}<br /><span>{t("in Lisbon.")}</span></h2>
        <div className="visit-address"><p>Tomorrow at 9</p><address>Rua Viriato 9B,<br />1050-227 Lisboa,<br />Portugal.</address></div>
        <div className="visit-hours"><p>{t("Open 08:00–17:00")}</p><a href="https://wa.me/351927703617" target="_blank" rel="noreferrer">+351 927 703 617</a></div>
      </div>
      <div className="visit-actions">
        <Button
          asChild
          className="!border-primary !bg-primary !text-foreground hover:!border-foreground hover:!bg-foreground hover:!text-background focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <a href={directions} target="_blank" rel="noreferrer" aria-label={t("Get directions")}>{t("Get directions")} <ArrowUpRight size={16} /></a>
        </Button>
        <Button
          asChild
          className="!border-foreground !bg-background !text-foreground hover:!border-primary hover:!bg-primary hover:!text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <a href={bookingUrl(language)} target="_blank" rel="noreferrer">{t("Book a table")}</a>
        </Button>
      </div>
    </section>
  );
}