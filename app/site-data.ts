export const contact = {
  phoneDisplay: "412 706 0399",
  phoneUrl: "tel:+14127060399",
  email: "joshua.pickens7@gmail.com",
  emailUrl: "mailto:joshua.pickens7@gmail.com",
  instagram: "https://www.instagram.com/joshscookiecreations/",
};

export const treatGallery = [
  {
    id: "chocolate-dipped-oreos",
    name: "Chocolate-Dipped Oreos",
    image: "/images/treats/chocolate-dipped-cookies.webp",
    alt: "Rows of chocolate-dipped Oreos with white topping details",
    category: "Dipped Cookies",
    width: 1254,
    height: 1254,
  },
  {
    id: "cookie-monster-cake",
    name: "Cookie Monster Cake",
    image: "/images/treats/frosted-cookie-bar.webp",
    alt: "Cookie Monster Cake topped with white frosting",
    category: "Cookie Bars",
    width: 1122,
    height: 1402,
  },
  {
    id: "boss-brownies",
    name: "Boss Brownies",
    image: "/images/treats/chocolate-candy-bars.webp",
    alt: "A pile of chocolate-covered Boss Brownies",
    category: "Josh’s Creation",
    width: 1122,
    height: 1402,
  },
  {
    id: "super-brownie",
    name: "Super Brownie",
    image: "/images/treats/chocolate-cookie-bars.webp",
    alt: "Chocolate-topped Super Brownies arranged on a pastel blue background",
    category: "Josh’s Creation",
    width: 1122,
    height: 1402,
  },
  {
    id: "cinnamon-cookies",
    name: "Cinnamon Cookies",
    image: "/images/treats/cinnamon-cookies.webp",
    alt: "A grid of cinnamon cookies topped with white icing on a pastel blue background",
    category: "Cookies",
    width: 1122,
    height: 1402,
  },
  {
    id: "tuxedo-truffles",
    name: "Tuxedo Truffles",
    image: "/images/treats/tuxedo-truffles.webp",
    alt: "White and dark chocolate truffles with contrasting chocolate drizzle",
    category: "Truffles",
    width: 1122,
    height: 1402,
  },
  {
    id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookie",
    image: "/images/treats/chocolate-chip-cookies.webp",
    alt: "Two orderly groups of golden chocolate chip cookies on a pastel blue background",
    category: "Cookies",
    width: 1448,
    height: 1086,
  },
] as const;

export const products = [
  { ...treatGallery[0], color: "yellow" },
  { ...treatGallery[1], color: "pink" },
  { ...treatGallery[5], color: "blue" },
  { ...treatGallery[4], color: "mint" },
] as const;

export const ourTreatsProducts = [
  { ...treatGallery[6], name: "Chocolate Chip Cookies", galleryImage: "/images/treats/outpainted/chocolate-chip-cookies.webp", galleryWidth: 1448, galleryHeight: 1448 },
  { ...treatGallery[3], name: "Super Brownie", galleryImage: "/images/treats/outpainted/chocolate-cookie-bars.webp", galleryWidth: 1402, galleryHeight: 1402 },
  { ...treatGallery[0], name: "Chocolate-Dipped Oreos", galleryImage: treatGallery[0].image, galleryWidth: 1254, galleryHeight: 1254 },
  { ...treatGallery[5], name: "Tuxedo Truffles", galleryImage: "/images/treats/outpainted/tuxedo-truffles.webp", galleryWidth: 1402, galleryHeight: 1402 },
  { ...treatGallery[4], name: "Cinnamon Cookies", galleryImage: "/images/treats/outpainted/cinnamon-cookies.webp", galleryWidth: 1402, galleryHeight: 1402 },
  { ...treatGallery[2], name: "Boss Brownies", galleryImage: "/images/treats/outpainted/chocolate-candy-bars.webp", galleryWidth: 1402, galleryHeight: 1402 },
  { ...treatGallery[1], name: "Cookie Monster Cake", galleryImage: "/images/treats/outpainted/frosted-cookie-bar.webp", galleryWidth: 1402, galleryHeight: 1402 },
] as const;
