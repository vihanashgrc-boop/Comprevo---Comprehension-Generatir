import React, { useState, useEffect } from "react";
import { 
  Sparkles, ArrowRight, Play, CheckCircle2, TrendingUp, 
  GraduationCap, Users, Brain, BookOpen, Layers, 
  Award, Zap, Check, ChevronRight, HelpCircle, FileText, 
  ShieldCheck, Clock, BookMarked, Printer, Globe, 
  Lightbulb, Compass, Share2, Star, CheckSquare, Target,
  AlertCircle, Eye, EyeOff, FileCheck, Bookmark, Download
} from "lucide-react";

interface Class8ComprehensionLandingProps {
  onStartGenerator: () => void;
  onOpenComprehensionGenerator: () => void;
  onOpenReadingComprehensionGenerator: () => void;
  onOpenDataInterpretation: () => void;
  onNavigateHome: () => void;
}

export default function Class8ComprehensionLanding({
  onStartGenerator,
  onOpenComprehensionGenerator,
  onOpenReadingComprehensionGenerator,
  onOpenDataInterpretation,
  onNavigateHome,
}: Class8ComprehensionLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSampleAnswers, setShowSampleAnswers] = useState(false);

  // Set document title and meta description dynamically for this SEO page
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Class 8 English Comprehension Passages with Questions | Comprevo";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Practice Class 8 English comprehension passages with questions and answers. Generate unlimited CBSE-style comprehension passages using Comprevo AI."
      );
    }

    // Scroll to top upon landing
    window.scrollTo(0, 0);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the pattern of English Reading Comprehension in Class 8 CBSE?",
      a: "In the CBSE Class 8 English examination, Section A (Reading Skills) typically carries 20 marks, divided into two unseen passages of 10 marks each. The first is usually a discursive passage (350–400 words) testing reasoning, inference, and vocabulary, while the second is a factual or case-based passage (300–350 words) evaluating data extraction and literal understanding."
    },
    {
      q: "How many questions are asked in a Class 8 unseen passage?",
      a: "Each Class 8 unseen passage generally contains 8 to 10 questions carrying a total of 10 marks. These include a balanced combination of 4 to 5 Multiple Choice Questions (MCQs), 2 to 3 Short Answer Questions (requiring 30–40 words), and 2 vocabulary-focused questions (such as finding synonyms, antonyms, or contextual meanings)."
    },
    {
      q: "How does Comprevo AI generate CBSE Class 8 aligned passages?",
      a: "Comprevo AI uses specialized pedagogical prompting calibrated to NCERT learning outcomes and CBSE Class 8 language benchmarks. It dynamically generates original passages within the recommended 300–400 word limit, incorporates age-appropriate Lexile-grade vocabulary, and drafts standard question types with rigorous answer keys and explanations."
    },
    {
      q: "What is the difference between a Discursive Passage and a Factual Passage in Class 8?",
      a: "A Discursive Passage is an opinionative, exploratory, or philosophical text that presents arguments, ideas, and diverse perspectives, demanding higher-order thinking (HOTS) and inference. A Factual Passage presents objective facts, historical narratives, scientific discoveries, or descriptive reports where answers are explicitly stated in the text."
    },
    {
      q: "How much time should a Class 8 student spend on Section A (Reading)?",
      a: "In an 80-mark, 3-hour annual examination, students are advised to dedicate 35 to 40 minutes to Section A. This breaks down into 5 minutes for pre-reading and question skimming, 15 minutes for solving Passage 1, and 15 minutes for solving Passage 2, leaving sufficient time for Writing, Grammar, and Literature sections."
    },
    {
      q: "Can I generate printable PDF worksheets for Class 8 English homework?",
      a: "Yes! Comprevo allows students and educators to instantly export generated Class 8 reading passages as clean, beautifully formatted printable PDF worksheets. You can print student test copies (with blank answer spaces) or teacher copies with complete answer keys, scoring rubrics, and vocabulary guides."
    },
    {
      q: "How can Class 8 students improve their score in vocabulary questions?",
      a: "To ace vocabulary questions (e.g., 'Find a word in paragraph 2 which means...'), students should identify the part of speech of the target word (noun, adjective, verb) and replace words in the sentence to test if the contextual meaning and grammatical tense remain intact. Comprevo passages include built-in vocabulary callouts and word definitions to build strong lexical habits."
    },
    {
      q: "Are the comprehension passages free on Comprevo?",
      a: "Yes. Comprevo provides 100% free, unlimited access to Class 8 reading comprehension generation. There are no paywalls, subscriptions, or hidden charges. You can generate, practice online, or download worksheets as often as needed."
    },
    {
      q: "What topics are best for Class 8 English unseen passage practice?",
      a: "CBSE Class 8 curricula favor diverse interdisciplinary themes including Environmental Conservation, Space Exploration, Technology & Artificial Intelligence, Inspiring Biographies of Indian Leaders and Scientists, Indian Heritage & Festivals, Wildlife Preservation, and Moral/Social dilemmas. Comprevo supports all of these topics plus custom user prompts."
    },
    {
      q: "How should students write answers to avoid losing marks for copying verbatim?",
      a: "CBSE examiners deduct marks when students blindly copy entire sentences from the passage. To secure full marks, students should extract the core fact or concept from the passage and synthesize it in their own words using correct grammar, proper punctuation, and direct phrasing (aiming for 1 to 2 concise sentences for 1-mark questions)."
    },
    {
      q: "Does Comprevo support other curricula like ICSE, Cambridge, and State Boards?",
      a: "Yes! While this page focuses specifically on CBSE Class 8 guidelines, Comprevo provides one-click curriculum selection for ICSE, Cambridge Checkpoint/IGCSE, IB MYP, and State Board frameworks, adapting question phrasing and difficulty accordingly."
    },
    {
      q: "Can teachers use Comprevo to create Class 8 Periodic Assessment and Term Exam papers?",
      a: "Absolutely. Hundreds of English educators use Comprevo to generate fresh, plagiarism-free unseen passages for Unit Tests, Periodic Assessments (PA-1, PA-2), Half-Yearly exams, and Annual finals. The tool generates clean question papers along with full marking keys within seconds."
    },
    {
      q: "What difficulty levels are available for Class 8 comprehension on Comprevo?",
      a: "Comprevo offers 3 difficulty tiers for Class 8: 'Easy' (foundational support with clear textual clues and simpler syntax), 'Medium' (standard CBSE school exam standard with balanced HOTS questions), and 'Hard' (advanced Olympiad and competitive scholarship standard with intricate figurative prose and challenging inference questions)."
    },
    {
      q: "Is there an interactive online practice mode with instant scoring?",
      a: "Yes. In addition to PDF exports, Comprevo includes an interactive student solving workspace. Students can read the passage, enter answers to MCQs and short-answer questions, and receive instant automated AI grading, rubrics, and explanations for each question."
    },
    {
      q: "How does practicing unseen passages help in Class 8 NCERT English textbooks (Honeydew & It So Happened)?",
      a: "Practicing unseen comprehension strengthens critical reading speed, active vocabulary retention, and contextual deduction skills. This directly elevates a student's performance in analyzing complex NCERT textbook prose, poetry extracts, and supplementary reader stories in their regular school exams."
    }
  ];

  // Schema.org Structured Data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://comprevo-comprehension-generator.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Class 8 English Comprehension",
        "item": "https://comprevo-comprehension-generator.vercel.app/class-8-comprehension"
      }
    ]
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-sans text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="pt-2 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex items-center space-x-2 flex-wrap">
          <li>
            <button
              onClick={onNavigateHome}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <ChevronRight className="h-3 w-3 inline text-zinc-400" />
          </li>
          <li>
            <button
              onClick={onOpenReadingComprehensionGenerator}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              Reading Generators
            </button>
          </li>
          <li>
            <ChevronRight className="h-3 w-3 inline text-zinc-400" />
          </li>
          <li className="font-semibold text-emerald-600 dark:text-emerald-400" aria-current="page">
            Class 8 English Comprehension
          </li>
        </ol>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative rounded-3xl border border-emerald-200/80 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 p-6 sm:p-10 md:p-12 shadow-sm text-center md:text-left overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CBSE &amp; NCERT Curriculum Aligned &bull; Class 8 English</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
            Class 8 English Comprehension Passages with Questions
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-650 dark:text-zinc-350 max-w-3xl leading-relaxed font-sans">
            Master CBSE Class 8 English Section A with curated and AI-generated unseen passages. Practice discursive and factual reading comprehension with MCQs, short answer questions, vocabulary in context, and instant step-by-step answer keys.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={onStartGenerator}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base px-7 py-3.5 transition shadow-sm hover:shadow cursor-pointer"
              id="btn-generate-class-8-comprehension-hero"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Class 8 Comprehension</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#sample-passage"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-750 dark:text-zinc-200 font-semibold text-sm px-6 py-3.5 transition cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>View Solved Sample Passage</span>
            </a>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 text-left">
            <div className="flex items-center space-x-2 text-xs text-zinc-650 dark:text-zinc-350">
              <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">CBSE 20-Mark Format</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-zinc-650 dark:text-zinc-350">
              <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">Discursive &amp; Factual</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-zinc-650 dark:text-zinc-350">
              <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">Complete Answer Keys</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-zinc-650 dark:text-zinc-350">
              <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">100% Free &amp; Printable</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. BLUEPRINT & EXAMINATION FORMAT */}
      <section aria-labelledby="blueprint-heading" className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
            <GraduationCap className="h-4 w-4" />
            <span>CBSE Curriculum Blueprint</span>
          </div>
          <h2 id="blueprint-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Class 8 English Reading Section Blueprint (Section A)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            In CBSE Class 8 English assessments (including Periodic Tests, Half-Yearly examinations, and Annual finals), 
            <strong> Section A (Reading Skills)</strong> carries a crucial weight of <strong>20 marks</strong>. Scoring full marks in 
            this section establishes a powerful foundation for the entire paper. Understanding the exact blueprint enables students to approach passages with tactical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Discursive Passage Card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700/60 transition">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                10 Marks &bull; 350–400 Words
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                Passage 1: Discursive Passage
              </h3>
              <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
                Discursive passages present reasoned arguments, opinions, philosophical musings, or social issues. They test a student’s higher-order thinking skills (HOTS), inference capabilities, and ability to follow logical progressions.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-zinc-200">Key Assessment Objectives:</div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Evaluating the author’s perspective, tone, and central message</li>
                <li>Deducing implied meanings and drawing logical conclusions</li>
                <li>Answering inference-based Short Answer Questions (30–40 words)</li>
                <li>Contextual vocabulary decoding (antonyms, synonyms, phrase meanings)</li>
              </ul>
            </div>
          </div>

          {/* Factual / Case-Based Passage Card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm hover:border-teal-300 dark:hover:border-teal-700/60 transition">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-300">
                <FileCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2.5 py-0.5 rounded-full">
                10 Marks &bull; 300–350 Words
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                Passage 2: Factual / Case-Based Passage
              </h3>
              <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
                Factual passages provide objective information, scientific explanations, historical timelines, biographical accounts, or case descriptions. They evaluate factual recall, skimming, and structured data comprehension.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-zinc-200">Key Assessment Objectives:</div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Locating direct factual evidence and chronological sequences</li>
                <li>Identifying statistical data, causes, effects, and definitions</li>
                <li>Solving Multiple Choice Questions (MCQs) with close options</li>
                <li>Selecting the most accurate title or summarizing paragraph cores</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUESTION TYPES & COGNITIVE SKILLS */}
      <section aria-labelledby="question-types-heading" className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            <Target className="h-4 w-4" />
            <span>Question Typology</span>
          </div>
          <h2 id="question-types-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Class 8 English Question Formats &amp; Mark Distribution
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            CBSE Class 8 question papers feature a calibrated blend of objective and subjective questions designed to evaluate diverse reading competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 p-5 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-bold text-xs">
              MCQ
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Multiple Choice (1 Mark)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              4 options evaluating precise recall, main idea identification, and detail discrimination. Requires careful reading of subtle distractors.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 p-5 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 font-bold text-xs">
              SAQ
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Short Answer (1–2 Marks)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Questions requiring 30–40 words. Answers must be formulated in the student's own words without copying whole sentences from the text.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 p-5 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 font-bold text-xs">
              VOC
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Vocabulary in Context</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Finding words in specific paragraphs that match a given meaning, finding antonyms/synonyms, or explaining figurative phrases.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 p-5 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 font-bold text-xs">
              INF
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Inference &amp; Title</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Testing higher-order deductions: suggesting suitable titles, explaining why an event occurred, or interpreting the author’s tone.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPLETE SAMPLE SOLVED PASSAGE */}
      <section id="sample-passage" aria-labelledby="sample-passage-heading" className="space-y-6 scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
            <BookMarked className="h-4 w-4" />
            <span>Interactive Solved Sample</span>
          </div>
          <h2 id="sample-passage-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Class 8 Sample Unseen Passage with Questions and Solutions
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            Below is an authentic CBSE-standard Class 8 unseen passage. Read the text carefully, attempt the questions, and toggle the answer key to inspect the exact marking scheme.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Passage Header */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Passage 1 (Discursive &bull; Class 8 Standard &bull; 360 Words)
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white mt-1">
                The Wood Wide Web: How Trees Communicate Beneath Our Feet
              </h3>
            </div>
            <span className="inline-flex items-center space-x-1 text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full self-start sm:self-auto">
              <Clock className="h-3.5 w-3.5" />
              <span>Recommended Time: 15 Mins</span>
            </span>
          </div>

          {/* Passage Body */}
          <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif bg-zinc-50/50 dark:bg-zinc-850/40 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <p>
              <strong>(1)</strong> For centuries, humans perceived forests as silent battlegrounds where towering trees competed ruthlessly for sunlight, soil nutrients, and water. However, groundbreaking discoveries in botanical science have shattered this solitary image. Deep beneath the forest floor lies a vast, interconnected biological network often dubbed the &ldquo;Wood Wide Web.&rdquo; This underground internet is forged through symbiotic relationships between tree roots and microscopic fungal threads known as mycorrhizae.
            </p>
            <p>
              <strong>(2)</strong> Rather than acting solely as selfish competitors, mature trees use this mycorrhizal web to nurture younger saplings growing in the shaded understory. Because young trees receive insufficient sunlight to carry out vigorous photosynthesis, elder trees—often termed &ldquo;mother trees&rdquo;—pump surplus carbon, sugars, and vital minerals through the fungal network directly into the saplings&rsquo; roots, dramatically enhancing their survival rate.
            </p>
            <p>
              <strong>(3)</strong> Beyond resource sharing, the network functions as an intricate early-warning alarm system. When an insect infestation strikes a particular tree, it synthesizes chemical warning signals and transmits them underground to neighboring trees. Upon receiving these biochemical alerts, neighboring trees immediately begin producing defensive enzymes and bitter tannins in their foliage, deterring the approaching pests before they can inflict severe damage.
            </p>
            <p>
              <strong>(4)</strong> This subterranean cooperation underscores the profound resilience of natural ecosystems. When modern forestry practices clear-cut large swathes of forest or remove ancient mother trees, the delicate mycorrhizal web collapses, rendering the entire forest vulnerable to disease and climatic extremes. Preserving these ancient communal connections is therefore essential for safeguarding global biodiversity in an era of rapid environmental change.
            </p>
          </div>

          {/* Questions Section */}
          <div className="space-y-4 pt-2">
            <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-emerald-600" />
              <span>Questions (Total: 10 Marks)</span>
            </h4>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Q1 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>1. What traditional belief about forests has modern botanical research challenged?</span>
                  <span className="text-xs font-mono text-zinc-500">[1 Mark]</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-650 dark:text-zinc-350">
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">A) Trees cannot survive in deep forest understories</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">B) Trees only compete ruthlessly without cooperating</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">C) Fungi are always destructive parasites on root systems</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">D) Older trees hinder the growth of young saplings</div>
                </div>
              </div>

              {/* Q2 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>2. How do &ldquo;mother trees&rdquo; help saplings survive in the shaded understory?</span>
                  <span className="text-xs font-mono text-zinc-500">[2 Marks]</span>
                </div>
                <p className="text-xs text-zinc-500 italic">Answer in 30–40 words based on Paragraph 2.</p>
              </div>

              {/* Q3 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>3. Explain how the mycorrhizal network acts as an early-warning alarm system during insect attacks.</span>
                  <span className="text-xs font-mono text-zinc-500">[2 Marks]</span>
                </div>
                <p className="text-xs text-zinc-500 italic">Answer in 30–40 words based on Paragraph 3.</p>
              </div>

              {/* Q4 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>4. What consequence does clear-cutting have on the forest ecosystem?</span>
                  <span className="text-xs font-mono text-zinc-500">[1 Mark]</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-650 dark:text-zinc-350">
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">A) It increases the number of mother trees</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">B) It causes the collapse of the fungal network and increases vulnerability</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">C) It accelerates photosynthesis in mature trees</div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800">D) It stops insect pests from spreading</div>
                </div>
              </div>

              {/* Q5 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>5. Vocabulary: Find words from the passage that mean:</span>
                  <span className="text-xs font-mono text-zinc-500">[2 Marks]</span>
                </div>
                <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-350">
                  <p><strong>(a)</strong> Mutually beneficial or interdependent (Paragraph 1)</p>
                  <p><strong>(b)</strong> The ability to recover quickly from difficulties or damage (Paragraph 4)</p>
                </div>
              </div>

              {/* Q6 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>6. Find an antonym in Paragraph 3 for the word &ldquo;attracting&rdquo; or &ldquo;encouraging&rdquo;.</span>
                  <span className="text-xs font-mono text-zinc-500">[1 Mark]</span>
                </div>
              </div>

              {/* Q7 */}
              <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-850/40 space-y-2">
                <div className="font-semibold text-zinc-900 dark:text-white flex justify-between">
                  <span>7. State whether the following statement is TRUE or FALSE:</span>
                  <span className="text-xs font-mono text-zinc-500">[1 Mark]</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                  &ldquo;Young saplings in the understory are able to carry out sufficient photosynthesis without any external carbon from older trees.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Toggle Answer Key Button */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowSampleAnswers(!showSampleAnswers)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm hover:bg-emerald-100 transition cursor-pointer"
            >
              {showSampleAnswers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showSampleAnswers ? "Hide Solved Answer Key" : "View Solved Answer Key & Marking Scheme"}</span>
            </button>

            <button
              onClick={onStartGenerator}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 cursor-pointer"
            >
              <span>Generate More Class 8 Passages</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Answer Key Dropdown / Expandable */}
          {showSampleAnswers && (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 font-display font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>CBSE Standard Marking Scheme &amp; Model Answers</span>
              </div>

              <div className="space-y-3 divide-y divide-emerald-200/60 dark:divide-emerald-800/60">
                <div className="pt-2">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q1 Answer: </span>
                  <span className="text-zinc-700 dark:text-zinc-300"><strong>B)</strong> Trees only compete ruthlessly without cooperating.</span>
                </div>

                <div className="pt-2 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q2 Model Answer (2 Marks): </span>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Because shaded saplings cannot photosynthesize adequately, mature &ldquo;mother trees&rdquo; pump surplus sugars, carbon, and essential minerals through the underground mycorrhizal fungal network directly into the saplings&rsquo; root systems, ensuring their survival.
                  </p>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 italic">Marking Scheme: 1 mark for mentioning insufficient photosynthesis; 1 mark for transfer of sugars/carbon via mycorrhizal network.</span>
                </div>

                <div className="pt-2 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q3 Model Answer (2 Marks): </span>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    When an insect attack occurs, the affected tree sends chemical warning signals through the mycorrhizal network. Neighboring trees receive this alert and promptly generate defensive enzymes and bitter tannins to repel the incoming insects.
                  </p>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 italic">Marking Scheme: 1 mark for transmitting chemical signals; 1 mark for producing defensive enzymes/tannins.</span>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q4 Answer: </span>
                  <span className="text-zinc-700 dark:text-zinc-300"><strong>B)</strong> It causes the collapse of the fungal network and increases vulnerability.</span>
                </div>

                <div className="pt-2 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q5 Vocabulary Answers: </span>
                  <p className="text-zinc-700 dark:text-zinc-300"><strong>(a)</strong> Symbiotic (Paragraph 1) &bull; <strong>(b)</strong> Resilience (Paragraph 4)</p>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q6 Antonym: </span>
                  <span className="text-zinc-700 dark:text-zinc-300"><strong>Deterring</strong> (Paragraph 3).</span>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-zinc-900 dark:text-white">Q7 True/False: </span>
                  <span className="text-zinc-700 dark:text-zinc-300"><strong>FALSE</strong> (Paragraph 2 states that young trees receive insufficient sunlight and depend on carbon pumped by elder trees).</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. PROVEN 5-STEP STRATEGY TO SCORE 20/20 */}
      <section aria-labelledby="strategy-heading" className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
            <Zap className="h-4 w-4" />
            <span>Mastery Technique</span>
          </div>
          <h2 id="strategy-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            5-Step Strategy for Solving Class 8 Unseen Passages
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            Follow this proven 5-step workflow during reading comprehension practice and school exams to maximize comprehension accuracy and avoid common traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="font-mono text-2xl font-extrabold text-emerald-600">01</div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Question Reconnaissance</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Read all questions <em>before</em> touching the passage. Underline key nouns, dates, and terms so your brain scans for them during reading.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="font-mono text-2xl font-extrabold text-emerald-600">02</div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Active First Read</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Skim the passage from start to finish at a steady pace to grasp the central theme, paragraph breakdown, and overall tone.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="font-mono text-2xl font-extrabold text-emerald-600">03</div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Target Scanning</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Match each question to its corresponding paragraph. Look for direct evidence and verify surrounding context before finalizing answers.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="font-mono text-2xl font-extrabold text-emerald-600">04</div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Own-Words Synthesis</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Draft answers in simple, grammatically sound sentences. Avoid copying verbatim sentences to secure full marks from examiners.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="font-mono text-2xl font-extrabold text-emerald-600">05</div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Vocabulary Check</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Substitute your chosen vocabulary word back into the original sentence to ensure the part of speech and tense match perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES CLASS 8 STUDENTS MAKE */}
      <section aria-labelledby="mistakes-heading" className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
            <AlertCircle className="h-4 w-4" />
            <span>Exam Pitfalls</span>
          </div>
          <h2 id="mistakes-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            6 Common Mistakes in Class 8 Comprehension &amp; How to Avoid Them
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Lifting Sentences Verbatim</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Copy-pasting 3 lines from the passage without rephrasing.<br />
              <strong>Fix:</strong> Identify the core point and write 1–2 direct sentences using your own vocabulary.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Answering from Prior Knowledge</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Using personal scientific or historical knowledge rather than passage facts.<br />
              <strong>Fix:</strong> All answers must be strictly grounded in the given passage text.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Confusing Synonyms &amp; Antonyms</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Providing a similar word when the question explicitly asked for an opposite.<br />
              <strong>Fix:</strong> Double-check whether the prompt requests a synonym (same) or antonym (opposite).
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Overwriting Short Answers</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Writing half-page paragraphs for a 1-mark or 2-mark question and wasting time.<br />
              <strong>Fix:</strong> Strictly adhere to 30–40 words limit per answer.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Ignoring Paragraph Numbers</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Searching the entire passage for a vocabulary word when paragraph 3 was specified.<br />
              <strong>Fix:</strong> Restrict your word search strictly to the cited paragraph number.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2.5">
            <div className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
              <span>&bull;</span>
              <span>Falling for MCQ Distractors</span>
            </div>
            <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed">
              <strong>Mistake:</strong> Choosing the first plausible-looking option without reading options C and D.<br />
              <strong>Fix:</strong> Read all 4 choices thoroughly; eliminate 2 obviously wrong distractors first.
            </p>
          </div>
        </div>
      </section>

      {/* 8. HOW COMPREVO AI WORKS FOR CLASS 8 */}
      <section aria-labelledby="features-heading" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-850 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
            <Sparkles className="h-4 w-4" />
            <span>AI Worksheet Engine</span>
          </div>
          <h2 id="features-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Why Class 8 Students &amp; Teachers Prefer Comprevo
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Generate customized, curriculum-compliant Class 8 English worksheets in under 5 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Unlimited Fresh Passages</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Never run out of practice material. Generate unique passages across Science, Nature, Indian Culture, AI, History, and Literature.
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">3-Tier Difficulty Scaling</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Easily adapt text complexity from foundational practice (Easy) to regular school exams (Medium) and English Olympiad training (Hard).
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600">
              <Printer className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">One-Click PDF Exports</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Export classroom-ready worksheets with student test sheets, separate answer keys, and vocabulary reference sections.
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600">
              <CheckSquare className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Instant AI Evaluation</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Students can solve tests directly in the browser and receive instantaneous scoring, rubrics, and conceptual feedback.
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600">
              <BookOpen className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">NCERT Vocabulary Alignment</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Passages integrate Lexile-rated vocabulary matching NCERT Honeydew and It So Happened reader benchmarks.
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Zero Paywalls &bull; 100% Free</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No credit cards, sign-ups, or limits. Free access for students, teachers, parents, and coaching institutes worldwide.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={onStartGenerator}
            className="inline-flex items-center justify-center space-x-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm px-8 py-3.5 transition shadow-sm hover:shadow cursor-pointer"
            id="btn-generate-class-8-comprehension-features"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Class 8 Worksheet Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 9. 15 FREQUENTLY ASKED QUESTIONS */}
      <section aria-labelledby="faqs-heading" className="space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
            <HelpCircle className="h-4 w-4" />
            <span>Common Questions</span>
          </div>
          <h2 id="faqs-heading" className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Frequently Asked Questions (Class 8 English Comprehension)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Everything you need to know about CBSE Class 8 English unseen passages, exam patterns, marks weightage, and preparation strategies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between space-x-4 cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition"
                aria-expanded={openFaq === idx}
              >
                <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
                  <span className="text-emerald-600 font-mono text-xs">{String(idx + 1).padStart(2, "0")}.</span>
                  <span>{faq.q}</span>
                </span>
                <ChevronRight
                  className={`h-4 w-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-90 text-emerald-600" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. INTERNAL LINKING & RESOURCE DIRECTORY */}
      <section aria-labelledby="resources-heading" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 id="resources-heading" className="font-display text-lg font-bold text-zinc-900 dark:text-white">
            Explore Comprevo English &amp; Data Comprehension Tools
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Access specialized reading modules, curriculum generators, and analytical reasoning worksheets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs">AI Comprehension Guide</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              Explore our core guide on generating passages and diagnostic assessments.
            </p>
            <a
              href="/comprehension-generator"
              onClick={(e) => {
                e.preventDefault();
                onOpenComprehensionGenerator();
              }}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>Explore AI Guide</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs">Reading Comprehension Generator</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              Create multi-grade reading worksheets with leveled difficulty and answer keys.
            </p>
            <a
              href="/reading-comprehension-generator"
              onClick={(e) => {
                e.preventDefault();
                onOpenReadingComprehensionGenerator();
              }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>Reading Tool</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs">Data Interpretation</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              Practice reading comprehension with bar graphs, pie charts, and data tables.
            </p>
            <a
              href="/data-interpretation"
              onClick={(e) => {
                e.preventDefault();
                onOpenDataInterpretation();
              }}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>Data Suite</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs">Comprevo Homepage</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              Return to the main dashboard to access your saved passage history and tests.
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>Comprevo Home</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION */}
      <section aria-labelledby="final-cta-heading" className="rounded-3xl border border-emerald-300 dark:border-emerald-700 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-12 text-white text-center space-y-6 shadow-md">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CBSE &bull; NCERT &bull; Class 8 English</span>
          </div>
          <h2 id="final-cta-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to Master Class 8 English Comprehension?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Generate custom unseen passages with questions, answers, and printable PDF worksheets in seconds. 100% Free.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartGenerator}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-[0.99] font-bold text-sm sm:text-base px-8 py-3.5 transition shadow cursor-pointer"
            id="btn-generate-class-8-comprehension-bottom"
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Generate Class 8 Comprehension</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
