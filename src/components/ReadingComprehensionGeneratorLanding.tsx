import React, { useState, useEffect } from "react";
import { 
  Sparkles, ArrowRight, Play, CheckCircle2, TrendingUp, 
  GraduationCap, Users, Brain, BookOpen, Layers, 
  Award, Zap, Check, ChevronRight, HelpCircle, FileText, 
  ShieldCheck, Clock, BookMarked, Printer, Globe, 
  Lightbulb, Compass, Share2, Star, CheckSquare, Target
} from "lucide-react";

interface ReadingComprehensionGeneratorLandingProps {
  onStartGenerator: () => void;
  onOpenComprehensionGenerator: () => void;
  onOpenClass8Comprehension?: () => void;
  onOpenDataInterpretation: () => void;
  onNavigateHome: () => void;
}

export default function ReadingComprehensionGeneratorLanding({
  onStartGenerator,
  onOpenComprehensionGenerator,
  onOpenClass8Comprehension,
  onOpenDataInterpretation,
  onNavigateHome,
}: ReadingComprehensionGeneratorLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Set document title and meta description dynamically for this SEO page
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Free Reading Comprehension Generator | Comprevo";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Create reading comprehension passages with questions instantly for any grade using Comprevo."
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

  const steps = [
    {
      step: "01",
      title: "Select Grade Level & Board",
      desc: "Choose from Grade 6 to Grade 10 and select your curriculum framework (CBSE / NCERT, ICSE, Cambridge, IB MYP, or State Boards).",
      icon: GraduationCap,
    },
    {
      step: "02",
      title: "Choose Topic or Reading Theme",
      desc: "Select from science, history, space, literature, nature, mystery, or enter your own custom reading topic or custom prompt.",
      icon: BookOpen,
    },
    {
      step: "03",
      title: "Configure Difficulty & Question Types",
      desc: "Fine-tune reading difficulty (Easy, Medium, Challenging) and customize questions across MCQs, short answers, and vocabulary drills.",
      icon: Layers,
    },
    {
      step: "04",
      title: "Generate, Practice or Print",
      desc: "Solve worksheets interactively with real-time AI scoring, or export a formatted, printable PDF worksheet with a full answer key.",
      icon: Printer,
    },
  ];

  const benefits = [
    {
      title: "Instant Leveled Passage Generation",
      desc: "Generate curriculum-aligned reading passages calibrated to exact grade-level vocabulary and Lexile reading ranges.",
      icon: Zap,
    },
    {
      title: "Comprehensive Question Formats",
      desc: "Automatically produce multiple-choice questions, direct text retrieval, inferential analysis, and contextual vocabulary exercises.",
      icon: FileText,
    },
    {
      title: "Standards & Board Alignment",
      desc: "Tailored to national and international curricula including NCERT/CBSE, ICSE, Cambridge IGCSE, IB MYP, and State Boards.",
      icon: ShieldCheck,
    },
    {
      title: "Adaptive 3-Tier Difficulty",
      desc: "Differentiate instruction seamlessly with Easy, Medium, and Challenging reading tiers to match every student's learning stage.",
      icon: TrendingUp,
    },
    {
      title: "Full Answer Keys & Text Evidence",
      desc: "Every passage includes detailed answer keys, explanation rationales, and exact paragraph evidence citations for easy grading.",
      icon: CheckCircle2,
    },
    {
      title: "Print-Ready PDF Worksheets",
      desc: "Export clean, distraction-free printable worksheets suitable for classroom tests, homework assignments, and independent study.",
      icon: Printer,
    },
    {
      title: "100% Free With Zero Paywalls",
      desc: "Completely open for students, teachers, tutors, and parents with unlimited generations and no credit card required.",
      icon: Award,
    },
    {
      title: "Interactive Solver with AI Feedback",
      desc: "Students can complete worksheets online with immediate scoring, conceptual feedback, and progress streak tracking.",
      icon: CheckSquare,
    },
    {
      title: "Wide Variety of Literary Genres",
      desc: "Explore narrative fiction, expository non-fiction, scientific essays, biographical articles, poetry, and persuasive debates.",
      icon: BookMarked,
    },
  ];

  const audiences = [
    {
      title: "For Students",
      badge: "Grades 6–10",
      icon: Users,
      points: [
        "Strengthen reading speed, critical comprehension, and vocabulary mastery.",
        "Practice with interactive quizzes and receive instant diagnostic explanations.",
        "Build exam readiness for school tests, board assessments, and Olympiads.",
        "Read engaging passages tailored to your personal interests and hobbies."
      ],
    },
    {
      title: "For Teachers",
      badge: "Classroom & Tests",
      icon: GraduationCap,
      points: [
        "Save hours creating custom reading passages, quizzes, and homework sheets.",
        "Differentiate reading levels across diverse student abilities in seconds.",
        "Print professional worksheets with complete grading rubrics and answer keys.",
        "Assess comprehension skills across literal, inferential, and evaluative levels."
      ],
    },
    {
      title: "For Parents",
      badge: "Home Practice",
      icon: Brain,
      points: [
        "Establish a fun and structured 15-minute daily reading routine at home.",
        "Track reading growth, consistency streaks, and accuracy over time.",
        "Provide age-appropriate, safe, and academically rigorous reading content.",
        "Enjoy full free access without subscription fees or hidden barriers."
      ],
    },
    {
      title: "For Tutors & Academies",
      badge: "Diagnostic Prep",
      icon: Target,
      points: [
        "Produce standardized reading diagnostic assessments on demand.",
        "Target specific comprehension weaknesses such as inference or tone analysis.",
        "Support diverse curricula (CBSE, ICSE, Cambridge, and IB) effortlessly.",
        "Conduct interactive guided reading practice during coaching sessions."
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the Free Reading Comprehension Generator on Comprevo?",
      a: "Comprevo's Free Reading Comprehension Generator is an AI-powered educational tool designed to instantly create leveled reading passages, comprehension questions, vocabulary builders, and complete answer keys tailored for Grade 6 to Grade 10 students across major educational boards."
    },
    {
      q: "How do I create a reading comprehension worksheet?",
      a: "Creating a worksheet takes less than 30 seconds: simply select your grade level (Class 6 to 10), choose your curriculum board (such as CBSE, ICSE, Cambridge, or IB), pick a reading topic or enter a custom prompt, choose your difficulty, and click generate. You can then practice online or print as a PDF."
    },
    {
      q: "Is Comprevo completely free to use?",
      a: "Yes! Comprevo is 100% free with no hidden fees, subscriptions, or credit card requirements. You can generate unlimited reading comprehension passages, solve interactive quizzes, and print worksheets anytime."
    },
    {
      q: "Which grade levels are supported?",
      a: "Comprevo supports Grade 6, Grade 7, Grade 8, Grade 9, and Grade 10. Passages, sentence structures, vocabulary lists, and question complexities are specifically calibrated to each grade's cognitive and curriculum expectations."
    },
    {
      q: "What question types are included in each comprehension worksheet?",
      a: "Every worksheet includes a balanced mix of multiple-choice questions (MCQs), direct text retrieval questions, analytical and inferential questions, vocabulary in context checks, and grammar/syntax identification tasks."
    },
    {
      q: "Can I generate passages on any topic or subject?",
      a: "Yes! You can choose from popular themes like space exploration, world history, biodiversity, artificial intelligence, and literature, or type your own custom topic or creative prompt to generate a tailored passage."
    },
    {
      q: "Can teachers print worksheets for classroom assignments?",
      a: "Yes. Comprevo provides clean, printer-friendly PDF worksheets. Teachers can print the student worksheet alone or include the complete answer key and evidence breakdown for grading."
    },
    {
      q: "How does the interactive solver work?",
      a: "In interactive solver mode, students can read the passage, answer questions directly in the browser, receive instant evaluation and explanations, and track their scores and daily reading streaks."
    },
    {
      q: "Which curriculum standards and boards are covered?",
      a: "Comprevo is aligned with National Standard English, NCERT / CBSE, ICSE, Cambridge Assessment International Education (IGCSE / Checkpoint), International Baccalaureate (IB MYP), and State Education Boards."
    },
    {
      q: "How does this compare to standard textbook passages?",
      a: "Unlike static textbook passages, Comprevo generates fresh, original, and engaging content aligned with contemporary topics and student interests, preventing rote memorization and encouraging genuine comprehension."
    }
  ];

  // FAQ Schema JSON-LD for this specific page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://comprevo-comprehension-generator.vercel.app/reading-comprehension-generator#faq",
    "mainEntity": faqs.map(faq => ({
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
        "name": "Free Reading Comprehension Generator",
        "item": "https://comprevo-comprehension-generator.vercel.app/reading-comprehension-generator"
      }
    ]
  };

  return (
    <div className="space-y-12 animate-fadeIn" id="reading-comprehension-generator-page">
      
      {/* Schema.org FAQPage and Breadcrumb Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center space-x-2">
        <button
          onClick={onNavigateHome}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="h-3 w-3 text-zinc-400" />
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          Free Reading Comprehension Generator
        </span>
      </nav>

      {/* 1. HERO SECTION */}
      <section aria-labelledby="hero-main-heading" className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-emerald-50/60 via-white to-zinc-50/80 p-6 md:p-12 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-5 text-left">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>AI-Powered Reading Worksheets</span>
          </div>

          {/* H1 Heading */}
          <h1 
            id="hero-main-heading" 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]"
          >
            Free Reading Comprehension Generator
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            Create reading comprehension passages with questions instantly for any grade using Comprevo. Calibrated for <strong>Grade 6 through Grade 10</strong> across CBSE, ICSE, Cambridge, and IB curricula.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-zinc-600 dark:text-zinc-350">
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Grades 6–10</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>NCERT, CBSE, ICSE &amp; IB</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Questions + Answer Keys</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Printable &amp; Interactive</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3.5">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 transition cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
              id="cta-generate-reading-comprehension-hero"
              aria-label="Generate Reading Comprehension"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Reading Comprehension</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenComprehensionGenerator}
              className="inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:text-zinc-100 font-semibold text-sm px-5 py-3.5 transition cursor-pointer"
              id="cta-view-comprehension-guide"
              aria-label="View AI Comprehension Generator Overview"
            >
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>AI Comprehension Overview</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SIMPLE INTRODUCTION */}
      <section aria-labelledby="intro-reading-comprehension-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            About The Tool
          </span>
          <h2 id="intro-reading-comprehension-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Instant Reading Comprehension Passages &amp; Question Sets
          </h2>
        </div>

        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
          <p>
            Comprevo’s <strong>Free Reading Comprehension Generator</strong> empowers educators, students, and parents to instantly produce high-quality, level-appropriate reading materials tailored to individual learning goals.
          </p>
          <p>
            Instead of spending hours searching through outdated workbooks or static PDFs, you can generate fresh, engaging reading passages complete with targeted comprehension questions, vocabulary builders, and full answer keys with text citations in just a few clicks.
          </p>
          <p>
            Every worksheet is crafted to adhere to rigorous academic benchmarks—including <strong>CBSE, ICSE, Cambridge, and IB frameworks</strong>—ensuring that students develop critical thinking, inferential reasoning, and vocabulary mastery across diverse topics.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section aria-labelledby="how-it-works-reading-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Step-by-Step Guide
          </span>
          <h2 id="how-it-works-reading-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            How It Works: 4 Simple Steps to Your Custom Worksheet
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Generate customized reading comprehension exercises tailored to your exact learning level in seconds.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-850/40 flex flex-col justify-between space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Step {item.step}
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onStartGenerator}
            className="inline-flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-3 transition cursor-pointer shadow-sm"
          >
            <span>Start Generator: Select Grade &amp; Board</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 4. BENEFITS (AT LEAST 8 BENEFITS) */}
      <section aria-labelledby="benefits-reading-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Core Advantages
          </span>
          <h2 id="benefits-reading-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Benefits of Comprevo Reading Comprehension Generator
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Designed to save educators time and accelerate student reading achievement with pedagogical rigor.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div 
                key={i} 
                className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/30 hover:border-emerald-300 dark:hover:border-emerald-800/60 transition space-y-2.5"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {b.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHO CAN USE IT */}
      <section aria-labelledby="who-can-use-reading-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Audience Breakdown
          </span>
          <h2 id="who-can-use-reading-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Who Can Use the Reading Comprehension Generator?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Tailored learning and assessment solutions for every stakeholder in education.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-850/40 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded">
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    {aud.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {aud.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (10 FAQS) */}
      <section id="faq-section" aria-labelledby="faq-reading-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800 flex items-center space-x-2.5">
          <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Got Questions?
            </span>
            <h2 id="faq-reading-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition cursor-pointer"
                aria-expanded={openFaq === index}
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronRight 
                  className={`h-4 w-4 text-zinc-400 transition-transform shrink-0 ${
                    openFaq === index ? "rotate-90 text-emerald-600" : ""
                  }`} 
                />
              </button>
              {openFaq === index && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900 font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERNAL LINKS & RELATED PAGES */}
      <section aria-labelledby="internal-links-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Navigation Hubs
          </span>
          <h2 id="internal-links-heading" className="font-display text-lg font-bold text-zinc-900 dark:text-white">
            Explore Related Comprevo Tools &amp; Curricula
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs">
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">Main AI Tools</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <button onClick={onNavigateHome} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Comprevo Learning Dashboard (Home)
                </button>
              </li>
              <li>
                <button onClick={onOpenComprehensionGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Free AI Comprehension Generator
                </button>
              </li>
              <li>
                <button onClick={onOpenDataInterpretation} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Data Interpretation &amp; Chart Practice
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Interactive Passage Generator
                </button>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">Grade-Level Resources</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Grade 6 Reading Comprehension
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Grade 7 English Passages &amp; MCQs
                </button>
              </li>
              <li>
                <button onClick={onOpenClass8Comprehension || onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Grade 8 Literature &amp; CBSE Passages
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Grade 9 &amp; 10 Board Assessment Prep
                </button>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">Curriculum Boards</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  CBSE / NCERT Unseen Passages
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  ICSE English Comprehension Worksheets
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  Cambridge IGCSE Reading Skills
                </button>
              </li>
              <li>
                <button onClick={onStartGenerator} className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer">
                  IB MYP Language &amp; Literature Practice
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section aria-labelledby="final-reading-cta-heading" className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-8 sm:p-12 text-white text-center space-y-5 shadow-lg">
        <h2 id="final-reading-cta-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ready to Generate Your Reading Comprehension?
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Create leveled reading passages, multiple-choice questions, and answer keys in seconds for any grade. 100% free with no sign-up required.
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-3.5">
          <button
            onClick={onStartGenerator}
            className="inline-flex items-center space-x-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm px-7 py-4 transition cursor-pointer shadow-md active:scale-[0.99]"
            id="cta-final-generate-reading-comprehension"
            aria-label="Generate Reading Comprehension"
          >
            <Sparkles className="h-4.5 w-4.5 text-emerald-600" />
            <span>Generate Reading Comprehension</span>
            <ArrowRight className="h-4 w-4 text-emerald-600" />
          </button>

          <button
            onClick={onOpenComprehensionGenerator}
            className="inline-flex items-center space-x-2 rounded-xl border border-emerald-300/40 bg-emerald-900/40 hover:bg-emerald-900/60 text-white font-semibold text-sm px-6 py-4 transition cursor-pointer"
            aria-label="Explore AI Comprehension Generator"
          >
            <BookOpen className="h-4 w-4 text-emerald-200" />
            <span>Comprehension Overview</span>
          </button>
        </div>
      </section>

    </div>
  );
}
