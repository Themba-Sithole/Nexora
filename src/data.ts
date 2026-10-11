export type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  year: number;
  status: string;
  image: string;
  description: string;
  scope: string;
  facts: string[];
};

const images = [
  "https://images.unsplash.com/photo-1593427995298-cad6731716d8?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1720001855008-b30bd720cafc?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1509024368907-57294758cfc5?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1626692987335-15dfc7a6f4b2?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1660330193728-5d29ee8230a6?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1609627016501-b862497c7294?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1528628226822-6f38ca9687c9?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1695552149361-568a89a2034b?auto=format&fit=crop&w=1800&q=85",
];

const rows = [
  ["Meridian Business Tower", "Commercial", "Cape Town", 2026, "Completed"],
  ["The Ridge Residences", "Residential", "Stellenbosch", 2027, "In progress"],
  ["Atlas Logistics Park", "Industrial", "Johannesburg", 2025, "Completed"],
  ["Harbourfront Redevelopment", "Commercial", "Cape Town", 2028, "In progress"],
  ["Cedar House", "Residential", "Western Cape", 2024, "Completed"],
  ["Northern Link Infrastructure", "Civil & Infrastructure", "Gauteng", 2026, "Planning"],
  ["Foundry Creative Campus", "Commercial", "Cape Town", 2023, "Completed"],
  ["The Heritage Renewal", "Renovation", "Western Cape", 2025, "Completed"],
];

export const projects: Project[] = rows.map((row, index) => ({
  id: index + 1,
  title: row[0] as string,
  category: row[1] as string,
  location: row[2] as string,
  year: row[3] as number,
  status: row[4] as string,
  image: images[index],
  description:
    "A considered construction programme balancing architectural intent, resilient materials, and disciplined site coordination.",
  scope:
    "Pre-construction planning, procurement coordination, structural works, quality oversight, and project handover.",
  facts: ["Illustrative area: 12,400 m²", "Example programme: 22 months", "Editable sample project data"],
}));

export const services = [
  {
    title: "Commercial Construction",
    short: "High-performance commercial buildings engineered for modern business.",
    description:
      "Commercial construction solutions designed around performance, longevity, functionality, and the needs of modern businesses.",
    image: images[0],
    capabilities: ["Office and corporate buildings", "Retail and commercial spaces", "Mixed-use developments", "Structural construction", "Interior fit-outs", "Construction coordination"],
  },
  {
    title: "Residential Construction",
    short: "Considered homes and residential developments built to endure.",
    description:
      "Residential developments that combine considered design, durable materials, and careful construction management.",
    image: images[1],
    capabilities: ["Luxury residential properties", "New home construction", "Multi-unit developments", "Residential extensions", "Finishing and fit-outs", "Renovation coordination"],
  },
  {
    title: "Civil & Infrastructure",
    short: "Reliable civil solutions for complex environments.",
    description:
      "Practical infrastructure construction and civil works delivered through disciplined planning and technical coordination.",
    image: images[5],
    capabilities: ["Site preparation", "Earthworks and foundations", "Concrete works", "Drainage and infrastructure", "Access and external works", "Civil construction coordination"],
  },
  {
    title: "Renovation & Refurbishment",
    short: "Reframing existing spaces with precision and modern methods.",
    description:
      "Modernising existing buildings through thoughtful upgrades, structural improvements, and carefully managed refurbishment.",
    image: images[7],
    capabilities: ["Building upgrades", "Commercial refurbishments", "Interior modernisation", "Extensions and alterations", "Finishing improvements", "Existing-building coordination"],
  },
];
