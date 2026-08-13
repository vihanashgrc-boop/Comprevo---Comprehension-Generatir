import React from "react";
import { DifficultyLevel } from "../types";
import { ArrowLeft, ArrowRight, Gauge, Brain, SpellCheck, Percent, Check } from "lucide-react";

interface StepDifficultyProps {
  selected: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepDifficulty({ selected, onChange, onNext, onPrev }: StepDifficultyProps) {
  const levels: { 
    name: DifficultyLevel; 
    desc: string; 
    vocab: string; 
    sentence: string; 
    inference: string; 
    color: string;
    label: string;
  }[] = [
    {
      name: "Easy",
      desc: "Straightforward narrative text, perfect for foundation building and standard reading fluency.",
      vocab: "Basic, high-frequency terms, everyday words",
      sentence: "Short, direct active sentences, clear flow",
      inference: "Direct literal lookup questions, minimal deductive leaps",
      color: "emerald",
      label: "FOUNDATION"
    },
    {
      name: "Medium",
      desc: "Standard curriculum equivalent. Introduces academic vocabulary and varied paragraph styles.",
      vocab: "Standard grade-level vocabulary",
      sentence: "Compound structures, descriptive prose",
      inference: "Moderate analytical questions, contextual word meaning",
      color: "emerald",
      label: "CURRICULUM"
    },
    {
      name: "Hard",
      desc: "Advanced reading comprehension. Best suited for higher grades preparing for excellent academic results.",
      vocab: "Advanced terminology, specialized words",
      sentence: "Complex, multi-clausal analytical style",
      inference: "High-order thinking questions (HOTS), author intent",
      color: "emerald",
      label: "SCHOLASTIC"
    },
    {
      name: "Expert",
      desc: "Challenging level matching top tier competitive exams, Olympiads, and analytical entrance papers.",
      vocab: "Highly advanced SAT/Competitive tier",
      sentence: "Rigorous, editorial-style dense arguments",
      inference: "Comprehensive synthesis, evaluation-based case studies",
      color: "emerald",
      label: "COMPETITIVE"
    },
    {
      name: "Random",
      desc: "Let the system choose the best difficulty level for your academic grade dynamically.",
      vocab: "Syllabus matched vocabulary",
      sentence: "Balanced complexity patterns for structured practice",
      inference: "Dynamic mix of objective and analytical questions",
      color: "zinc",
      label: "DYNAMIC MATCH"
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4" id="step-difficulty-container">
      {/* Progress timeline */}
      <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
        <div className="flex items-center space-x-3">
          <button
            onClick={onPrev}
            className="inline-flex items-center space-x-1 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition cursor-pointer font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Steps 1-2
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">→</span>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
            Step 3 of 4
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Difficulty Level
          </span>
        </div>
        <div className="flex space-x-1">
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-40" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-70" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Editorial Header */}
      <div className="space-y-2 text-left md:text-center md:max-w-2xl md:mx-auto">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Choose Difficulty Level
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Choose how challenging you want the reading passage and questions to be.
        </p>
      </div>

      {/* Custom modular list layout (no grid of identical cards!) */}
      <div className="space-y-3 pt-2">
        {levels.map((lvl) => {
          const isSelected = selected === lvl.name;

          return (
            <div
              key={lvl.name}
              onClick={() => onChange(lvl.name)}
              className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${
                isSelected
                  ? `border-emerald-600 bg-emerald-50/10 dark:border-emerald-500 dark:bg-emerald-950/15`
                  : `border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-750`
              }`}
            >
              {/* Left detail: title + description */}
              <div className="md:w-1/2 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wide border ${
                    isSelected
                      ? "bg-emerald-100 border-emerald-250 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400"
                      : "bg-zinc-50 border-zinc-150 text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                  }`}>
                    {lvl.label}
                  </span>
                  <h4 className="font-sans text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                    {lvl.name} Level
                  </h4>
                  {isSelected && (
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {lvl.desc}
                </p>
              </div>

              {/* Right specs: diagnostic parameters */}
              <div className="md:w-5/12 grid grid-cols-1 gap-2 border-t md:border-t-0 md:border-l border-zinc-200/60 dark:border-zinc-800/60 pt-3.5 md:pt-0 md:pl-5 text-[11px] font-sans">
                <div className="flex items-start space-x-2">
                  <SpellCheck className="mt-0.5 h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  <p className="text-zinc-500 dark:text-zinc-450">
                    <strong className="text-zinc-700 dark:text-zinc-300">Vocabulary: </strong>
                    {lvl.vocab}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Brain className="mt-0.5 h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  <p className="text-zinc-500 dark:text-zinc-450">
                    <strong className="text-zinc-700 dark:text-zinc-300">Sentence structure: </strong>
                    {lvl.sentence}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Percent className="mt-0.5 h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  <p className="text-zinc-500 dark:text-zinc-450">
                    <strong className="text-zinc-700 dark:text-zinc-300">Inference depth: </strong>
                    {lvl.inference}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern minimal button bar */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <button
          onClick={onPrev}
          className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 px-5 py-2.5 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-6 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
