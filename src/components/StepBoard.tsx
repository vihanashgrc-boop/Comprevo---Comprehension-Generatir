import React from "react";
import { BoardType } from "../types";
import { Check, Landmark, GraduationCap, Compass, Globe, Award, ArrowRight } from "lucide-react";

interface StepBoardProps {
  selected: BoardType;
  onChange: (board: BoardType) => void;
  onNext: () => void;
}

export default function StepBoard({ selected, onChange, onNext }: StepBoardProps) {
  const options: { name: BoardType; tag: string; desc: string; icon: any }[] = [
    {
      name: "National Standard",
      tag: "STANDARD CORE",
      desc: "Standardized national syllabus focusing on balanced core subjects and clear conceptual foundations.",
      icon: Landmark,
    },
    {
      name: "Advanced Curriculum",
      tag: "HONORS & AP",
      desc: "A literature-rich rigorous curriculum emphasizing deep linguistic, literary, and analytic skills.",
      icon: Award,
    },
    {
      name: "Regional Syllabus",
      tag: "LOCALIZED BENCHMARKS",
      desc: "A specialized syllabus tailored to localized benchmarks, regional languages, and practical studies.",
      icon: GraduationCap,
    },
    {
      name: "International Baccalaureate",
      tag: "GLOBAL INQUIRY",
      desc: "An inquiry-based global curriculum focused on student-led learning and intercultural understanding.",
      icon: Globe,
    },
    {
      name: "Cambridge Standard",
      tag: "RIGOROUS DISCIPLINES",
      desc: "A world-renowned academic pathway prioritizing structured, rigorous intellectual disciplines.",
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4" id="step-board-container">
      {/* Progress timeline */}
      <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
            Phase 01 / 04
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Syllabus Selection
          </span>
        </div>
        <div className="flex space-x-1">
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Editorial Header */}
      <div className="space-y-2 text-left md:text-center md:max-w-2xl md:mx-auto">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Syllabus Framework
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
          Our platform shapes context, vocabulary complexity, and comprehension inquiry pathways based on your designated standard.
        </p>
      </div>

      {/* Selection layout with structural contrast */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.name;

          return (
            <div
              key={opt.name}
              onClick={() => onChange(opt.name)}
              className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/10 dark:border-emerald-500 dark:bg-emerald-950/15"
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-750"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isSelected 
                    ? "bg-emerald-600 text-white dark:bg-emerald-500" 
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                } transition-colors`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                
                {isSelected ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500 shadow-xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="h-5 w-5 rounded-full border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300" />
                )}
              </div>

              <div className="mt-5 space-y-1">
                <span className="block text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
                  {opt.tag}
                </span>
                <h4 className="font-sans text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                  {opt.name}
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed dark:text-zinc-400 pt-1">
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern minimal button bar */}
      <div className="flex justify-end pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center space-x-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-6 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          <span>Continue Journey</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
