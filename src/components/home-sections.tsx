import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/site-header";
import heroImage from "@/assets/uploads/2947.png";
import toastImage from "@/assets/uploads/2943.png";
import bowlImage from "@/assets/uploads/2941.png";
import dessertImage from "@/assets/uploads/2944.png";
import pastryImage from "@/assets/uploads/2942.png";

export function HeroSection() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-copy reveal-up">
        <p className="eyebrow">Lisbon · Breakfast · Brunch · Specialty coffee</p>
        <h1>Tomorrow<br />starts at <span className="outlined-nine">9.</span></h1>
        <p className="hero-intro">Your everyday spot for good coffee, slow mornings and something delicious.</p>
        <div className="hero-actions">
          <Button asChild variant="ghost" className="hero-primary-button">
            <Link to="/menu">Explore the menu <ArrowUpRight size={16} /></Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-foreground bg-background text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:border-primary active:bg-primary active:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a table</a>
          </Button>
        </div>
        <div className="hero-details"><span>Rua Viriato 9B, Lisboa</span><span>08:00–17:00</span></div>
      </div>
      <div className="hero-image-wrap reveal-image">
        <img src={heroImage} width="1122" height="1402" alt="Breakfast plate with eggs, hash browns, bacon, salad and coffee" fetchPriority="high" />
        <span className="image-stamp">More than<br />morning coffee</span>
      </div>
      <a className="scroll-cue" href="#story" aria-label="Scroll to our story"><ArrowDown size={18} /></a>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="story-section">
      <p className="micro-label">01 / Our kind of morning</p>
      <div className="story-heading">
        <h2>Breakfast.<br /><span>Brunch.</span><br />Specialty coffee.</h2>
        <p>Breakfast, brunch and specialty coffee in Lisbon.</p>
      </div>
    </section>
  );
}

export function BrunchSection() {
  return (
    <section className="brunch-section">
      <div className="brunch-image-large photo-frame">
        <img src={toastImage} width="1024" height="768" alt="Salmon toast with tomato, cream cheese and fresh herbs" loading="lazy" />
      </div>
      <div className="brunch-copy">
        <p className="micro-label">Breakfast & brunch</p>
        <h2>Breakfast<br /><span>& brunch.</span></h2>
        <p>From savoury breakfasts to something sweet, explore our brunch menu.</p>
      </div>
      <figure className="brunch-image-small photo-frame">
        <img src={bowlImage} width="768" height="768" alt="Breakfast bowl with banana, fruit, coconut and nuts" loading="lazy" />
        <figcaption>Morning colour, served in a bowl.</figcaption>
      </figure>
    </section>
  );
}

export function MenuCallout() {
  return (
    <section className="menu-callout">
      <p className="micro-label">The menu</p>
      <div className="menu-callout-grid">
        <h2>Explore<br /><span>our menu.</span></h2>
        <div>
          <p>Breakfast, brunch, lunch and specialty coffee.</p>
          <Button
            asChild
            className="menu-button !border !border-foreground !bg-background !text-foreground transition-colors duration-200 hover:!border-foreground hover:!bg-foreground hover:!text-background focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Link to="/menu">Explore the menu <ArrowUpRight size={18} /></Link>
          </Button>
        </div>
      </div>
      <div className="outline-run" aria-hidden="true">BREAKFAST · BRUNCH · COFFEE ·</div>
    </section>
  );
}

export function SweetSection() {
  return (
    <section className="sweet-section">
      <div className="sweet-title"><p className="micro-label">Pastries & desserts</p><h2>Pastries<br /><span>& desserts.</span></h2></div>
      <figure className="sweet-dessert photo-frame">
        <img src={dessertImage} width="768" height="768" alt="Slice of dessert with caramel sauce on a ceramic plate" loading="lazy" />
        <figcaption>A sweet pause in the Lisbon sun.</figcaption>
      </figure>
      <div className="sweet-pastry photo-frame"><img src={pastryImage} width="768" height="768" alt="Chocolate pastry on a handmade ceramic plate" loading="lazy" /></div>
    </section>
  );
}

export function VisitSection() {
  const directions = "https://www.google.com/maps/search/?api=1&query=Rua%20Viriato%209B%2C%201050-227%20Lisboa%2C%20Portugal";
  return (
    <section id="visit" className="visit-section">
      <p className="micro-label">Find us in Lisbon</p>
      <div className="visit-grid">
        <h2>Find us<br /><span>in Lisbon.</span></h2>
        <div className="visit-address"><p>Tomorrow at 9</p><address>Rua Viriato 9B,<br />1050-227 Lisboa,<br />Portugal.</address></div>
        <div className="visit-hours"><p>Open 08:00–17:00</p><a href="https://wa.me/351927703617" target="_blank" rel="noreferrer">+351 927 703 617</a></div>
      </div>
      <div className="visit-actions">
        <Button
          asChild
          className="!border-primary !bg-primary !text-foreground hover:!border-foreground hover:!bg-foreground hover:!text-background focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <a href={directions} target="_blank" rel="noreferrer" aria-label="Open Tomorrow at 9 location in Google Maps">Get directions <ArrowUpRight size={16} /></a>
        </Button>
        <Button
          asChild
          className="!border-foreground !bg-background !text-foreground hover:!border-primary hover:!bg-primary hover:!text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a table</a>
        </Button>
      </div>
    </section>
  );
}