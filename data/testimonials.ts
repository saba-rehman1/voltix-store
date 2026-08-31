import type { Testimonial } from "@/types";

const avatar = (name: string, bg: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${bg}&color=fff&bold=true&size=100`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Camille Torres",
    role: "Product Designer",
    avatar: avatar("Camille Torres", "2563EB"),
    rating: 5,
    quote:
      "Voltix Store is the only electronics site I trust for big purchases now. The comparison tools alone saved me from an expensive mistake on my last laptop.",
  },
  {
    id: "t2",
    name: "Derek Whitfield",
    role: "Software Engineer",
    avatar: avatar("Derek Whitfield", "06B6D4"),
    rating: 5,
    quote:
      "Fast shipping, genuine products, and the AI assistant actually gave useful recommendations instead of just pushing the most expensive option.",
  },
  {
    id: "t3",
    name: "Aiko Tanaka",
    role: "Content Creator",
    avatar: avatar("Aiko Tanaka", "22C55E"),
    rating: 5,
    quote:
      "I've bought three cameras' worth of gear equivalent through Voltix — headphones, a laptop, and my watch. Every single order arrived exactly as described.",
  },
  {
    id: "t4",
    name: "Jonas Berg",
    role: "Startup Founder",
    avatar: avatar("Jonas Berg", "EF4444"),
    rating: 4,
    quote:
      "The checkout process is genuinely the smoothest I've used online. Saved cards, address book, all of it just works without friction.",
  },
  {
    id: "t5",
    name: "Renata Alves",
    role: "Marketing Director",
    avatar: avatar("Renata Alves", "F59E0B"),
    rating: 5,
    quote:
      "Customer support resolved a warranty claim in under 24 hours. That kind of responsiveness is rare for electronics retailers at this scale.",
  },
];
