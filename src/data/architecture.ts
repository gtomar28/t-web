export interface ArchitectureCubeItem {
  id: string;
  name: string;
  cubeIndex: number;
  role: string;
  color: string;
  description: string;
  specs: {
    protocol: string;
    latency: string;
    concurrency?: string;
    isolation?: string;
  };
  responsibilities: string[];
  techStack: string[];
}

/** Conceptual Core Block map  design intent, not published benchmark SLAs. */
export const ARCHITECTURE_CUBES: ArchitectureCubeItem[] = [
  {
    id: "edge-ingress",
    name: "Edge Ingress & Layer 7 Routing",
    cubeIndex: 0,
    role: "Top-Left Node",
    color: "#E8A9C2",
    description:
      "Edge and CDN layer for TLS termination, caching, and basic traffic shielding before requests reach application services.",
    specs: {
      protocol: "HTTPS / HTTP/2+",
      latency: "Edge caching where it helps",
      concurrency: "Sized to product traffic",
      isolation: "Rate limits & WAF rules as needed",
    },
    responsibilities: [
      "TLS termination and certificate lifecycle",
      "Static asset caching and compression",
      "Basic DDoS / abuse filtering at the edge",
      "Health-aware routing to origin services",
    ],
    techStack: [
      "CDN / reverse proxy",
      "TLS 1.2+",
      "Brotli / gzip",
      "DNS failover",
    ],
  },
  {
    id: "api-gateway",
    name: "API Gateway & Access Control",
    cubeIndex: 1,
    role: "Top-Right Node",
    color: "#B9A6D1",
    description:
      "Authentication and authorization boundary  sessions/tokens, role checks, and request validation before business logic runs.",
    specs: {
      protocol: "REST / OpenAPI / OAuth-style flows",
      latency: "Auth checks on every request",
      concurrency: "Session & token lifecycle",
      isolation: "Role-based access (RBAC)",
    },
    responsibilities: [
      "Login, session, and token validation",
      "Role-based permissions for school and staff roles",
      "Input validation and basic request sanitization",
      "Audit-friendly access logging where required",
    ],
    techStack: [
      "API gateway / BFF",
      "JWT or session cookies",
      "RBAC policies",
      "Redis (optional cache)",
    ],
  },
  {
    id: "distributed-services",
    name: "Application Services",
    cubeIndex: 2,
    role: "Center Junction",
    color: "#6B4A87",
    description:
      "Modular application services for product and client work  keep domains separable so one feature can ship without rewriting everything.",
    specs: {
      protocol: "REST / job queues / webhooks",
      latency: "Designed for responsive UX",
      concurrency: "Scale with demand, not theatre",
      isolation: "Clear service boundaries",
    },
    responsibilities: [
      "Business workflows and domain rules",
      "Background jobs for notifications and reports",
      "Integrations with payment and messaging providers",
      "Observability hooks for errors and slow paths",
    ],
    techStack: [
      "Node / TypeScript",
      "containers",
      "queues",
      "structured logging",
    ],
  },
  {
    id: "modular-erp-core",
    name: "Kiduart School ERP Domain",
    cubeIndex: 3,
    role: "Mid Stem",
    color: "#5A3875",
    description:
      "The domain engine behind Kiduart  admissions, fees, attendance, exams, and parent updates. See kiduart.com for the live product journey.",
    specs: {
      protocol: "REST / webhooks / mobile APIs",
      latency: "School-day responsive",
      concurrency: "Multi-tenant school accounts",
      isolation: "Per-school data boundaries",
    },
    responsibilities: [
      "Admissions, fees, attendance, and exam workflows",
      "Parent/staff communication channels",
      "Role-scoped access to student records",
      "Export and support paths published with the product",
    ],
    techStack: [
      "TypeScript",
      "PostgreSQL",
      "web + mobile clients",
      "payment gateways",
    ],
  },
  {
    id: "resilient-data-store",
    name: "Data Store & Backups",
    cubeIndex: 4,
    role: "Base Stem",
    color: "#3D224E",
    description:
      "Persistent storage with backups, encryption at rest where configured, and export paths so schools are not trapped in a black box.",
    specs: {
      protocol: "SQL / object storage",
      latency: "Indexed queries for common screens",
      concurrency: "Backups on a defined schedule",
      isolation: "Encrypted storage + access control",
    },
    responsibilities: [
      "Transactional records for fees and academics",
      "Scheduled backups and restore procedures",
      "Audit trails for sensitive admin actions",
      "Data export support for migrations",
    ],
    techStack: [
      "PostgreSQL",
      "object storage",
      "backup tooling",
      "encryption at rest",
    ],
  },
];
