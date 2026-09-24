import type { Language } from "./language";

const names: Record<string, [string, string]> = {
  "Oatmeal with baked pear": ["Papas de aveia com pera assada", "Avena con pera asada"],
  "French toast with strawberries": ["Rabanadas com morangos", "Tostadas francesas con fresas"],
  "Salmon toast with tomatoes": ["Tosta de salmão com tomate", "Tostada de salmón con tomate"],
  "Turmeric latte": ["Latte de curcuma", "Latte de cúrcuma"],
  "Chai latte": ["Chai latte", "Chai latte"],
  "Ginger cookie latte": ["Latte de bolacha de gengibre", "Latte de galleta de jengibre"],
  "Apple saffron tea": ["Chá de maçã e açafrão", "Té de manzana y azafrán"],
  "Sea buckthorn tea": ["Chá de espinheiro-marítimo", "Té de espino amarillo"],
  "Simple breakfast": ["Pequeno-almoço simples", "Desayuno sencillo"],
  "Miso shakshuka with shrimps": ["Shakshuka de miso com camarão", "Shakshuka de miso con gambas"],
  "Halloumi breakfast": ["Pequeno-almoço com halloumi", "Desayuno con halloumi"],
  "Big breakfast": ["Pequeno-almoço completo", "Desayuno completo"],
  "Zucchini hash browns with baked salmon": ["Panquecas de curgete com salmão assado", "Tortitas de calabacín con salmón al horno"],
  "Sweet fries": ["Batata-doce frita", "Boniato frito"],
  "Beef salad": ["Salada de novilho", "Ensalada de ternera"],
  "Salmon with beurre blanc sauce and Brussels sprouts": ["Salmão com molho beurre blanc e couves-de-bruxelas", "Salmón con beurre blanc y coles de Bruselas"],
  "Beef burger with sweet fries": ["Hambúrguer de novilho com batata-doce frita", "Hamburguesa de ternera con boniato frito"],
  "Avocado toast": ["Tosta de abacate", "Tostada de aguacate"],
  "Scramble toast": ["Tosta de ovos mexidos", "Tostada de huevos revueltos"],
  "Benedict": ["Ovos Benedict", "Huevos Benedict"],
  "Crepes with pistachio cream and strawberries": ["Crepes com creme de pistácio e morangos", "Crepes con crema de pistacho y fresas"],
  "Matcha pancakes": ["Panquecas de matcha", "Tortitas de matcha"],
  "Granola with yogurt": ["Granola com iogurte", "Granola con yogur"],
  "Banoffee": ["Banoffee", "Banoffee"],
  "Carrot cake": ["Bolo de cenoura", "Tarta de zanahoria"],
  "Basque pistachio cheesecake": ["Cheesecake basca de pistácio", "Tarta de queso vasca con pistacho"],
  "Matcha & white chocolate cookie": ["Bolacha de matcha e chocolate branco", "Galleta de matcha y chocolate blanco"],
  "Coconut & milk chocolate cookie": ["Bolacha de coco e chocolate de leite", "Galleta de coco y chocolate con leche"],
  "Cheese bread": ["Pão de queijo", "Pan de queso"],
  "Plain croissant": ["Croissant simples", "Cruasán natural"],
  "Bread": ["Pão", "Pan"],
  "Salmon": ["Salmão", "Salmón"],
  "Salad & tomatoes": ["Salada e tomate", "Ensalada y tomate"],
  "Hashbrown": ["Batata ralada crocante", "Tortita de patata"],
  "Halloumi": ["Halloumi", "Halloumi"],
  "Espresso": ["Espresso", "Espreso"],
  "Double espresso": ["Espresso duplo", "Espreso doble"],
  "Americano": ["Americano", "Americano"],
  "Batch brew": ["Café de filtro", "Café de filtro"],
  "Hand brew": ["Café filtrado à mão", "Café filtrado a mano"],
  "Hand brew 90+": ["Café filtrado à mão 90+", "Café filtrado a mano 90+"],
  "Cold black": ["Café preto frio", "Café solo frío"],
  "Cappuccino": ["Cappuccino", "Capuchino"],
  "Double cappuccino": ["Cappuccino duplo", "Capuchino doble"],
  "Latte": ["Latte", "Latte"],
  "Flat white": ["Flat white", "Flat white"],
  "Cortado": ["Cortado", "Cortado"],
  "Macchiato": ["Macchiato", "Macchiato"],
  "Ice latte": ["Latte gelado", "Latte con hielo"],
  "Latte misto caramel hot/cold": ["Latte misto de caramelo quente/frio", "Latte misto de caramelo caliente/frío"],
  "Rai citrus": ["Rai citrus", "Rai citrus"],
  "Bumble": ["Bumble", "Bumble"],
  "Espresso tonic": ["Espresso tónico", "Espreso con tónica"],
  "Cacao hot/cold": ["Cacau quente/frio", "Cacao caliente/frío"],
  "Chai latte hot/cold": ["Chai latte quente/frio", "Chai latte caliente/frío"],
  "Matcha hot/cold": ["Matcha quente/frio", "Matcha caliente/frío"],
  "Matcha miso hot/cold": ["Matcha miso quente/frio", "Matcha miso caliente/frío"],
  "Fritz cola": ["Fritz cola", "Fritz cola"],
  "Fritz cola zero": ["Fritz cola zero", "Fritz cola zero"],
  "Kombucha": ["Kombucha", "Kombucha"],
  "Bottled water": ["Água engarrafada", "Agua embotellada"],
  "Orange juice": ["Sumo de laranja", "Zumo de naranja"],
  "Assam black": ["Chá preto Assam", "Té negro Assam"],
  "Jasmine green": ["Chá verde de jasmim", "Té verde de jazmín"],
  "Oolong": ["Oolong", "Oolong"],
  "Mint": ["Hortelã", "Menta"],
  "Herbal blend": ["Infusão de ervas", "Infusión de hierbas"],
  "Extra shot": ["Dose extra de espresso", "Carga extra de espresso"],
  "Oat milk": ["Bebida de aveia", "Bebida de avena"],
  "Coconut milk": ["Bebida de coco", "Bebida de coco"],
  "Cup of milk": ["Chávena de leite", "Taza de leche"],
  "Honey / agave": ["Mel / agave", "Miel / agave"],
  "Extra milk": ["Leite extra", "Leche extra"],
  "American blonde": ["Cerveja blonde americana", "Cerveza rubia americana"],
  "American pale ale": ["Cerveja pale ale americana", "Cerveza pale ale americana"],
  "India pale ale": ["Cerveja IPA", "Cerveza IPA"],
  "Aperol spritz": ["Aperol spritz", "Aperol spritz"],
  "Basil limoncello spritz": ["Basil limoncello spritz", "Basil limoncello spritz"],
  "Mimoza": ["Mimoza", "Mimoza"],
  "Sparkling wine": ["Espumante", "Espumoso"],
  "White wine": ["Vinho branco", "Vino blanco"],
  "Orange wine": ["Vinho laranja", "Vino naranja"],
};

