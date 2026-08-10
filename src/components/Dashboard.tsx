import React from "react";
import { UserProfile, GeneratedPassage } from "../types";
import { getLocalDateString } from "../utils/streak";
import { 
  Sparkles, Calendar, BookOpen, Star, Clock, ArrowRight, Flame, 
  Award, ShieldAlert, CheckCircle2, ChevronRight, HelpCircle,
  Compass, Play, Trophy, TrendingUp, Zap
} from "lucide-react";

interface DashboardProps {
  user: UserProfile;
  onStartFunnel: () => void;
  onSelectPassage: (passage: GeneratedPassage) => void;
  onRemoveFavorite: (id: string) => void;
}

export default function Dashboard({
  user,
  onStartFunnel,
  onSelectPassage,
  onRemoveFavorite,
}: DashboardProps) {
  
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

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-container">
      
      {/* 1. COMPACT WELCOME SECTION (No huge background banner) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6 gap-4">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Workspace Dashboard
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Greetings, {user.name}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-sans max-w-xl">
            Monitor progress and craft custom reading worksheets for <strong className="text-zinc-850 dark:text-zinc-300 font-semibold">{activeClass || "Not Selected"}</strong>.
          </p>
        </div>

        <button
          onClick={onStartFunnel}
          className="shrink-0 inline-flex items-center justify-center space-x-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-5 py-2.5 text-xs font-semibold transition cursor-pointer shadow-sm"
          id="cta-generate-passage"
        >
          <Sparkles className="h-4 w-4" />
          <span>New Worksheet</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 2. ASYMMETRICAL BENTO GRID (Different sizes, high visual hierarchy) */}
      <div className="grid gap-6 md:grid-cols-12">
        
        {/* CARD A: CONTINUE LEARNING (Large size - Col-7) */}
        <div className="md:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30">
                RECOMMENDED TRACK
              </span>
              <span className="text-[9px] font-mono text-zinc-400">ACTIVE SCHOLASTICS</span>
            </div>
            <h3 className="font-sans text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Continue Learning: Scientific Literacy
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-md">
              Improve critical analysis skills by working through passages focused on astrophysics, cognitive science, or environmental biotechnology tailored to the <span className="font-semibold">{user.selectedBoard}</span> framework.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-4">
            <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 text-xs">
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Diagnostic Level: Medium</span>
            </div>
            <button
              onClick={onStartFunnel}
              className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-850 px-4 py-2 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-850 transition cursor-pointer"
            >
              <Play className="h-3 w-3 fill-emerald-600 text-emerald-600" />
              <span>Start Practice Session</span>
            </button>
          </div>
        </div>

        {/* CARD B: TODAY'S GOAL & QUICK ACTIONS (Medium size - Col-5) */}
        <div className="md:col-span-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-3.5">
            <span className="block text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
              TODAY'S WORKSPACE GOAL
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
                <h4 className="font-sans text-xs font-bold text-zinc-850 dark:text-white">
                  {completedToday ? "Goal Accomplished!" : "Daily Practice Goal"}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed">
                  {completedToday 
                    ? "Fantastic! You completed today's assessment worksheet." 
                    : "Generate and solve at least 1 worksheet today to maintain your streak."}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4">
            <span className="block text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mb-2">
              Quick Subject Templates
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
              >
                🪐 Astronomy
              </button>
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
              >
                🔬 Tech & Biotech
              </button>
              <button 
                onClick={onStartFunnel}
                className="text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded transition cursor-pointer"
              >
                📜 Indian Culture
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SECONDARY GRID: MAIN CONTENT AREA */}
      <div className="grid gap-6 md:grid-cols-12 pt-2">
        
        {/* LEFT PANEL: SAVED HISTORY & WORKSHEETS (Col-8) */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200">
                Recent Worksheets
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded dark:bg-zinc-800">
              {user.history.length} GENERATED
            </span>
          </div>

          {user.history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-300 dark:text-zinc-700" />
              <h5 className="font-sans text-xs font-bold text-zinc-800 mt-3 dark:text-zinc-200">No worksheets found</h5>
              <p className="text-[11px] text-zinc-450 mt-1 max-w-sm mx-auto leading-relaxed">
                Your custom-generated reading assessments will reside here. Tap New Worksheet to design your first session.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {user.history.map((passage) => (
                <div
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
                      <h5 className="font-sans text-xs font-bold text-zinc-850 group-hover:text-emerald-600 transition dark:text-zinc-100 dark:group-hover:text-emerald-400 line-clamp-2">
                        {passage.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-medium pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                      <span className="truncate max-w-[120px]">{passage.config.board}</span>
                      <div className="flex items-center space-x-1 shrink-0 text-[9px] font-mono">
                        <span>⏱ {passage.estimatedReadingTime}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: ACHIEVEMENTS & STARRED ITEMS (Col-4) */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Achievements Tall Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5 border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Workspace Stats</span>
            </h4>

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
                <span className="text-zinc-500 dark:text-zinc-400">Highest Streak</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{user.highestStreak || 0} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Total Practice Days</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{user.totalPracticeDays || 0} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Last Practice Date</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">{user.lastPracticeDate || "Never"}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span className="text-zinc-500 dark:text-zinc-400">Target Level</span>
                <span className="font-sans font-bold text-zinc-800 dark:text-zinc-100">{activeClass || "Not Selected"}</span>
              </div>
            </div>
          </div>

          {/* Starred Passages Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5 border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
              <span>Starred Passages</span>
            </h4>

            {favoritesList.length === 0 ? (
              <div className="text-center py-6 text-zinc-400">
                <Star className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                <p className="text-[10px] text-zinc-550 dark:text-zinc-400 mt-2 leading-relaxed">
                  Star any worksheet after creating it to pin it here for speedy review.
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
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
