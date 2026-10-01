export const brand = {
  name: "NexooAI",
  shortName: "NX",
  tagline: "Technology Built Around Your Business.",
  heroDescription:
    "From jewellery, retail, and business management to hospitality, commerce, and enterprise suites, NexooAI crafts high-performance technology that empowers modern businesses to scale effortlessly.",
  siteUrl: "https://nexooai.com",
  email: "nexooai@gmail.com",
  phone: "+91 97880 33234",
  phoneSecondary: "+91 98403 19606",
  address: "Tamil Nadu, India",
  leaders: [
    {
      name: "G Mohandass",
      role: "Founder & Chief Solutions Architect",
      phone: "+91 97880 33234",
      rawPhone: "9788033234",
      email: "nexooai@gmail.com",
      focus: "Direct Architecture & Technical Strategy",
    },
    {
      name: "G Sudhakar",
      role: "Co-Founder & Director of Enterprise Sales",
      phone: "+91 98403 19606",
      rawPhone: "9840319606",
      email: "nexooai@gmail.com",
      focus: "Commercial Partnerships & Retail POS Deployments",
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/nexooai" },
    { label: "Instagram", href: "https://instagram.com/nexooai" },
    { label: "X", href: "https://x.com/nexooai" },
    { label: "GitHub", href: "https://github.com/nexooai" },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
