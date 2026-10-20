export type ArchitectureTeaserLayer = {
  index: number;
  num: string;
  name: string;
  description: string;
  tags: string[];
  accent: string;
  /** Glass slab image (0 = bottom … 80 = top of stack) */
  slabSrc: string;
  imageSrc: string;
  imageAlt: string;
  cardSide: "left" | "right";
  cardPosition: string;
  anchorY: number;
};

export const ARCHITECTURE_TEASER_LAYERS: ArchitectureTeaserLayer[] = [
  {
    index: 0,
    num: "01",
    name: "Edge Ingress",
    description:
      "Where traffic enters the network with resilience and defence.",
    tags: ["CDN", "Load Balancer", "WAF", "Rate Limiting"],
    accent: "#E8A9C2",
    slabSrc: "/images/architecture/glass-slab-plum-80-transparent.png",
    imageSrc: "/images/architecture/layer-edge-devices.jpg",
    imageAlt: "Phone and laptop at the edge",
    cardSide: "left",
    cardPosition: "left-0 top-[6%] lg:left-[1%]",
    anchorY: 18,
  },
  {
    index: 1,
    num: "02",
    name: "API Gateway",
    description: "Secure routing and access to backing services.",
    tags: ["Auth", "API Routing", "Throttling", "Observability"],
    accent: "#B9A6D1",
    slabSrc: "/images/architecture/glass-slab-plum-60-transparent.png",
    imageSrc: "/images/architecture/layer-shield.jpg",
    imageAlt: "Security shield for API gateway",
    cardSide: "right",
    cardPosition: "right-0 top-[6%] lg:right-[1%]",
    anchorY: 28,
  },
  {
    index: 2,
    num: "03",
    name: "Application Services",
    description: "Modular services that drive product features.",
    tags: ["Modular Services", "APIs", "Background Jobs"],
    accent: "#6B4A87",
    slabSrc: "/images/architecture/glass-slab-plum-40-transparent.png",
    imageSrc: "/images/architecture/layer-code.jpg",
    imageAlt: "Application code and services",
    cardSide: "left",
    cardPosition: "left-0 top-[34%] lg:left-[0%]",
    anchorY: 42,
  },
  {
    index: 3,
    num: "04",
    name: "Domain Core",
    description: "Workflows and integrations with external systems.",
    tags: ["Workflow Engine", "Integrations", "Event Handling"],
    accent: "#8558A5",
    slabSrc: "/images/architecture/glass-slab-plum-20-transparent.png",
    imageSrc: "/images/architecture/layer-database.jpg",
    imageAlt: "Domain database core",
    cardSide: "right",
    cardPosition: "right-0 top-[34%] lg:right-[0%]",
    anchorY: 52,
  },
  {
    index: 4,
    num: "05",
    name: "Data Layer",
    description: "Persistence, cache, and recovery you can rely on.",
    tags: ["Database", "Cache", "Backups", "Replication"],
    accent: "#4A2E62",
    slabSrc: "/images/architecture/glass-slab-plum-0-transparent.png",
    imageSrc: "/images/architecture/layer-server.jpg",
    imageAlt: "Server and data storage layer",
    cardSide: "left",
    cardPosition: "left-0 bottom-[8%] lg:left-[2%]",
    anchorY: 68,
  },
];
