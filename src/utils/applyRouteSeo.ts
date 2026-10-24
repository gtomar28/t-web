import {
  absoluteUrl,
  KIDUART_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "../config/site";
import {
  breadcrumbJsonLd,
  getRouteSeo,
  getSocialImageAlt,
  getSocialImagePath,
  isIndexablePath,
  normalizeSeoPath,
  webPageJsonLd,
} from "../config/seo";
import { SERVICES_DATA } from "../data/services";
import { getGuide } from "../data/guides";
import { AI_HUB_FAQS } from "../data/aiHub";

function upsertMeta(
  selector: string,
  attr: string,
  value: string,
  createAttrs?: Record<string, string>,
) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el && createAttrs) {
    el = document.createElement("meta");
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  if (el) el.setAttribute(attr, value);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Per-route SEO: title, description, OG/Twitter, canonical, JSON-LD.
 * Client-side for SPA; keep index.html home defaults for first paint / no-JS.
 */
export function applyRouteSeo(pathname: string) {
  const indexable = isIndexablePath(pathname);
  const path = normalizeSeoPath(pathname);
  const meta = getRouteSeo(path);
  const url = indexable ? absoluteUrl(pathname) : `${SITE_URL}${pathname}`;
  const image = absoluteUrl(getSocialImagePath(path));
  const imageAlt = getSocialImageAlt(path);
  const fallbackImage = absoluteUrl("/trevyk-logo.png");

  document.title = meta.title;
  document.documentElement.lang = "en-IN";

  upsertMeta('meta[name="description"]', "content", meta.description, {
    name: "description",
  });
  if (meta.keywords) {
    upsertMeta('meta[name="keywords"]', "content", meta.keywords, {
      name: "keywords",
    });
  }
  upsertMeta(
    'meta[name="robots"]',
    "content",
    indexable
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, follow",
    { name: "robots" },
  );
  upsertMeta('meta[name="author"]', "content", SITE_NAME, { name: "author" });
  upsertMeta('meta[name="theme-color"]', "content", "#2A1830", {
    name: "theme-color",
  });

  upsertMeta('meta[property="og:locale"]', "content", "en_IN", {
    property: "og:locale",
  });
  upsertMeta('meta[property="og:title"]', "content", meta.title, {
    property: "og:title",
  });
  upsertMeta('meta[property="og:description"]', "content", meta.description, {
    property: "og:description",
  });
  upsertMeta('meta[property="og:type"]', "content", "website", {
    property: "og:type",
  });
  upsertMeta('meta[property="og:url"]', "content", url, {
    property: "og:url",
  });
  upsertMeta('meta[property="og:image"]', "content", image, {
    property: "og:image",
  });
  upsertMeta('meta[property="og:image:alt"]', "content", imageAlt, {
    property: "og:image:alt",
  });
  upsertMeta('meta[property="og:site_name"]', "content", SITE_NAME, {
    property: "og:site_name",
  });

  upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image", {
    name: "twitter:card",
  });
  upsertMeta('meta[name="twitter:title"]', "content", meta.title, {
    name: "twitter:title",
  });
  upsertMeta('meta[name="twitter:description"]', "content", meta.description, {
    name: "twitter:description",
  });
  upsertMeta('meta[name="twitter:image"]', "content", image, {
    name: "twitter:image",
  });

  upsertLink("canonical", url);

  upsertJsonLd("ld-organization", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Trevyk",
    slogan: SITE_TAGLINE,
    url: SITE_URL,
    logo: fallbackImage,
    image: image,
    description:
      "Trevyk Technologies builds custom websites, web applications, and custom software, and supports SEO, digital marketing, social media, and video for growing businesses. Based in Noida, India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: [KIDUART_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@trevyk.com",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+91-92175-34128",
        email: "support@kiduart.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  });

  upsertJsonLd("ld-website", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: getRouteSeo("/").description,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  });

  upsertJsonLd("ld-webpage", webPageJsonLd(path));
  if (indexable) {
    upsertJsonLd("ld-breadcrumbs", breadcrumbJsonLd(path));
  } else {
    document.getElementById("ld-breadcrumbs")?.remove();
  }
  upsertJsonLd("ld-offers", {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Trevyk services",
    itemListElement: SERVICES_DATA.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: service.title,
      description: service.tagline,
      url: absoluteUrl("/what-we-do"),
    })),
  });

  if (path === "/our-products") {
    upsertJsonLd("ld-software", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Kiduart School ERP",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: KIDUART_URL,
      description:
        "Cloud school ERP and school management system for Indian schools  admissions, fees, attendance, exams, and parent communication.",
      offers: {
        "@type": "Offer",
        url: KIDUART_URL,
        availability: "https://schema.org/InStock",
      },
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      isRelatedTo: {
        "@type": "WebPage",
        url: absoluteUrl("/our-products"),
        name: "Kiduart on TREVYK Technologies",
      },
    });
  } else {
    document.getElementById("ld-software")?.remove();
  }

  if (path.startsWith("/work/")) {
    const guide = getGuide(path.replace("/work/", ""));
    if (guide?.faqs && guide.faqs.length > 0) {
      upsertJsonLd("ld-faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    } else {
      document.getElementById("ld-faq")?.remove();
    }
  } else if (path === "/ai") {
    upsertJsonLd("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What AI services does Trevyk offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Custom AI agents, RAG and private knowledge assistants, workflow automation beside your systems, and honest integration work. School ERP product needs belong primarily on kiduart.com.",
          },
        },
        {
          "@type": "Question",
          name: "Do you sell separate AEO or GEO packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Clear answers and crawlable structure support both classic SEO and AI-answer surfaces. We do not promise citations.",
          },
        },
        {
          "@type": "Question",
          name: "How is AI project cost determined?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Integrations, corpus size, languages, traffic, evaluation depth, and whether write actions are allowed. We quote from scope—not invented ROI.",
          },
        },
      ],
    });
  } else {
    document.getElementById("ld-faq")?.remove();
  }
}
