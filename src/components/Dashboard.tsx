import React, { useState } from "react";
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
}

export default function Dashboard({
  user,
  onStartFunnel,
  onSelectPassage,
  onRemoveFavorite,
  onOpenDataInterpretation,
  onOpenComprehensionGenerator,
  onOpenReadingComprehensionGenerator,
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
      q: "What is an AI comprehension generator?",
      a: "An AI comprehension generator is a smart educational tool that uses artificial intelligence to create custom reading passages, practice questions, vocabulary lists, and answer keys in seconds."
    },
    {
      q: "How does Comprevo work?",
      a: "Comprevo lets you choose your grade level, curriculum board (NCERT/CBSE, ICSE, Cambridge, IB, State Board), difficulty, and topic. Our AI generator then creates a unique reading passage with tailored questions and an instant answer key."
    },
    {
      q: "Is Comprevo free to use?",
      a: "Yes! Comprevo is 100% free for students, teachers, parents, and tutors. You can create unlimited reading comprehension worksheets with no subscription required."
    },
    {
      q: "Can teachers use Comprevo for classroom worksheets?",
      a: "Absolutely! Teachers can use Comprevo to generate printable reading tests, homework sheets, grammar practice, and data interpretation graph worksheets for Grade 6 through Grade 10."
    },
    {
      q: "Can students practice reading comprehension independently?",
      a: "Yes! Students can pick any topic they love—like space, history, or fantasy—and solve interactive questions with instant feedback to improve their English skills."
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
              Read Better. Comprehend Faster. Excel in English.
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
              Comprevo is a free <strong>AI Reading Comprehension Generator</strong> for students, teachers, and parents. Instantly create tailored English reading passages, practice questions, and data graphs for Grade 6–10.
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
              Recommended: Science &amp; Space Reading Practice
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-md">
              Improve your reading comprehension skills with engaging passages on astronomy, biology, space exploration, and environmental science aligned with <span className="font-semibold">{user.selectedBoard}</span>.
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
                  {completedToday ? "Goal Completed!" : "Daily Practice Goal"}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed">
                  {completedToday 
                    ? "Great job! You finished a practice worksheet today." 
                    : "Complete at least 1 worksheet today to keep your streak going!"}
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

      {/* 3. WHY CHOOSE COMPREVO */}
      <section aria-labelledby="why-choose-heading" className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Smart Reading Comprehension
          </span>
          <h2 id="why-choose-heading" className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            Why Choose Comprevo as Your AI Reading Tool?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Finding high-quality, grade-appropriate reading passages with good questions takes hours. Comprevo solves this by generating instant, curriculum-aligned English comprehension passages and worksheets in seconds.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs text-zinc-900 dark:text-white">Instant AI Generation</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Create new reading comprehension stories and question sets instantly without searching for PDFs or textbooks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs text-zinc-900 dark:text-white">Curriculum Aligned</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Matches National Standard, NCERT / CBSE, ICSE, Cambridge, IB, and State Board English standards for Grades 6 through 10.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Target className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs text-zinc-900 dark:text-white">Adaptive Difficulty</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose Easy, Medium, or Hard difficulty to match every student's exact reading speed and vocabulary level.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-xs text-zinc-900 dark:text-white">100% Free &amp; Printable</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Solve worksheets online or print clean PDF-friendly pages for homework, exams, and classroom practice.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TYPES OF COMPREHENSION PASSAGES AVAILABLE */}
      <section aria-labelledby="comprehension-types-heading" className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Diverse Reading Genres
            </span>
            <h2 id="comprehension-types-heading" className="font-display text-xl font-bold text-zinc-900 dark:text-white">
              Types of Comprehension Passages You Can Create
            </h2>
          </div>
          <button
            onClick={onStartFunnel}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Explore All Genres</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {passageTypes.map((type, i) => (
            <div key={i} className="p-3.5 rounded-lg border border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/30 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-zinc-900 dark:text-white">{type.title} Passages</h3>
                <span className="text-[9px] font-mono bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
                  {type.tag}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                {type.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section aria-labelledby="how-it-works-heading" className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Simple 3-Step Process
          </span>
          <h2 id="how-it-works-heading" className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            How the Comprevo Reading Comprehension Generator Works
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Select Your Grade &amp; Board</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Pick your grade level (Grade 6 to 10) and curriculum board. Choose a topic like space, biology, history, or enter your custom idea.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Customize Question Types</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose your reading difficulty and pick question formats: multiple-choice (MCQs), short answer, vocabulary, or grammar questions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-850 dark:to-zinc-900 space-y-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Solve Online or Print</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Solve interactively with real-time grading, or export clean printable PDF-style worksheets complete with an answer key.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS FOR STUDENTS, TEACHERS, PARENTS */}
      <section aria-labelledby="audience-benefits-heading" className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Who Is Comprevo For?
          </span>
          <h2 id="audience-benefits-heading" className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            Built for Students, Teachers, Parents, &amp; Tutors
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-850/40 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Users className="h-5 w-5" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">AI for Students</h3>
            </div>
            <ul className="text-xs text-zinc-500 dark:text-zinc-400 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Practice reading comprehension questions for school exams.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Learn new English vocabulary words with context definitions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Get instant answer explanations to understand your mistakes.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-850/40 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">AI for Teachers</h3>
            </div>
            <ul className="text-xs text-zinc-500 dark:text-zinc-400 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Create customized reading tests and homework assignments in minutes.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Generate data interpretation graph worksheets for analytical skills.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Print clean, formatted worksheets complete with answer keys.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-850/40 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Brain className="h-5 w-5" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Parents &amp; Tutors</h3>
            </div>
            <ul className="text-xs text-zinc-500 dark:text-zinc-400 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Guide daily 15-minute home reading practice tailored to your child.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Track daily reading streaks and improvement over time.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>No registration required—start practicing immediately.</span>
              </li>
            </ul>
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
          Ready to Create Your Free Comprehension Worksheet?
        </h2>
        <p className="text-xs md:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Join thousands of students and teachers using Comprevo to generate custom reading passages, practice questions, and data graphs in seconds.
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

