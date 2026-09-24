import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "pt" | "es";

const translations: Record<string, [string, string]> = {
  "Home": ["Início", "Inicio"],
  "Our story": ["A nossa história", "Nuestra historia"],
  "The menu": ["A ementa", "La carta"],
  "Find us": ["Encontre-nos", "Encuéntranos"],
  "Book a table": ["Reservar mesa", "Reservar mesa"],
  "Primary navigation": ["Navegação principal", "Navegación principal"],
  "Mobile navigation": ["Navegação móvel", "Navegación móvil"],
  "Tomorrow at 9 home": ["Tomorrow at 9 — início", "Tomorrow at 9 — inicio"],
  "Open menu": ["Abrir menu", "Abrir menú"],
  "Close menu": ["Fechar menu", "Cerrar menú"],
  "Language": ["Idioma", "Idioma"],
  "Your order": ["O seu pedido", "Tu pedido"],
  "View order": ["Ver pedido", "Ver pedido"],
  "items": ["artigos", "artículos"],
  "item": ["artigo", "artículo"],
  "Lisbon · Breakfast · Brunch · Specialty coffee": ["Lisboa · Pequeno-almoço · Brunch · Café de especialidade", "Lisboa · Desayuno · Brunch · Café de especialidad"],
  "Tomorrow": ["Amanhã", "Mañana"],
  "starts at": ["começa às", "empieza a las"],
  "Tomorrow starts at": ["O amanhã começa às", "El mañana empieza a las"],
  "Your everyday spot for good coffee, slow mornings and something delicious.": ["O seu espaço em Lisboa para pequeno-almoço, brunch e café de especialidade.", "Tu sitio en Lisboa para desayunar, tomar brunch y disfrutar de un café de especialidad."],
  "Explore the menu": ["Explorar a ementa", "Ver la carta"],
  "Rua Viriato 9B, Lisboa": ["Rua Viriato 9B, Lisboa", "Rua Viriato 9B, Lisboa"],
  "More than morning coffee": ["Muito mais do que café", "Mucho más que café"],
  "Scroll to our story": ["Ir para a nossa história", "Ir a nuestra historia"],
  "Our kind of morning": ["A nossa manhã", "Nuestra mañana"],
  "Breakfast.": ["Pequeno-almoço.", "Desayuno."],
  "Brunch.": ["Brunch.", "Brunch."],
  "Specialty coffee.": ["Café de especialidade.", "Café de especialidad."],
  "Breakfast, brunch and specialty coffee in Lisbon.": ["Pequeno-almoço, brunch e café de especialidade em Lisboa.", "Desayuno, brunch y café de especialidad en Lisboa."],
  "Breakfast & brunch": ["Pequeno-almoço e brunch", "Desayuno y brunch"],
  "Breakfast": ["Pequeno-almoço", "Desayuno"],
  "& brunch.": ["e brunch.", "y brunch."],
  "From savoury breakfasts to something sweet, explore our brunch menu.": ["De pequenos-almoços salgados a opções doces: conheça a nossa ementa de brunch.", "De desayunos salados a opciones dulces: descubre nuestra carta de brunch."],
  "From the kitchen": ["Da cozinha", "De la cocina"],
  "From the": ["Da", "De la"],
  "kitchen.": ["cozinha.", "cocina."],
  "Breakfast, brunch, lunch and specialty coffee in Lisbon.": ["Pequeno-almoço, brunch, almoço e café de especialidade em Lisboa.", "Desayuno, brunch, comida y café de especialidad en Lisboa."],
  "Breakfast, brunch and lunch in Lisbon.": ["Pequeno-almoço, brunch e almoço em Lisboa.", "Desayuno, brunch y comida en Lisboa."],
  "Explore": ["Explorar", "Explora"],
  "our menu.": ["a ementa.", "la carta."],
  "Breakfast, brunch, lunch and specialty coffee.": ["Pequeno-almoço, brunch, almoço e café de especialidade.", "Desayuno, brunch, comida y café de especialidad."],
  "BREAKFAST · BRUNCH · COFFEE ·": ["PEQUENO-ALMOÇO · BRUNCH · CAFÉ ·", "DESAYUNO · BRUNCH · CAFÉ ·"],
  "Find us in Lisbon": ["Encontre-nos em Lisboa", "Encuéntranos en Lisboa"],
  "Find us in": ["Encontre-nos em", "Encuéntranos en"],
  "in Lisbon.": ["em Lisboa.", "en Lisboa."],
  "Open 08:00–17:00": ["Aberto das 08:00 às 17:00", "Abierto de 08:00 a 17:00"],
  "Get directions": ["Como chegar", "Cómo llegar"],
  "Come by": ["Visite-nos", "Ven a vernos"],
  "Every day": ["Todos os dias", "Todos los días"],
  "Lisbon, Portugal": ["Lisboa, Portugal", "Lisboa, Portugal"],
  "Food photography via Pexels.": ["Fotografia gastronómica: Pexels.", "Fotografía gastronómica: Pexels."],
  "The menu · Lisbon": ["A ementa · Lisboa", "La carta · Lisboa"],
  "Breakfast · Brunch · Lunch · Specialty coffee": ["Pequeno-almoço · Brunch · Almoço · Café de especialidade", "Desayuno · Brunch · Comida · Café de especialidad"],
  "Please ask our team about allergens.": ["Peça à nossa equipa informações sobre alergénios.", "Consulta a nuestro equipo sobre alérgenos."],
  "Menu categories": ["Categorias da ementa", "Categorías de la carta"],
  "Specialty coffee": ["Café de especialidade", "Café de especialidad"],
  "Allergens": ["Alergénios", "Alérgenos"],
  "Please ask a staff member for information on food allergens.": ["Peça informações sobre alergénios alimentares a um membro da equipa.", "Consulta al personal sobre los alérgenos alimentarios."],
  "Add": ["Adicionar", "Añadir"],
  "Remove": ["Remover", "Eliminar"],
  "ADD ↗": ["ADICIONAR ↗", "AÑADIR ↗"],
  "ADDED ✓": ["ADICIONADO ✓", "AÑADIDO ✓"],
  "Add to order": ["Adicionar ao pedido", "Añadir al pedido"],
  "Added to order": ["Adicionado ao pedido", "Añadido al pedido"],
  "Select the options for this item, then add it to your order.": ["Selecione as opções deste artigo e adicione-o ao seu pedido.", "Selecciona las opciones de este artículo y añádelo a tu pedido."],
  "Base price:": ["Preço base:", "Precio base:"],
  "Quantity": ["Quantidade", "Cantidad"],
  "Decrease quantity": ["Diminuir quantidade", "Reducir cantidad"],
  "Increase quantity": ["Aumentar quantidade", "Aumentar cantidad"],
  "Cancel": ["Cancelar", "Cancelar"],
  "Review your order before sending it via WhatsApp.": ["Confirme o seu pedido antes de o enviar pelo WhatsApp.", "Revisa tu pedido antes de enviarlo por WhatsApp."],
  "Add something from the menu to get started.": ["Adicione um artigo da ementa para começar.", "Añade algo de la carta para empezar."],
  "Your order is empty.": ["O seu pedido está vazio.", "Tu pedido está vacío."],
  "Subtotal": ["Subtotal", "Subtotal"],
  "Order notes": ["Observações ao pedido", "Notas del pedido"],
  "Anything you'd like us to know?": ["Há alguma indicação para a nossa equipa?", "¿Quieres indicarnos algo?"],
  "Your order will be confirmed by the café via WhatsApp.": ["O café confirmará o pedido por WhatsApp.", "La cafetería confirmará tu pedido por WhatsApp."],
  "Send order via WhatsApp": ["Enviar pedido pelo WhatsApp", "Enviar pedido por WhatsApp"],
  "Back home ↗": ["Voltar ao início ↗", "Volver al inicio ↗"],
  "Choose one": ["Escolha uma opção", "Elige una opción"],
  "Eggs": ["Ovos", "Huevos"],
  "Flavour": ["Sabor", "Sabor"],
  "Format": ["Formato", "Formato"],
  "Temperature": ["Temperatura", "Temperatura"],
  "Hot": ["Quente", "Caliente"],
  "Cold": ["Frio", "Frío"],
  "Scrambled": ["Mexidos", "Revueltos"],
  "Fried": ["Estrelados", "Fritos"],
  "Boiled": ["Cozidos", "Cocidos"],
  "Bacon": ["Bacon", "Bacon"],
  "Salmon": ["Salmão", "Salmón"],
  "Avocado": ["Abacate", "Aguacate"],
  "Glass": ["Copo", "Copa"],
  "Bottle": ["Garrafa", "Botella"],
  "Original": ["Original", "Original"],
  "Peppermint": ["Hortelã-pimenta", "Menta"],
  "Strawberry": ["Morango", "Fresa"],
  "Hibiscus": ["Hibisco", "Hibisco"],
  "Citrus Tropical": ["Citrinos tropicais", "Cítricos tropicales"],
  "Ginger": ["Gengibre", "Jengibre"],
  "Butter": ["Manteiga", "Mantequilla"],
  "Miso caramel": ["Caramelo de miso", "Caramelo de miso"],
  "Jam": ["Compota", "Mermelada"],
  "bacon": ["bacon", "bacon"],
  "salmon": ["salmão", "salmón"],
  "halloumi": ["halloumi", "halloumi"],
  "extra halloumi": ["halloumi extra", "halloumi extra"],
  "1 egg": ["1 ovo", "1 huevo"],
  "Hello! I’d like to place an order at Tomorrow at 9.": ["Olá! Gostaria de fazer um pedido no Tomorrow at 9.", "¡Hola! Me gustaría hacer un pedido en Tomorrow at 9."],
  "Order:": ["Pedido:", "Pedido:"],
  "Unit price:": ["Preço unitário:", "Precio unitario:"],
  "Line total:": ["Total do artigo:", "Total del artículo:"],
  "TOTAL:": ["TOTAL:", "TOTAL:"],
  "Order notes:": ["Observações:", "Notas:"],
  "Please confirm availability and the order details.": ["Por favor, confirme a disponibilidade e os detalhes do pedido.", "Por favor, confirma la disponibilidad y los detalles del pedido."],
  "Thank you!": ["Obrigado!", "¡Gracias!"],
  "Special menu": ["Sugestões especiais", "Especiales"],
  "Brunch": ["Brunch", "Brunch"],
  "Lunch": ["Almoço", "Comida"],
  "Toasts": ["Tostas", "Tostadas"],
  "Sweet breakfast": ["Pequeno-almoço doce", "Desayuno dulce"],
  "Desserts": ["Sobremesas", "Postres"],
  "Pastry": ["Pastelaria", "Bollería"],
  "Extras": ["Extras", "Extras"],
  "Black coffee": ["Café sem leite", "Café solo"],
  "Coffee with milk": ["Café com leite", "Café con leche"],
  "Signature coffee": ["Cafés de assinatura", "Cafés de autor"],
  "Non-coffee": ["Sem café", "Sin café"],
  "Non-coffee drinks": ["Bebidas sem café", "Bebidas sin café"],
  "Soft drinks": ["Bebidas sem álcool", "Refrescos"],
  "Tea": ["Chá", "Té"],
  "Coffee extras": ["Extras para café", "Extras para café"],
  "Beer": ["Cerveja", "Cerveza"],
  "Cocktails": ["Cocktails", "Cócteles"],
  "Wine": ["Vinho", "Vino"],
};

type LanguageContextValue = { language: Language; setLanguage: (value: Language) => void; t: (english: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Deterministic English SSR prevents client/server hydration mismatches.
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tomorrow9-language");
      if (saved === "pt" || saved === "es") setLanguage(saved);
    } catch { /* Storage can be unavailable in embedded previews. */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-PT" : language;
    try { window.localStorage.setItem("tomorrow9-language", language); } catch { /* Ignore disabled storage. */ }
  }, [language]);

  const t = (english: string) =>
    language === "en" ? english : translations[english]?.[language === "pt" ? 0 : 1] ?? english;

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
