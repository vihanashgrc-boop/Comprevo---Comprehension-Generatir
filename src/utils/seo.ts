export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  image?: string;
}

const BASE_URL = "https://comprevo-comprehension-generator.vercel.app";
const DEFAULT_IMAGE = "https://comprevo-comprehension-generator.vercel.app/icon.svg";

export const DEFAULT_PAGE_SEO: PageSEOConfig = {
  title: "Free AI Reading Comprehension Generator | Comprevo",
  description:
    "Free AI reading comprehension generator. Create custom passages with questions, MCQs, and printable worksheets with answer keys in seconds for schools.",
  keywords:
    "reading comprehension generator, AI comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo, free comprehension generator, reading comprehension practice",
  canonicalPath: "/",
  ogType: "website",
  image: DEFAULT_IMAGE,
};

export const PAGE_SEO_REGISTRY: Record<string, PageSEOConfig> = {
  dashboard: DEFAULT_PAGE_SEO,
  auth: DEFAULT_PAGE_SEO,
  comprehension_generator: {
    title: "AI Comprehension Generator — Custom Reading Passages | Comprevo",
    description:
      "Generate custom reading comprehension passages, questions, and instant answer keys with AI. Free educational worksheet maker for teachers and students.",
    keywords:
      "comprehension generator, AI comprehension generator, reading comprehension generator, reading passages, comprehension questions, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/comprehension-generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  reading_comprehension_generator: {
    title: "AI Reading Comprehension Generator for Students & Teachers | Comprevo",
    description:
      "Create tailored reading comprehension worksheets, passages, and quizzes instantly. Free AI reading comprehension generator with vocabulary hints and questions.",
    keywords:
      "reading comprehension generator, AI comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/reading-comprehension-generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  class_8_comprehension: {
    title: "Class 8 English Reading Comprehension Passages & Questions | Comprevo",
    description:
      "Free Class 8 English reading comprehension passages with questions, answers, and worksheets for CBSE, ICSE, NCERT, and State Boards.",
    keywords:
      "Class 8 reading comprehension, Class 8 English passages, reading comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/class-8-comprehension",
    ogType: "article",
    image: DEFAULT_IMAGE,
  },
  data_interpretation: {
    title: "Data Interpretation & Graph Reading Practice | Comprevo",
    description:
      "Practice data interpretation, chart analysis, and graph comprehension questions. Free interactive data worksheets for students and educators.",
    keywords:
      "data interpretation, graph comprehension, chart reading practice, comprehension questions, reading passages, worksheets, students, teachers, education, Comprevo",
    canonicalPath: "/data-interpretation",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  step_board: {
    title: "Select Curriculum Board — Reading Comprehension Generator | Comprevo",
    description:
      "Choose your education board (CBSE, ICSE, Cambridge, IB, State Board) to generate custom reading comprehension passages and worksheets.",
    keywords:
      "reading comprehension generator, AI comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  step_class: {
    title: "Select Grade Level — Reading Comprehension Generator | Comprevo",
    description:
      "Select grade level from Grade 6 to Grade 10 to generate age-appropriate reading comprehension worksheets with tailored questions.",
    keywords:
      "reading comprehension generator, grade 6 to 10 comprehension, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  step_difficulty: {
    title: "Select Difficulty Level — Reading Comprehension Generator | Comprevo",
    description:
      "Choose Easy, Medium, or Hard difficulty to tailor vocabulary and question complexity for your reading comprehension passage.",
    keywords:
      "reading comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  step_configure: {
    title: "Configure Topic & Passage Style — Reading Comprehension Generator | Comprevo",
    description:
      "Customize topic, passage length, and question types to generate your custom AI reading comprehension worksheet with instant answer keys.",
    keywords:
      "reading comprehension generator, AI comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/generator",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
  viewer: {
    title: "Interactive Reading Comprehension Worksheet | Comprevo",
    description:
      "Solve reading comprehension questions with instant feedback, interactive glossary definitions, and detailed answer explanations.",
    keywords:
      "reading comprehension generator, comprehension questions, reading passages, worksheets, teachers, students, education, Comprevo",
    canonicalPath: "/",
    ogType: "website",
    image: DEFAULT_IMAGE,
  },
};

/**
 * Updates all primary, OpenGraph, Twitter, and canonical metadata tags in the document head.
 */
export function updateSEO(config: PageSEOConfig) {
  if (typeof document === "undefined") return;

  const {
    title,
    description,
    keywords = DEFAULT_PAGE_SEO.keywords,
    canonicalPath = "/",
    ogType = "website",
    image = DEFAULT_IMAGE,
  } = config;

  const fullCanonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;

  // 1. Title
  document.title = title;

  // Helper to update or create meta tag
  const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // 2. Primary Meta Tags
  setMetaTag("name", "title", title);
  setMetaTag("name", "description", description);
  if (keywords) {
    setMetaTag("name", "keywords", keywords);
  }

  // 3. Canonical Link Tag
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", fullCanonicalUrl);

  // 4. Open Graph Tags
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:type", ogType);
  setMetaTag("property", "og:url", fullCanonicalUrl);
  setMetaTag("property", "og:image", image);
  setMetaTag("property", "og:site_name", "Comprevo");

  // 5. Twitter Card Tags
  setMetaTag("property", "twitter:card", "summary_large_image");
  setMetaTag("property", "twitter:title", title);
  setMetaTag("property", "twitter:description", description);
  setMetaTag("property", "twitter:url", fullCanonicalUrl);
  setMetaTag("property", "twitter:image", image);
}
