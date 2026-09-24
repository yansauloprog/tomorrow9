import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/site-header";

type Item = {
  name: string;
  price?: string;
  description?: string;
  extras?: string[];
};

type Section = {
  id: string;
  label: string;
  title: string;
  tone?: "outline" | "coffee";
  items: Item[];
};

const sections: Section[] = [
  {
    id: "special-menu",
    label: "Special menu",
    title: "Special menu",
    items: [
      {
        name: "Oatmeal with baked pear",
        price: "€10.00",
        description:
          "Papas de aveia com pêra assada, granola crocante e manteiga noisette. / Oatmeal with baked pear, crunchy granola, and brown butter.",
      },
      {
        name: "French toast with strawberries",
        price: "€14.00",
        description:
          "Rabanadas caramelizadas com creme de chocolate branco, morangos e pistáchios. / Caramelized French toast with white chocolate cream, strawberries, and pistachios.",
      },
      {
        name: "Salmon toast with tomatoes",
        price: "€12.00",
        description:
          "Pão com queijo creme batido, salmão curado ligeiramente, tomate e verdes. / Bread with whipped cream cheese, lightly salted salmon, tomatoes, and greens.",
      },
      {
        name: "Turmeric latte",
        price: "€5.00",
      },
      { name: "Chai latte", price: "€5.30" },
      { name: "Ginger cookie latte", price: "€5.50" },
      { name: "Apple saffron tea", price: "€5.50" },
      { name: "Sea buckthorn tea", price: "€5.50" },
    ],
  },
  {
    id: "brunch",
    label: "Brunch",
    title: "Brunch",
    items: [
      {
        name: "Simple breakfast",
        price: "€12.00",
        description:
          "Pão torrado, ovos cozidos, abacate, queijo gruyère, compota e manteiga. / Toasted bread, soft-boiled eggs, avocado, gruyere cheese, jam, butter.",
        extras: ["+ bacon €3.00", "+ salmon €4.00"],
      },
      {
        name: "Miso shakshuka with shrimps",
        price: "€14.00",
        description:
          "Miso vermelho - molho à base de tomate, camarão, ovos, coentros, sementes de sésamo, iogurte, pão. / Red miso - tomato base sauce, shrimps, eggs, cilantro, sesame, yogurt, bread.",
        extras: ["+ 1 egg €1.50"],
      },
      {
        name: "Halloumi breakfast",
        price: "€15.00",
        description:
          "Ovos (mexidos, fritos ou cozidos), halloumi grelhado, pão torrado, abacate, tomates do campo e salada, húmus. / Eggs (scrambled, fried or boiled), grilled halloumi, toasted bread, avocado, farm tomatoes & salad, hummus.",
        extras: ["+ extra halloumi €3.50", "+ 1 egg €1.50"],
      },
      {
        name: "Big breakfast",
        price: "€15.00",
        description:
          "Ovos (mexidos, fritos ou cozidos), bacon, tomate da quinta, fricassé, molho tártaro, puré de abacate, salada. / Eggs (scrambled, fried or boiled), bacon, farm tomatoes, hashbrown, tartar sauce, mashed avocado, salad.",
        extras: ["+ bacon €3.00", "+ 1 egg €1.50"],
      },
      {
        name: "Zucchini hash browns with baked salmon",
        price: "€13.00",
        description:
          "Panquecas crocantes de abobrinha com cream cheese de ervas e raspas de limão, servidas com salmão assado. / Crispy zucchini hash browns, herb and lemon zest cream cheese, baked salmon.",
      },
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    title: "Lunch",
    items: [
      { name: "Sweet fries", price: "€6.00", description: "Batata-doce com pesto aioli. / Sweet potato, pesto aioli." },
      {
        name: "Beef salad",
        price: "€14.00",
        description:
          "Alface romana, molho pesto de iogurte, tomate, batata assada, lombo de novilho e cebola roxa. / Romaine lettuce, yogurt pesto dressing, tomatoes, roasted potatoes, beef tenderloin, and red onion.",
      },
      {
        name: "Salmon with beurre blanc sauce and Brussels sprouts",
        price: "€14.00",
        description:
          "Posta de salmão com couves-de-bruxelas, ervilhas e molho beurre blanc. / Salmon steak with Brussels sprouts, green peas, and beurre blanc sauce.",
      },
      {
        name: "Beef burger with sweet fries",
        price: "€14.00",
        description:
          "Hambúrguer clássico de novilho com queijo cheddar, pickles, cebola roxa e batata-doce frita. / Classic burger with beef patty, cheddar cheese, pickles, red onion, sweet fries on the side.",
      },
    ],
  },
  {
    id: "toasts",
    label: "Toasts",
    title: "Toasts",
    tone: "outline",
    items: [
      {
        name: "Avocado toast",
        price: "€12.00",
        description:
          "Abacate com tomates do campo, ovos cozidos, pão torrado, ervilhas salteadas e ervas aromáticas. / Avocado with farm tomatoes, soft-boiled eggs, toasted bread, sautéed peas, greens.",
        extras: ["+ bacon €3.00", "+ halloumi €4.00", "+ salmon €4.00"],
      },
      {
        name: "Scramble toast",
        price: "€12.00",
        description:
          "Pão torrado, ovos mexidos com queijo, parmesão e à sua escolha: bacon, salmão ou abacate. / Toasted bread, cheesy scrambled eggs, parmesan with your choice of bacon, salmon or avocado.",
      },
      {
        name: "Benedict",
        price: "€14.00",
        description:
          "Ovos Benedict com espinafre no croissant, servidos com a sua escolha de salmão, bacon ou abacate. / Eggs Benedict with spinach on a croissant, served with your choice of salmon, bacon, or avocado.",
      },
    ],
  },
  {
    id: "sweet-breakfast",
    label: "Sweet breakfast",
    title: "Sweet breakfast",
    items: [
      {
        name: "Crepes with pistachio cream and strawberries",
        price: "€11.00",
        description:
          "Crepes finos com creme de chocolate branco e pistache, morangos e molho de morango. / Thin crepes with white chocolate and pistachio cream, strawberries, and strawberry sauce.",
      },
      {
        name: "Matcha pancakes",
        price: "€12.00",
        description:
          "Panquecas com creme de matcha, morangos e crumble de Lotus. / Pancakes with matcha cream, strawberries, and Lotus crumble.",
      },
      {
        name: "Granola with yogurt",
        price: "€10.00",
        description:
          "Granola caseira, iogurte, fruta, coco, chia, mel e compota de morango. / Homemade granola, yogurt, fruit, coconut, chia, honey, and strawberry jam.",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    title: "Desserts",
    items: [
      { name: "Banoffee", price: "€6.00" },
      { name: "Carrot cake", price: "€6.00" },
      { name: "Basque pistachio cheesecake", price: "€6.00" },
      { name: "Cookie de matcha com chocolate branco", price: "€3.00" },
      { name: "Cookie de coco com chocolate ao leite", price: "€3.00" },
    ],
  },
  {
    id: "pastry",
    label: "Pastry",
    title: "Pastry",
    items: [
      { name: "Pão de queijo", price: "€1.00" },
      {
        name: "Croissant simples",
        price: "€3.00",
        extras: ["+ Butter €2.00", "+ Miso caramel €2.00", "+ Jam €2.00"],
      },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    title: "Extras",
    items: [
      {
        name: "Pão",
        price: "€2.00",
        description: "Disponível apenas como complemento de um prato. / Available only as a side/add-on to a main dish.",
      },
      { name: "Salmon", price: "€4.00" },
      { name: "Salad & tomatoes", price: "€6.00" },
      { name: "Hashbrown", price: "€3.00" },
      { name: "Halloumi", price: "€4.00" },
    ],
  },
  {
    id: "black-coffee",
    label: "Black coffee",
    title: "Black coffee",
    tone: "coffee",
    items: [
      { name: "Espresso", price: "€1.50" },
      { name: "Double espresso", price: "€2.50" },
      { name: "Americano", price: "€3.50" },
      { name: "Batch brew", price: "€3.50" },
      { name: "Hand brew", price: "€5.00" },
      { name: "Hand brew 90+", price: "€8.00" },
      { name: "Cold black", price: "€3.00" },
    ],
  },
  {
    id: "coffee-with-milk",
    label: "Coffee with milk",
    title: "Coffee with milk",
    tone: "coffee",
    items: [
      { name: "Cappuccino", price: "€3.50" },
      { name: "Double cappuccino", price: "€4.00" },
      { name: "Latte", price: "€4.00" },
      { name: "Flat white", price: "€3.50" },
      { name: "Cortado", price: "€3.00" },
      { name: "Macchiato", price: "€2.50" },
      { name: "Ice latte", price: "€4.00" },
    ],
  },
  {
    id: "signature-coffee",
    label: "Signature coffee",
    title: "Signature coffee",
    tone: "coffee",
    items: [
      { name: "Latte misto caramel hot/cold", price: "€5.50" },
      { name: "Rai citrus", price: "€4.50" },
      { name: "Bumble", price: "€5.00" },
      { name: "Espresso tonic", price: "€4.50" },
    ],
  },
  {
    id: "non-coffee",
    label: "Non-coffee",
    title: "Non-coffee drinks",
    tone: "coffee",
    items: [
      { name: "Cacao hot/cold", price: "€4.50" },
      { name: "Chai latte hot/cold", price: "€5.30" },
      { name: "Matcha hot/cold", price: "€5.30" },
      { name: "Matcha miso hot/cold", price: "€5.80" },
    ],
  },
  {
    id: "soft-drinks",
    label: "Soft drinks",
    title: "Soft drinks",
    tone: "coffee",
    items: [
      { name: "Fritz cola", price: "€3.70" },
      { name: "Fritz cola zero", price: "€3.70" },
      {
        name: "Kombucha",
        price: "€3.70",
        description: "Original · Peppermint · Strawberry · Hibiscus · Citrus Tropical · Ginger",
      },
      { name: "Bottled water", price: "€2.00" },
      { name: "Orange juice", price: "€5.00" },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    title: "Tea",
    tone: "coffee",
    items: [
      { name: "Assam black", price: "€3.50" },
      { name: "Jasmine green", price: "€3.50" },
      { name: "Oolong", price: "€3.50" },
      { name: "Mint", price: "€3.50" },
      { name: "Herbal blend", price: "€3.50" },
    ],
  },
  {
    id: "coffee-extras",
    label: "Coffee extras",
    title: "Coffee extras",
    tone: "coffee",
    items: [
      { name: "Extra shot", price: "€0.70" },
      { name: "Oat milk", price: "€0.60" },
      { name: "Coconut milk", price: "€0.60" },
      { name: "Cup of milk", price: "€1.50" },
      { name: "Honey / agave", price: "€1.00" },
      { name: "Extra milk", price: "€0.60" },
    ],
  },
  {
    id: "beer",
    label: "Beer",
    title: "Beer",
    tone: "coffee",
    items: [
      { name: "American blonde", price: "€3.70" },
      { name: "American pale ale", price: "€4.20" },
      { name: "India pale ale", price: "€4.80" },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    title: "Cocktails",
    tone: "coffee",
    items: [
      { name: "Aperol spritz", price: "€7.50" },
      { name: "Basil limoncello spritz", price: "€8.00" },
      { name: "Mimoza", price: "€7.00" },
    ],
  },
  {
    id: "wine",
    label: "Wine",
    title: "Wine",
    tone: "coffee",
    items: [
      { name: "Sparkling wine", description: "Vinha da Malhada Espumante Brut, Portugal", extras: ["Glass — €7.00", "Bottle — €30.00"] },
      { name: "White wine", description: "António Lopes Ribeiro Maresia Loureiro, Vinho Verde", extras: ["Glass — €7.50", "Bottle — €32.00"] },
      { name: "Orange wine", description: "Ourém Curtimenta Pim Pam Pum, Lisboa", extras: ["Glass — €6.50", "Bottle — €25.00"] },
    ],
  },
];

const categoryLinks = [
  "special-menu",
  "brunch",
  "lunch",
  "toasts",
  "sweet-breakfast",
  "desserts",
  "pastry",
  "black-coffee",
  "coffee-with-milk",
  "signature-coffee",
  "non-coffee",
  "soft-drinks",
  "tea",
  "beer",
  "wine",
  "cocktails",
];

function MenuItem({ item }: { item: Item }) {
  return (
    <article className="menu-item">
      <div className="menu-item-heading">
        <h3>{item.name}</h3>
        {item.price && <span className="menu-item-price">{item.price}</span>}
      </div>
      {item.description && <p className="menu-item-description">{item.description}</p>}
      {item.extras && (
        <ul className="menu-item-extras">
          {item.extras.map((extra) => <li key={extra}>{extra}</li>)}
        </ul>
      )}
    </article>
  );
}

export function MenuContent() {
  const [active, setActive] = useState("special-menu");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="editorial-menu">
      <section className="menu-hero">
        <p className="eyebrow">The menu · Lisbon</p>
        <h1>Good things<br /><span>start here.</span></h1>
        <div className="menu-hero-meta">
          <p>Breakfast · Brunch · Lunch · Specialty coffee</p>
          <p>08:00–17:00</p>
        </div>
        <p className="menu-allergens">Please ask our team about allergens.</p>
      </section>

      <nav className="menu-category-nav" aria-label="Menu categories">
        <div className="menu-category-nav-inner">
          {categoryLinks.map((id) => {
            const section = sections.find((entry) => entry.id === id);
            if (!section) return null;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "is-active" : ""}
                aria-current={active === id ? "location" : undefined}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="menu-sections">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`menu-category ${section.tone === "coffee" ? "menu-category-coffee" : ""}`}
          >
            {section.tone === "coffee" && index === 7 && (
              <div className="coffee-divider" aria-hidden="true">
                <span>coffee,</span><strong>of course.</strong>
              </div>
            )}
            <div className="menu-category-header">
              <span className="menu-category-number">{String(index + 1).padStart(2, "0")}</span>
              <h2 className={section.tone === "outline" ? "is-outline" : ""}>{section.title}</h2>
            </div>
            <div className="menu-items">
              {section.items.map((item) => <MenuItem key={item.name} item={item} />)}
            </div>
            {section.id === "toasts" && (
              <p className="menu-allergen-note">
                <strong>Allergens</strong><br />
                Por favor solicite informação sobre alergénios, dos produtos não pré-embalados, junto dos funcionários.<br />
                Please ask a staff member for information on food allergens.
              </p>
            )}
          </section>
        ))}
      </div>

      <section className="menu-closing">
        <p className="eyebrow">A slow morning, well spent</p>
        <h2>Ready to<br /><span>order?</span></h2>
        <p>WhatsApp ordering is coming in the next step.</p>
        <Button asChild className="menu-booking-button">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            Book a table <ArrowUpRight size={16} />
          </a>
        </Button>
        <Link to="/" className="menu-back-home">Back home ↗</Link>
      </section>
    </main>
  );
}