import React, { useState, useEffect } from "react";
import { updateSEO, PAGE_SEO_REGISTRY } from "../utils/seo";
import { 
  Sparkles, ArrowRight, Play, CheckCircle2, TrendingUp, 
  GraduationCap, Users, Brain, BookOpen, Layers, 
  Award, Zap, Check, ChevronRight, HelpCircle, FileText, 
  ShieldCheck, Clock, BookMarked, Printer, Globe, 
  Lightbulb, Compass, Share2, Star
} from "lucide-react";

interface ComprehensionGeneratorLandingProps {
  onStartGenerator: () => void;
  onOpenDataInterpretation: () => void;
  onNavigateHome: () => void;
  onOpenReadingComprehensionGenerator?: () => void;
  onOpenClass8Comprehension?: () => void;
}

export default function ComprehensionGeneratorLanding({
  onStartGenerator,
  onOpenDataInterpretation,
  onNavigateHome,
  onOpenReadingComprehensionGenerator,
  onOpenClass8Comprehension,
}: ComprehensionGeneratorLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Set document title, canonical, and social meta tags dynamically for this SEO page
  useEffect(() => {
    updateSEO(PAGE_SEO_REGISTRY.comprehension_generator);
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      step: "01",
      title: "Select Grade & Board",
      desc: "Choose from Grade 6 to Grade 10 and select your curriculum (National Standard, NCERT/CBSE, ICSE, Cambridge, IB, or State Board).",
      icon: GraduationCap,
    },
    {
      step: "02",
      title: "Choose Topic or Genre",
      desc: "Pick from science, space, history, literature, nature, mystery, or type your own custom topic or reading prompt.",
      icon: BookOpen,
    },
    {
      step: "03",
      title: "Configure Difficulty & Questions",
      desc: "Customize difficulty (Easy, Medium, Challenging) and select question formats including MCQs, short answers, vocabulary checks, and grammar.",
      icon: Layers,
    },
    {
      step: "04",
      title: "Solve Interactively or Print",
      desc: "Practice online with instant AI feedback and score tracking, or print a beautifully formatted worksheet with a full answer key.",
      icon: Printer,
    },
  ];

  const benefits = [
    {
      title: "Instant AI Passage Generation",
      desc: "Create original, leveled reading passages in seconds without searching through outdated textbooks or static PDFs.",
      icon: Zap,
    },
    {
      title: "Curriculum-Aligned Standards",
      desc: "Tailored to NCERT/CBSE, ICSE, Cambridge, IB, and State Board English frameworks with precise grade-level vocabulary.",
      icon: ShieldCheck,
    },
    {
      title: "Adaptive 3-Tier Difficulty",
      desc: "Easily adjust between Easy, Medium, and Challenging reading levels to accommodate differentiated learning needs.",
      icon: TrendingUp,
    },
    {
      title: "9+ Diverse Reading Genres",
      desc: "Generate narrative stories, descriptive essays, scientific articles, historical accounts, persuasive debates, and literary excerpts.",
      icon: BookMarked,
    },
    {
      title: "Multi-Format Question Sets",
      desc: "Automatically formulate multiple-choice questions (MCQs), direct text questions, inferential analysis, and contextual vocabulary drills.",
      icon: FileText,
    },
    {
      title: "Instant Answer Key & Explanations",
      desc: "Every worksheet comes complete with exact text evidence citations and comprehensive answer rationales.",
      icon: CheckCircle2,
    },
    {
      title: "100% Free & No Sign-up Required",
      desc: "Completely open and free for students, teachers, and parents. Start creating comprehension worksheets immediately.",
      icon: Award,
    },
    {
      title: "Print-Ready & PDF Friendly",
      desc: "Export clean, distraction-free printable worksheets suitable for classroom quizzes, homework, and home study.",
      icon: Printer,
    },
    {
      title: "Integrated Data Interpretation",
      desc: "Generate analytical data charts, tables, and infographics alongside text passages for modern competitive exam readiness.",
      icon: Lightbulb,
    },
  ];

  const audiences = [
    {
      title: "For Students",
      badge: "Grade 6 to 10",
      icon: Users,
      points: [
        "Improve English reading speed, comprehension, and vocabulary skills.",
        "Practice with interactive quizzes and receive instant diagnostic feedback.",
        "Prepare confidently for school exams, board exams, and Olympiads.",
        "Explore engaging topics tailored to your personal interests and passions."
      ],
    },
    {
      title: "For Teachers",
      badge: "Classroom & Homework",
      icon: GraduationCap,
      points: [
        "Save 5+ hours every week creating custom reading tests and assignments.",
        "Differentiate reading materials easily for varying student ability levels.",
        "Print professional worksheets equipped with complete grading answer keys.",
        "Incorporate data interpretation and analytical passages seamlessly."
      ],
    },
    {
      title: "For Parents",
      badge: "Home Reading Routine",
      icon: Brain,
      points: [
        "Establish a productive daily 15-minute home reading and comprehension habit.",
        "Track your child's reading streaks, accuracy scores, and growth over time.",
        "Ensure content is age-appropriate, educational, and curriculum-aligned.",
        "Zero subscription fees or complicated setup required."
      ],
    },
    {
      title: "For Schools & Tutors",
      badge: "Tutoring & Test Prep",
      icon: BookOpen,
      points: [
        "Produce standardized diagnostic assessment material on demand.",
        "Address specific learning gaps in reading inference and vocabulary.",
        "Access diverse curriculum frameworks (CBSE, ICSE, Cambridge, IB).",
        "Enable interactive self-paced practice during coaching sessions."
      ],
    },
  ];

  const faqs = [
    {
      q: "What is an AI comprehension generator?",
      a: "An AI comprehension generator is an intelligent educational tool that uses natural language processing to instantly generate custom reading passages, targeted comprehension questions, vocabulary lists, and complete answer keys based on specified grade levels, topics, and curriculum standards."
    },
    {
      q: "How does Comprevo generate comprehension passages?",
      a: "Comprevo utilizes advanced AI models trained on educational curricula. When you select your grade level, curriculum board (like CBSE, ICSE, Cambridge, or IB), topic, and difficulty, Comprevo crafts a unique, human-like reading passage with balanced vocabulary, structured paragraphs, and accompanying questions."
    },
    {
      q: "Is Comprevo completely free to use?",
      a: "Yes, Comprevo is 100% free for students, teachers, parents, tutors, and schools. You can generate unlimited reading comprehension worksheets, solve interactive quizzes, and print materials without paying any fees or entering credit card details."
    },
    {
      q: "Which grade levels and classes does Comprevo support?",
      a: "Comprevo currently supports Grade 6, Grade 7, Grade 8, Grade 9, and Grade 10 (Class 6 to Class 10), with vocabulary, passage length, and question complexity calibrated specifically for each developmental stage."
    },
    {
      q: "What curriculum boards are available on Comprevo?",
      a: "Comprevo provides curriculum-aligned configurations for National Standard English, NCERT / CBSE, ICSE, Cambridge (IGCSE/Checkpoint), International Baccalaureate (IB MYP), and various State Boards."
    },
    {
      q: "Can teachers print or export worksheets for classroom use?",
      a: "Yes! Every generated passage can be printed directly or saved as a clean PDF worksheet. Teachers can choose to print the student version (passage with questions) or the complete teacher edition with answers and grading notes."
    },
    {
      q: "What types of comprehension questions are generated?",
      a: "Comprevo creates multiple question formats including multiple-choice questions (MCQs), direct text retrieval questions, inferential and analytical questions, vocabulary-in-context checks, and grammar identification exercises."
    },
    {
      q: "How does Comprevo help students improve their reading skills?",
      a: "By providing personalized passages on topics students love, Comprevo keeps reading engaging. The interactive solver mode provides instant feedback, hints, and explanations, helping students learn from mistakes and master critical comprehension strategies."
    },
    {
      q: "Can I generate comprehension passages on custom topics?",
      a: "Yes! In addition to popular curated categories (such as space exploration, world history, biodiversity, robotics, and environmental science), you can enter any custom topic or creative prompt you desire."
    },
    {
      q: "Do I need to sign up or create an account to use Comprevo?",
      a: "No registration is required to start generating and practicing worksheets. Comprevo saves your practice history and streaks locally in your browser so you can jump right in without barriers."
    },
    {
      q: "What is the Data Interpretation module?",
      a: "Comprevo's Data Interpretation module combines reading comprehension with visual data literacy. It generates passages accompanied by interactive charts, bar graphs, and data tables with analytical questions, testing students' ability to synthesize written and quantitative information."
    },
    {
      q: "How are student answers evaluated in interactive mode?",
      a: "In interactive solver mode, multiple-choice questions are scored instantly, while short-answer responses are evaluated by AI against key conceptual criteria, providing constructive feedback and scoring explanations."
    }
  ];

  // FAQ Schema JSON-LD for this specific page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://comprevo-comprehension-generator.vercel.app/comprehension-generator#faq",
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
        "name": "Free AI Comprehension Generator",
        "item": "https://comprevo-comprehension-generator.vercel.app/comprehension-generator"
      }
    ]
  };

  return (
    <div className="space-y-12 animate-fadeIn" id="comprehension-generator-page">
      
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
          Free AI Comprehension Generator
        </span>
      </nav>

      {/* 1. HERO SECTION */}
      <section aria-labelledby="hero-main-title" className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-emerald-50/60 via-white to-zinc-50/80 p-6 md:p-12 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-5 text-left">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free Educational AI Tool</span>
          </div>

          <h1 
            id="hero-main-title" 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]"
          >
            Free AI Comprehension Generator
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            Instantly create curriculum-aligned English reading passages, practice questions, and answer keys for <strong>Grade 6 to Grade 10</strong>. Designed for students, teachers, parents, and schools.
          </p>

          {/* Key Feature Badges */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-zinc-600 dark:text-zinc-350">
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Grades 6–10</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>CBSE, ICSE, Cambridge &amp; IB</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>MCQs &amp; Short Answers</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Printable PDF Worksheets</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3.5">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 transition cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
              id="cta-generate-comprehension-now"
              aria-label="Generate a Comprehension Now"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate a Comprehension Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenDataInterpretation}
              className="inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:text-zinc-100 font-semibold text-sm px-5 py-3.5 transition cursor-pointer"
              id="cta-try-data-interpretation"
              aria-label="Try Data Interpretation Generator"
            >
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Data Interpretation Practice</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION: WHAT IS AN AI COMPREHENSION GENERATOR? */}
      <section aria-labelledby="what-is-comprehension-generator" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Educational Overview
          </span>
          <h2 id="what-is-comprehension-generator" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            What is an AI Comprehension Generator?
          </h2>
        </div>

        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
          <p>
            An <strong>AI comprehension generator</strong> is a smart pedagogical tool powered by artificial intelligence that automatically creates original reading comprehension passages, tailored practice questions, vocabulary highlights, and detailed answer keys in just seconds.
          </p>
          <p>
            Traditional methods of finding reading comprehension worksheets require searching through dozens of textbook chapters or downloading generic PDF files that often don't match a student's exact grade level or interests. Comprevo solves this by analyzing curriculum requirements (such as <strong>NCERT / CBSE, ICSE, Cambridge, IB, and State Boards</strong>) and synthesizing age-appropriate reading passages across scientific, historical, literary, and real-world themes.
          </p>
          <p>
            Whether you need a quick 5-minute reading warm-up for a Grade 7 classroom, an in-depth analytical test for Grade 10 board exam preparation, or engaging bedtime reading practice at home, Comprevo delivers custom educational materials on demand.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 SIMPLE STEPS) */}
      <section aria-labelledby="how-it-works-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Simple 4-Step Process
          </span>
          <h2 id="how-it-works-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            How It Works: Create Comprehension in 4 Simple Steps
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Build custom reading comprehension exercises tailored to your exact learning needs in less than 30 seconds.
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
            <span>Start Step 1: Select Your Grade</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE COMPREVO? (AT LEAST 8 BENEFITS) */}
      <section aria-labelledby="why-choose-comprevo-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Powerful Educational Features
          </span>
          <h2 id="why-choose-comprevo-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Why Choose Comprevo as Your AI Comprehension Generator?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Comprevo combines pedagogical accuracy with AI technology to create engaging, reliable reading comprehension resources for classrooms and home study.
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

      {/* 5. WHO CAN USE IT? (STUDENTS, TEACHERS, PARENTS, SCHOOLS) */}
      <section aria-labelledby="who-can-use-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Target Audiences
          </span>
          <h2 id="who-can-use-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Who Can Use Comprevo AI Comprehension Generator?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Built specifically to solve reading and assessment challenges for everyone in the education ecosystem.
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

      {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ WITH 10+ QUESTIONS) */}
      <section id="faq-section" aria-labelledby="faq-main-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800 flex items-center space-x-2.5">
          <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Clear Answers
            </span>
            <h2 id="faq-main-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
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

      {/* 7. INTERNAL LINKS & CURRICULUM EXPLORATION */}
      <section aria-labelledby="curriculum-links-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Curriculum &amp; Grade Hubs
          </span>
          <h2 id="curriculum-links-heading" className="font-display text-lg font-bold text-zinc-900 dark:text-white">
            Explore Reading Comprehension by Grade &amp; Board
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs">
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">By Grade Level</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Grade 6 Reading Comprehension Worksheets
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Grade 7 English Comprehension Passages
                </a>
              </li>
              <li>
                <a
                  href="/class-8-comprehension"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenClass8Comprehension) onOpenClass8Comprehension();
                    else onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Grade 8 Reading Passages &amp; Questions
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Grade 9 &amp; 10 Board Exam Reading Prep
                </a>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">By Curriculum Board</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="/class-8-comprehension"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenClass8Comprehension) onOpenClass8Comprehension();
                    else onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  CBSE / NCERT Unseen Passages
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  ICSE English Language Comprehension
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Cambridge IGCSE &amp; Checkpoint English
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  IB MYP Language &amp; Literature Practice
                </a>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-white">Specialized Modules</h3>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="/reading-comprehension-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenReadingComprehensionGenerator) onOpenReadingComprehensionGenerator();
                    else onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Free Reading Comprehension Generator
                </a>
              </li>
              <li>
                <a
                  href="/class-8-comprehension"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenClass8Comprehension) onOpenClass8Comprehension();
                    else onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Class 8 English Comprehension Passages
                </a>
              </li>
              <li>
                <a
                  href="/data-interpretation"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenDataInterpretation();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Data Interpretation &amp; Chart Analysis
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Scientific &amp; Space Reading Passages
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartGenerator();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Historical &amp; Biographical Essays
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                  }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
                >
                  Comprevo Learning Dashboard (Home)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section aria-labelledby="final-generator-cta-heading" className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-8 sm:p-12 text-white text-center space-y-5 shadow-lg">
        <h2 id="final-generator-cta-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ready to Generate Your Reading Comprehension Worksheet?
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Create customized, curriculum-aligned reading passages, multiple-choice questions, and answer keys in seconds. 100% free with no sign-up required.
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-3.5">
          <button
            onClick={onStartGenerator}
            className="inline-flex items-center space-x-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm px-7 py-4 transition cursor-pointer shadow-md active:scale-[0.99]"
            id="cta-final-generate-now"
            aria-label="Generate a Comprehension Now"
          >
            <Sparkles className="h-4.5 w-4.5 text-emerald-600" />
            <span>Generate a Comprehension Now</span>
            <ArrowRight className="h-4 w-4 text-emerald-600" />
          </button>

          <button
            onClick={onOpenDataInterpretation}
            className="inline-flex items-center space-x-2 rounded-xl border border-emerald-300/40 bg-emerald-900/40 hover:bg-emerald-900/60 text-white font-semibold text-sm px-6 py-4 transition cursor-pointer"
            aria-label="Try Data Interpretation Module"
          >
            <TrendingUp className="h-4 w-4 text-emerald-200" />
            <span>Data Interpretation</span>
          </button>
        </div>
      </section>

    </div>
  );
}
