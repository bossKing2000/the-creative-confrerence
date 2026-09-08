export interface Sponsor {
  name: string;
  logo: string;
  width: number;
  height: number;
  href?: string;
}

export const sponsors: Sponsor[] = [
  { name: 'Bezalel Design Academy', logo: '/images/sponsors/BDA-Full.png', width: 2839, height: 1478 },
  { name: "Creative Raiser's Network", logo: '/images/sponsors/CRN_LOGO.png', width: 870, height: 290 },
  { name: 'Eventpadi', logo: '/images/sponsors/cropped-Features-10.png', width: 3375, height: 839 },
  { name: 'Lavie Studios', logo: '/images/sponsors/Lavie-Light.png', width: 1273, height: 665 },
  { name: 'Trendifty', logo: '/images/sponsors/trendifty-africa-white.png', width: 1500, height: 1500 },
  { name: 'Adéwálé', logo: '/images/sponsors/adewalte.png', width: 1500, height: 1500 },
];
