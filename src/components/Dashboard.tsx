import React, { useState, useEffect } from "react";
import { updateSEO, DEFAULT_PAGE_SEO } from "../utils/seo";
import { UserProfile, GeneratedPassage } from "../types";
import { getLocalDateString } from "../utils/streak";
import { 
  Sparkles, Calendar, BookOpen, Star, Clock, ArrowRight, Flame, 
  Award, ShieldAlert, CheckCircle2, ChevronRight, HelpCircle,
  Compass, Play, Trophy, TrendingUp, Zap, FileText, Check, 
  Target, GraduationCap, Users, Brain, BookMarked, Layers, HelpCircle as FaqIcon
} from "lucide-react";

interface DashboardProps {
  user: UserProfile;
  onStartFunnel: () => void;
  onSelectPassage: (passage: GeneratedPassage) => void;
  onRemoveFavorite: (id: string) => void;
  onOpenDataInterpretation: () => void;
  onOpenComprehensionGenerator?: () => void;
  onOpenReadingComprehensionGenerator?: () => void;
  onOpenClass8Comprehension?: () => void;
}

export default function Dashboard({
  user,
  onStartFunnel,
  onSelectPassage,
  onRemoveFavorite,
  onOpenDataInterpretation,
  onOpenComprehensionGenerator,
  onOpenReadingComprehensionGenerator,
  onOpenClass8Comprehension,
}: DashboardProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Find favorite passages from history list
  const favoritesList = user.history.filter((p) => user.favorites.includes(p.id));

  // Determine if today's goal is met (if they completed a worksheet today)
  const completedToday = (user.completedWorksheets || []).some(w => {
    return w.date === getLocalDateString() || w.timestamp === new Date().toLocaleDateString();
  });

  // Determine active class with most recently generated worksheet as single source of truth
  const activeClass = user.history && user.history.length > 0 
    ? user.history[0].config.academicLevel 
    : "";

  useEffect(() => {
    updateSEO(DEFAULT_PAGE_SEO);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const passageTypes = [
    { title: "Narrative", desc: "Engaging story-based passages that build imagination and character comprehension.", tag: "Storytelling" },
    { title: "Descriptive", desc: "Detailed sensory passages that help students visualize scenes, places, and objects.", tag: "Imagery" },
    { title: "Analytical", desc: "Thought-provoking texts that test logic, reasoning, and critical thinking skills.", tag: "Logic & Cause" },
    { title: "Informative", desc: "Fact-based articles explaining science, nature, technology, and real-world topics.", tag: "Factual" },
    { title: "Persuasive", desc: "Opinion and argument essays that teach students to evaluate viewpoints and claims.", tag: "Debate" },
    { title: "Literary", desc: "Excerpts from classic stories, poems, and prose to enrich English literature skills.", tag: "Prose & Drama" },
    { title: "Historical", desc: "Fascinating passages about important history events, famous leaders, and ancient cultures.", tag: "History" },
    { title: "Scientific", desc: "Explorations of space, biology, physics, and ecology written in accessible English.", tag: "STEM" },
    { title: "Custom AI Generated", desc: "Passages generated on any topic you choose, perfectly matched to grade level.", tag: "AI Powered" },
  ];

  const faqs = [
    {
      q: "What is an AI Reading Comprehension Generator?",
      a: "An AI Reading Comprehension Generator is a smart educational tool that uses artificial intelligence to create custom reading passages, practice questions, vocabulary lists, and answer keys in seconds."
    },
    {
      q: "How does Comprevo work as a free comprehension generator?",
      a: "Comprevo lets you choose your grade level (Grades 6–10), curriculum board (NCERT/CBSE, ICSE, Cambridge, IB, State Board), difficulty, and topic. Our AI generator creates a unique passage with tailored questions and an instant answer key for free."
    },
    {
      q: "How does Comprevo support daily reading comprehension practice?",
      a: "Students can engage in daily reading comprehension practice on topics like space, technology, history, or science and solve interactive questions with instant scoring feedback to build strong English skills."
    },
    {
      q: "Is Comprevo a good comprehension generator for teachers?",
      a: "Yes! As a dedicated comprehension generator for teachers, Comprevo enables educators to quickly generate printable classroom reading tests, homework sheets, grammar practice, and data interpretation graph worksheets with full answer keys."
    },
    {
      q: "How does Comprevo work as a comprehension generator for students?",
      a: "As an interactive comprehension generator for students, Comprevo allows learners to practice at their own pace with 3 difficulty tiers (Easy, Medium, Hard), contextual vocabulary definitions, and instant feedback."
    },
    {
      q: "Can I create comprehension questions automatically?",
      a: "Yes! Comprevo automatically creates multiple-choice questions (MCQs), short-answer questions, true/false items, vocabulary checks, and grammar questions with every passage."
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn" id="dashboard-container">
      
      {/* 1. HERO SECTION */}
      <section aria-labelledby="hero-title" className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-emerald-50/50 via-white to-zinc-50 p-6 md:p-8 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100/60 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md inline-block">
              Free AI Reading Comprehension Generator
            </span>
            <h1 id="hero-title" className="font-display text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              AI Reading Comprehension Generator for Fast, Smarter Learning
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
              Comprevo is a <strong>Free Comprehension Generator</strong> built for daily <strong>Reading Comprehension Practice</strong>. Whether you need a powerful <strong>Comprehension Generator for Teachers</strong> to create classroom worksheets or an interactive <strong>Comprehension Generator for Students</strong> to boost exam scores, generate custom passages and questions in seconds.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onStartFunnel}
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-3 transition cursor-pointer shadow-sm"
                id="cta-generate-comprehension"
                aria-label="Generate Comprehension"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Comprehension</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onStartFunnel}
                className="inline-flex items-center justify-center space-x-1.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-850 dark:border-zinc-700 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:text-zinc-100 font-semibold text-xs px-4 py-3 transition cursor-pointer"
                id="cta-start-free"
                aria-label="Start Free"
              >
                <Play className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600" />
                <span>Start Free</span>
              </button>

              <button
                onClick={onOpenDataInterpretation}
                className="inline-flex items-center justify-center space-x-1.5 rounded-xl border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-200 font-semibold text-xs px-4 py-3 transition cursor-pointer"
                id="cta-data-interpretation"
                aria-label="Try Data Interpretation"
              >
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Data Practice</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 space-y-2.5 bg-white dark:bg-zinc-850 p-4 rounded-xl border border-zinc-200 dark:border-zinc-750 max-w-xs shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
              <Trophy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Quick Dashboard Stats</span>
            </div>
            <div className="text-[11px] space-y-1.5 text-zinc-500 dark:text-zinc-400 font-mono">
              <div className="flex justify-between">
                <span>Streak:</span>
                <strong className="text-orange-600 dark:text-orange-400">{user.streak} Days 🔥</strong>
              </div>
              <div className="flex justify-between">
                <span>Worksheets Created:</span>
                <strong className="text-zinc-800 dark:text-zinc-200">{user.totalWorksheets}</strong>
              </div>
              <div className="flex justify-between">
                <span>Active Board:</span>
                <strong className="text-zinc-800 dark:text-zinc-200">{user.selectedBoard}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO DASHBOARD PRACTICE ROW */}
      <section aria-labelledby="recommended-practice-heading" className="grid gap-6 md:grid-cols-12">
        
        {/* CARD A: CONTINUE LEARNING */}
        <article className="md:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30">
                RECOMMENDED PRACTICE
              </span>
              <span className="text-[9px] font-mono text-zinc-400">CURRENT GRADE</span>
            </div>
            <h2 id="recommended-practice-heading" className="font-sans text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Recommended: Science &amp; Space Reading Comprehension Practice
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-md">
              Strengthen English skills with curriculum-aligned reading passages on astronomy, technology, and nature tailored for <span className="font-semibold">{user.selectedBoard}</span>.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-4">
            <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 text-xs">
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Level: Medium</span>
            </div>
            <button
              onClick={onStartFunnel}
              className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-850 px-4 py-2 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-850 transition cursor-pointer"
              aria-label="Start Practice Session"
            >
              <Play className="h-3 w-3 fill-emerald-600 text-emerald-600" />
              <span>Start Practice</span>
            </button>
          </div>
        </article>

        {/* CARD B: TODAY'S GOAL & QUICK TOPICS */}
        <article className="md:col-span-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-3.5">
            <span className="block text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
              TODAY'S PRACTICE GOAL
            </span>

            <div className="flex items-center space-x-4">
              <div className="relative flex items-center justify-center shrink-0">
                <div className={`h-14 w-14 rounded-full border-4 flex items-center justify-center font-mono text-xs font-bold ${
                  completedToday 
                    ? "border-emerald-600 text-emerald-600 bg-emerald-50/20 dark:border-emerald-500 dark:text-emerald-400" 
                    : "border-zinc-200 text-zinc-400 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-850"
                }`}>
                  {completedToday ? "100%" : "0%"}
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-sans text-xs font-bold text-zinc-850 dark:text-white">
                  {completedToday ? "Goal Completed!" : "Daily Reading Practice"}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed">
                  {completedToday 
                    ? "Great job! You completed your comprehension practice today." 
                    : "Complete 1 quick worksheet today to build your daily reading habit."}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4">
            <span className="block text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mb-2">
              Popular Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
                aria-label="Practice Astronomy topic"
              >
                🪐 Astronomy
              </button>
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
                aria-label="Practice Tech and Biotech topic"
              >
                🔬 Tech &amp; Biotech
              </button>
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
                aria-label="Practice History and Culture topic"
              >
                📜 History &amp; Culture
              </button>
            </div>
          </div>
        </article>

      </section>

      {/* 3. WHAT IS A READING COMPREHENSION GENERATOR? (Educational Deep Dive) */}
      <section aria-labelledby="what-is-comprehension-heading" className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-5">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
            Educational Guide &amp; Definition
          </span>
          <h2 id="what-is-comprehension-heading" className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            What is a Reading Comprehension Generator?
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
          <div className="space-y-3">
            <p>
              An <strong>AI Reading Comprehension Generator</strong> is an automated educational platform that creates original, grade-leveled reading passages alongside structured comprehension questions, vocabulary lists, and verified answer keys in seconds.
            </p>
            <p>
              Rather than searching through static PDFs or repetitive textbook materials, educators and students use Comprevo to generate fresh, contextual passages tailored to curriculum standards including <strong>CBSE, ICSE, NCERT, Cambridge IGCSE, IB MYP</strong>, and state boards.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              Comprevo builds essential cognitive reading skills categorized across <strong>Bloom's Taxonomy</strong> and Webb's Depth of Knowledge—ranging from direct factual recall and inference to vocabulary in context, author purpose, and critical argument analysis.
            </p>
            <p>
              Explore our specialized modules such as the{" "}
              <a
                href="/comprehension-generator"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenComprehensionGenerator) onOpenComprehensionGenerator();
                }}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                AI Comprehension Generator
              </a>
              , practice with the{" "}
              <a
                href="/reading-comprehension-generator"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenReadingComprehensionGenerator) onOpenReadingComprehensionGenerator();
                }}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Reading Comprehension Generator
              </a>
              , or test analytical charts with the{" "}
              <a
                href="/data-interpretation"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDataInterpretation();
                }}
                className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Data Interpretation Practice
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Simple 3-Step Walkthrough) */}
      <section aria-labelledby="how-it-works-heading" className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Step-by-Step Workflow
          </span>
          <h2 id="how-it-works-heading" className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            How Comprevo Works
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Create high-quality English reading comprehension worksheets and tests in four effortless steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Select Curriculum &amp; Board</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose your educational framework: CBSE, ICSE, Cambridge, IB, or State Board for authentic syllabus alignment.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Choose Grade &amp; Difficulty</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Select Grade 6 to Grade 10 and pick Easy, Medium, or Challenging reading difficulty to match learning readiness.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Customize Topic &amp; Format</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Pick science, space, history, literature, or custom topics. Choose MCQs, short answers, vocabulary checks, and grammar drills.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Solve Online or Print PDF</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Practice interactively with instant scoring and explanation rationales, or print clean PDF classroom worksheets with answer keys.
            </p>
          </div>
        </div>
      </section>

      {/* 5. POWERFUL FEATURES */}
      <section aria-labelledby="features-heading" className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
            Platform Capabilities
          </span>
          <h2 id="features-heading" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            Comprehensive Reading &amp; Comprehension Features
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Everything students, teachers, and parents need for rigorous reading comprehension practice and test preparation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Instant AI Passage Creation</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Generate original, high-quality reading passages on any academic topic in seconds with zero latency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Multi-Format Question Engine</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Includes Multiple Choice (MCQs), Short Answer, True/False, Contextual Vocabulary, and Grammar exercises.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Instant Answer Keys &amp; Evidence</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Every passage includes detailed explanations with exact paragraph quotes and text citations for self-evaluation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <BookMarked className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Interactive Vocabulary Glossary</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Highlight difficult vocabulary words with instant contextual definitions, parts of speech, and sample sentences.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FileText className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Print-Ready PDF Worksheets</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Export clean, distraction-free PDF worksheets formatted for classroom tests, homework, and homeschool portfolios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">Data Interpretation &amp; Charts</h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Practice reading and interpreting bar charts, line graphs, pie charts, and data tables with analytical questions.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS FOR TEACHERS & BENEFITS FOR STUDENTS */}
      <section aria-labelledby="benefits-audience-heading" className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Targeted Educational Value
          </span>
          <h2 id="benefits-audience-heading" className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            Benefits for Teachers and Students
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Teachers Card */}
          <div className="p-6 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-emerald-50/30 dark:bg-zinc-850/40 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300">
              <GraduationCap className="h-6 w-6" />
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">Benefits for Teachers &amp; Schools</h3>
            </div>
            <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 space-y-2.5 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Save 5+ Hours Weekly:</strong> Eliminate manual worksheet preparation by generating custom reading assessments instantly.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Differentiated Instruction:</strong> Create multi-level passages on identical topics to support diverse reading proficiencies in one class.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Standardized Exam Alignment:</strong> Match question formats to CBSE Class 8–10 English, ICSE board exams, and Cambridge assessments.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Complete Answer Keys:</strong> Receive thorough marking keys and grading rubrics ready for quick evaluation.</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="/class-8-comprehension"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenClass8Comprehension) onOpenClass8Comprehension();
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <span>Explore Class 8 English Comprehension Passages</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Students Card */}
          <div className="p-6 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-indigo-50/30 dark:bg-zinc-850/40 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300">
              <Users className="h-6 w-6" />
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">Benefits for Students &amp; Parents</h3>
            </div>
            <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 space-y-2.5 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Instant Feedback &amp; Explanations:</strong> Understand exactly why an answer is correct with immediate step-by-step guidance.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Vocabulary &amp; Grammar Mastery:</strong> Expand English vocabulary naturally through contextual definitions and syntax clues.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Daily Practice Habit:</strong> Track learning streaks and earn progress badges with just 15 minutes of daily reading practice.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Engaging Modern Topics:</strong> Read about astronomy, AI technology, wildlife biology, and thrilling historical mysteries.</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="/reading-comprehension-generator"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenReadingComprehensionGenerator) onOpenReadingComprehensionGenerator();
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Try Reading Comprehension Generator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECENT WORKSHEETS & USER HISTORY */}
      <section aria-label="Recent Worksheets and Statistics" className="grid gap-6 md:grid-cols-12">
        
        {/* LEFT PANEL: SAVED HISTORY & WORKSHEETS (Col-8) */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200">
                Your Generated Worksheets
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded dark:bg-zinc-800">
              {user.history.length} SAVED
            </span>
          </div>

          {user.history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-300 dark:text-zinc-700" />
              <h3 className="font-sans text-xs font-bold text-zinc-800 mt-3 dark:text-zinc-200">No generated worksheets yet</h3>
              <p className="text-[11px] text-zinc-450 mt-1 max-w-sm mx-auto leading-relaxed">
                Your generated reading comprehension worksheets will appear here. Click Generate Comprehension to start your first session.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {user.history.map((passage) => (
                <article
                  key={passage.id}
                  onClick={() => onSelectPassage(passage)}
                  className="group cursor-pointer rounded-xl border border-zinc-200 bg-white p-4.5 transition-all hover:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                        <span>{passage.timestamp}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{passage.config.difficulty}</span>
                      </div>
                      <h3 className="font-sans text-xs font-bold text-zinc-850 group-hover:text-emerald-600 transition dark:text-zinc-100 dark:group-hover:text-emerald-400 line-clamp-2">
                        {passage.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-medium pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                      <span className="truncate max-w-[120px]">{passage.config.board}</span>
                      <div className="flex items-center space-x-1 shrink-0 text-[9px] font-mono">
                        <span>⏱ {passage.estimatedReadingTime}m</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: STATS & STARRED ITEMS (Col-4) */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Achievements Card */}
          <article className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5 border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Learning Progress</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Total Worksheets</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">{user.totalWorksheets}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Daily Streak</span>
                <span className="font-mono font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                  {user.streak} Days
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Best Streak</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{user.highestStreak || 0} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span className="text-zinc-500 dark:text-zinc-400">Grade Level</span>
                <span className="font-sans font-bold text-zinc-800 dark:text-zinc-100">{activeClass || "Grade 8"}</span>
              </div>
            </div>
          </article>

          {/* Starred Passages Card */}
          <article className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5 border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
              <span>Starred Passages</span>
            </h3>

            {favoritesList.length === 0 ? (
              <div className="text-center py-6 text-zinc-400">
                <Star className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                <p className="text-[10px] text-zinc-550 dark:text-zinc-400 mt-2 leading-relaxed">
                  Star any passage to save it here for quick review anytime.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {favoritesList.map((passage) => (
                  <div
                    key={passage.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-150 p-2.5 dark:border-zinc-800 dark:bg-zinc-850/40"
                  >
                    <div 
                      onClick={() => onSelectPassage(passage)}
                      className="cursor-pointer flex-grow truncate mr-2"
                    >
                      <span className="block text-xs font-bold text-zinc-800 truncate dark:text-zinc-200 hover:text-emerald-600 transition">
                        {passage.title}
                      </span>
                      <span className="block text-[9px] font-mono text-zinc-400">
                        {passage.config.academicLevel} • {passage.config.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveFavorite(passage.id)}
                      className="text-amber-500 hover:text-zinc-450 transition text-sm px-1.5 cursor-pointer"
                      title="Remove Star"
                      aria-label="Remove Star"
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            )}
          </article>

        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq" aria-labelledby="faq-heading" className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800 flex items-center space-x-2">
          <FaqIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Everything You Need To Know
            </span>
            <h2 id="faq-heading" className="font-display text-xl font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 flex items-center justify-between font-semibold text-xs text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition cursor-pointer"
                aria-expanded={openFaq === index}
              >
                <span>{faq.q}</span>
                <ChevronRight className={`h-4 w-4 text-zinc-400 transition-transform ${openFaq === index ? "rotate-90 text-emerald-600" : ""}`} />
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. POPULAR AI TOOLS */}
      <section aria-labelledby="popular-ai-tools-heading" className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Featured Education Suite
            </span>
            <h2 id="popular-ai-tools-heading" className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Popular AI Tools &amp; Specialized Generators
            </h2>
          </div>
          <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-1 rounded-full">
            <Sparkles className="h-3 w-3" />
            <span>100% Free</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Free AI Comprehension Generator */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50/40 via-white to-zinc-50/60 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 p-6 flex flex-col justify-between space-y-5 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition shadow-sm">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  AI Powered
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  Free AI Comprehension Generator
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
                  Generate high-quality reading comprehension passages, vocabulary lists, and questions with instant answer keys.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span>CBSE &amp; ICSE</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Answer Keys</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/comprehension-generator"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenComprehensionGenerator) onOpenComprehensionGenerator();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 transition cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
                id="btn-open-comprehension-generator-tool"
                aria-label="Open Tool: Free AI Comprehension Generator"
              >
                <span>Open AI Guide</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Free Reading Comprehension Generator */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-indigo-50/40 via-white to-zinc-50/60 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 p-6 flex flex-col justify-between space-y-5 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition shadow-sm">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                  Grades 6–10
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  Reading Comprehension Generator
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
                  Create leveled reading passages with multi-tier difficulty, question variety, and printable worksheets.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  <span>3-Tier Difficulty</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Printable PDF</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/reading-comprehension-generator"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenReadingComprehensionGenerator) onOpenReadingComprehensionGenerator();
                  else if (onOpenComprehensionGenerator) onOpenComprehensionGenerator();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 transition cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
                id="btn-open-reading-comprehension-generator-tool"
                aria-label="Open Tool: Free Reading Comprehension Generator"
              >
                <span>Open Reading Tool</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Data Interpretation & Chart Analysis */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-teal-50/40 via-white to-zinc-50/60 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 p-6 flex flex-col justify-between space-y-5 hover:border-teal-300 dark:hover:border-teal-700/60 transition shadow-sm">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-teal-100 dark:bg-teal-950/80 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-300">
                  <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full">
                  Visual Data Literacy
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  Data Interpretation Generator
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
                  Create analytical passages with interactive bar charts, data tables, and quantitative reasoning questions.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                  <span>Bar Charts &amp; Tables</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                  <Check className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                  <span>Interactive Practice</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/data-interpretation"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDataInterpretation();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-750 dark:text-zinc-100 font-semibold text-xs sm:text-sm px-4 py-2.5 transition cursor-pointer shadow-sm hover:shadow"
                id="btn-open-data-interpretation-tool"
                aria-label="Open Tool: Data Interpretation Generator"
              >
                <span>Open Data Tool</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Directory & Quick Links Section */}
      <nav aria-label="Comprevo Quick Navigation" className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-2 font-mono uppercase text-[10px] tracking-wider text-emerald-600 dark:text-emerald-400">
              Reading Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/comprehension-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenComprehensionGenerator) onOpenComprehensionGenerator();
                  }}
                  className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition"
                >
                  AI Comprehension Generator
                </a>
              </li>
              <li>
                <a
                  href="/reading-comprehension-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenReadingComprehensionGenerator) onOpenReadingComprehensionGenerator();
                  }}
                  className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition"
                >
                  Reading Comprehension Generator
                </a>
              </li>
              <li>
                <a
                  href="/class-8-comprehension"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenClass8Comprehension) onOpenClass8Comprehension();
                  }}
                  className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition"
                >
                  Class 8 English Comprehension
                </a>
              </li>
              <li>
                <a
                  href="/generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartFunnel();
                  }}
                  className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition"
                >
                  Worksheet Builder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-2 font-mono uppercase text-[10px] tracking-wider text-teal-600 dark:text-teal-400">
              Quantitative
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/data-interpretation"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenDataInterpretation();
                  }}
                  className="text-zinc-600 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition"
                >
                  Data Interpretation Generator
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDataInterpretation}
                  className="text-zinc-600 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Chart &amp; Table Analysis
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-2 font-mono uppercase text-[10px] tracking-wider text-zinc-500">
              Curriculum Boards
            </h4>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>CBSE Class 6–10</li>
              <li>ICSE Reading Practice</li>
              <li>Cambridge (IGCSE / Checkpoint)</li>
              <li>International Baccalaureate (IB)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-2 font-mono uppercase text-[10px] tracking-wider text-zinc-500">
              Features
            </h4>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>Automatic Grading &amp; Rubrics</li>
              <li>Print-Ready PDF Exports</li>
              <li>Interactive Student Solver</li>
              <li>No Registration Required</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 10. FINAL CALL TO ACTION */}
      <section aria-labelledby="final-cta-heading" className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white text-center space-y-4 shadow-md">
        <h2 id="final-cta-heading" className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Ready to Start Your Reading Comprehension Practice?
        </h2>
        <p className="text-xs md:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Join thousands of students and teachers using Comprevo's <strong>Free Comprehension Generator</strong> to create custom reading passages, questions, and data graphs in seconds.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={onStartFunnel}
            className="inline-flex items-center space-x-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs px-6 py-3.5 transition cursor-pointer shadow-sm"
            id="cta-try-comprevo-now"
            aria-label="Try Comprevo Now"
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Try Comprevo Now</span>
            <ArrowRight className="h-4 w-4 text-emerald-600" />
          </button>

          <button
            onClick={onOpenDataInterpretation}
            className="inline-flex items-center space-x-2 rounded-xl border border-emerald-300/40 bg-emerald-800/40 hover:bg-emerald-800/60 text-white font-semibold text-xs px-5 py-3.5 transition cursor-pointer"
            aria-label="Try Data Interpretation Generator"
          >
            <TrendingUp className="h-4 w-4 text-emerald-200" />
            <span>Data Interpretation</span>
          </button>
        </div>
      </section>

    </div>
  );
}