// Preserve the source menu's Portuguese and English descriptions; translate the English
// descriptions separately, never inventing ingredients for items without descriptions.
const spanishDescriptions: Record<string, string> = {
  "Oatmeal with baked pear": "Avena con pera asada, granola crujiente y mantequilla avellanada.",
  "French toast with strawberries": "Tostadas francesas caramelizadas con crema de chocolate blanco, fresas y pistachos.",
  "Salmon toast with tomatoes": "Pan con queso crema batido, salmón ligeramente curado, tomate y hojas verdes.",
  "Simple breakfast": "Pan tostado, huevos pasados por agua, aguacate, queso gruyère, mermelada y mantequilla.",
  "Miso shakshuka with shrimps": "Salsa de tomate con miso rojo, gambas, huevos, cilantro, sésamo, yogur y pan.",
  "Halloumi breakfast": "Huevos revueltos, fritos o cocidos, halloumi a la plancha, pan tostado, aguacate, tomate de huerta, ensalada y hummus.",
  "Big breakfast": "Huevos revueltos, fritos o cocidos, bacon, tomate de huerta, tortita de patata, salsa tártara, aguacate machacado y ensalada.",
  "Zucchini hash browns with baked salmon": "Tortitas crujientes de calabacín con queso crema de hierbas y ralladura de limón, acompañadas de salmón al horno.",
  "Sweet fries": "Boniato con alioli de pesto.",
  "Beef salad": "Lechuga romana, aliño de pesto y yogur, tomate, patatas asadas, solomillo de ternera y cebolla roja.",
  "Salmon with beurre blanc sauce and Brussels sprouts": "Lomo de salmón con coles de Bruselas, guisantes y salsa beurre blanc.",
  "Beef burger with sweet fries": "Hamburguesa clásica de ternera con cheddar, pepinillos, cebolla roja y boniato frito.",
  "Avocado toast": "Aguacate con tomate de huerta, huevos pasados por agua, pan tostado, guisantes salteados y hojas verdes.",
  "Scramble toast": "Pan tostado, huevos revueltos con queso y parmesano; elige bacon, salmón o aguacate.",
  "Benedict": "Huevos Benedict con espinacas sobre un cruasán, con salmón, bacon o aguacate a elegir.",
  "Crepes with pistachio cream and strawberries": "Crepes finos con crema de chocolate blanco y pistacho, fresas y salsa de fresa.",
  "Matcha pancakes": "Tortitas con crema de matcha, fresas y crumble de Lotus.",
  "Granola with yogurt": "Granola casera, yogur, fruta, coco, chía, miel y mermelada de fresa.",
  "Bread": "Disponible únicamente como acompañamiento de un plato principal.",
};

const portugueseCorrections: Record<string, string> = {
  "Oatmeal with baked pear": "Papas de aveia com pera assada, granola crocante e manteiga noisette.",
  "Zucchini hash browns with baked salmon": "Panquecas crocantes de curgete com queijo creme de ervas e raspa de limão, servidas com salmão assado.",
  "Bread": "Disponível apenas como acompanhamento de um prato principal.",
};

export function localizeItemName(english: string, language: Language) {
  if (language === "en") return english;
  return names[english]?.[language === "pt" ? 0 : 1] ?? english;
}

export function localizeItemDescription(name: string, description: string | undefined, language: Language) {
  if (!description) return "";
  if (name === "Kombucha") {
    return language === "pt"
      ? "Original · Hortelã-pimenta · Morango · Hibisco · Citrinos tropicais · Gengibre"
      : language === "es"
        ? "Original · Menta · Fresa · Hibisco · Cítricos tropicales · Jengibre"
        : description;
  }
  const parts = description.split(" / ");
  if (language === "en") return parts.at(-1) ?? "";
  if (language === "pt") return portugueseCorrections[name] ?? (parts.length > 1 ? parts[0] : description);
  return spanishDescriptions[name] ?? (parts.length > 1 ? parts[1] : description);
}
