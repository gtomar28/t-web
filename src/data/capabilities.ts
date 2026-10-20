import { TechCapabilityItem } from "../types";

/**
 * Engineering capability atlas  practical stack knowledge Trevyk uses
 * across products (including Kiduart) and custom engagements.
 * Notes describe how we apply each tool, not invented SLAs.
 */
export const CAPABILITIES_DATA: TechCapabilityItem[] = [
  // Frontend
  {
    id: "react",
    name: "React 18 & 19",
    category: "frontend",
    usageNote:
      "Component-driven product UIs  admin consoles, parent portals, and marketing surfaces with predictable state and accessibility patterns.",
    badge: "Core UI Framework",
    tag: "SPA & hybrid apps",
    color: "#61DAFB",
    iconType: "react",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    usageNote:
      "Shared types across APIs and UI so school workflows (fees, attendance, roles) stay consistent from request to screen.",
    badge: "Type safety",
    tag: "End-to-end contracts",
    color: "#3178C6",
    iconType: "typescript",
  },
  {
    id: "nextjs",
    name: "Next.js & Vite",
    category: "frontend",
    usageNote:
      "Fast delivery for content sites and app shells  Vite for interactive experiences like trevyk.in; Next when SSR/SEO weight matters.",
    badge: "Web app engines",
    tag: "SSR / SPA / bundling",
    color: "#E8A9C2",
    iconType: "nextjs",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    usageNote:
      "Design-token driven styling so product surfaces stay coherent across dense tables, forms, and mobile-friendly panels.",
    badge: "Design system CSS",
    tag: "Utility tokens",
    color: "#38BDF8",
    iconType: "tailwind",
  },
  {
    id: "threejs-webgl",
    name: "Three.js & WebGL",
    category: "frontend",
    usageNote:
      "Interactive architecture metaphors and spatial UI on marketing and explainer surfaces  used carefully so pages stay performant.",
    badge: "3D experiences",
    tag: "WebGL canvas",
    color: "#E8A9C2",
    iconType: "webgl",
  },
  {
    id: "react-native-flutter",
    name: "React Native & Flutter",
    category: "frontend",
    usageNote:
      "Cross-platform mobile clients when a product needs native-feeling parent or staff apps alongside the web console.",
    badge: "Mobile engineering",
    tag: "iOS & Android",
    color: "#B9A6D1",
    iconType: "mobile",
  },

  // Backend
  {
    id: "nodejs-nestjs",
    name: "Node.js & NestJS",
    category: "backend",
    usageNote:
      "Modular TypeScript services for product APIs and BFF layers  clear modules for auth, billing hooks, and domain workflows.",
    badge: "Application backend",
    tag: "REST & jobs",
    color: "#68A063",
    iconType: "nodejs",
  },
  {
    id: "python-fastapi-django",
    name: "Python (FastAPI & Django)",
    category: "backend",
    usageNote:
      "Chosen for data-heavy APIs, reporting jobs, and AI-adjacent services where Python’s ecosystem is the fastest path to value.",
    badge: "API & data services",
    tag: "Async & ORM",
    color: "#FFD43B",
    iconType: "python",
  },
  {
    id: "go-lang",
    name: "Go (Golang)",
    category: "backend",
    usageNote:
      "Used selectively for network-facing workers and high-concurrency utilities when Node is not the right fit.",
    badge: "Systems services",
    tag: "Concurrency",
    color: "#00ADD8",
    iconType: "golang",
  },
  {
    id: "grpc-protobuf",
    name: "gRPC & Protocol Buffers",
    category: "backend",
    usageNote:
      "Typed service contracts for internal service-to-service calls when JSON REST would become noisy or fragile.",
    badge: "Service contracts",
    tag: "Binary RPC",
    color: "#B9A6D1",
    iconType: "grpc",
  },
  {
    id: "kafka-rabbitmq",
    name: "Apache Kafka & RabbitMQ",
    category: "backend",
    usageNote:
      "Async work for notifications, report generation, and integrations  so school-day screens stay responsive under load.",
    badge: "Messaging & queues",
    tag: "Event-driven",
    color: "#E8A9C2",
    iconType: "kafka",
  },

  // Cloud & DevOps
  {
    id: "aws-gcp-azure",
    name: "AWS, GCP & Azure",
    category: "cloud",
    usageNote:
      "Cloud placement chosen per engagement  cost, region, and operational fit  without locking every product to one vendor slide.",
    badge: "Cloud platforms",
    tag: "Region-aware",
    color: "#FF9900",
    iconType: "cloud",
  },
  {
    id: "kubernetes-docker",
    name: "Kubernetes & Docker",
    category: "cloud",
    usageNote:
      "Containerised services with rolling updates where the product maturity warrants orchestration  Docker first, K8s when scale asks for it.",
    badge: "Containers",
    tag: "Deploy & scale",
    color: "#326CE5",
    iconType: "k8s",
  },
  {
    id: "terraform-iac",
    name: "Terraform & Pulumi",
    category: "cloud",
    usageNote:
      "Infrastructure as code for repeatable environments  staging that mirrors production without manual drift.",
    badge: "Infrastructure as code",
    tag: "Reproducible env",
    color: "#7B42BC",
    iconType: "terraform",
  },
  {
    id: "github-actions-argocd",
    name: "GitHub Actions & ArgoCD",
    category: "cloud",
    usageNote:
      "CI pipelines for lint, tests, and controlled releases; GitOps where teams need auditable deployment history.",
    badge: "CI / CD",
    tag: "Automated delivery",
    color: "#2088FF",
    iconType: "cicd",
  },

  // Quality & Testing
  {
    id: "playwright-cypress",
    name: "Playwright & Cypress",
    category: "testing",
    usageNote:
      "Browser-level checks on critical paths  login, fees, attendance entry  before a release reaches schools.",
    badge: "E2E automation",
    tag: "Critical journeys",
    color: "#45BA4B",
    iconType: "testing",
  },
  {
    id: "jest-vitest",
    name: "Jest & Vitest",
    category: "testing",
    usageNote:
      "Unit and integration tests around domain rules (fee heads, roles, grading) so regressions surface in CI, not on opening day.",
    badge: "Unit & integration",
    tag: "Domain logic",
    color: "#C21325",
    iconType: "jest",
  },
  {
    id: "sonarqube-sast",
    name: "Static analysis & SAST",
    category: "testing",
    usageNote:
      "Automated lint and security scanning in CI to catch obvious vulnerabilities and maintainability issues early.",
    badge: "Code quality gates",
    tag: "SAST in pipeline",
    color: "#4B9BE1",
    iconType: "sonarqube",
  },
  {
    id: "k6-chaos-engineering",
    name: "k6 load testing",
    category: "testing",
    usageNote:
      "Load tests sized to realistic school-day traffic  fee windows and report peaks  not vanity million-user charts.",
    badge: "Performance checks",
    tag: "Realistic load",
    color: "#7D64FF",
    iconType: "k6",
  },

  // Data & AI
  {
    id: "gemini-multimodal-ai",
    name: "Google Gemini & LLMs",
    category: "ai",
    usageNote:
      "Assistive AI for copilots and document help where it adds clarity  never trained on private student records without explicit scope.",
    badge: "Generative AI",
    tag: "Assistive workflows",
    color: "#4E86E4",
    iconType: "gemini",
  },
  {
    id: "pytorch-langchain",
    name: "LangChain & RAG patterns",
    category: "ai",
    usageNote:
      "Retrieval-augmented assistants for knowledge bases and internal tools when a client needs grounded answers over their docs.",
    badge: "AI orchestration",
    tag: "RAG & tools",
    color: "#EE4C2C",
    iconType: "ai",
  },
  {
    id: "vector-dbs",
    name: "Vector search (Qdrant / Pinecone)",
    category: "ai",
    usageNote:
      "Semantic search over policy docs and help content  scoped indexes, not a blanket claim on every product screen.",
    badge: "Vector index",
    tag: "Semantic retrieval",
    color: "#C89B6C",
    iconType: "vectordb",
  },
  {
    id: "spark-dbt",
    name: "dbt & analytics pipelines",
    category: "ai",
    usageNote:
      "Clean transformation layers when leadership needs reliable attendance, fee, and academic rollups from operational data.",
    badge: "Data transformation",
    tag: "ELT / modelling",
    color: "#E25A1C",
    iconType: "spark",
  },

  // Databases
  {
    id: "postgresql-aurora",
    name: "PostgreSQL",
    category: "databases",
    usageNote:
      "Primary transactional store for product and custom systems  strong consistency for fees, admissions, and role-scoped records.",
    badge: "Relational core",
    tag: "ACID transactions",
    color: "#336791",
    iconType: "postgres",
  },
  {
    id: "clickhouse-olap",
    name: "ClickHouse (when needed)",
    category: "databases",
    usageNote:
      "Columnar analytics for heavy reporting workloads when operational Postgres alone is not the right shape for dashboards.",
    badge: "Analytical store",
    tag: "OLAP option",
    color: "#FFCC00",
    iconType: "clickhouse",
  },
  {
    id: "redis-enterprise",
    name: "Redis",
    category: "databases",
    usageNote:
      "Caching, session support, and short-lived rate limits so interactive screens stay snappy under concurrent staff use.",
    badge: "Cache & sessions",
    tag: "In-memory layer",
    color: "#DC382D",
    iconType: "redis",
  },
  {
    id: "mongodb-elasticsearch",
    name: "MongoDB & Elasticsearch",
    category: "databases",
    usageNote:
      "Document stores and full-text search when the domain needs flexible records or fast lookup across large text corpora.",
    badge: "NoSQL & search",
    tag: "Flexible schemas",
    color: "#47A248",
    iconType: "mongo",
  },
];
