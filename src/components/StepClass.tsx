import React, { useState } from "react";
import { GraduationCap, Award, Compass, ArrowLeft, ArrowRight } from "lucide-react";

interface StepClassProps {
  selected: string;
  onChange: (level: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepClass({ selected, onChange, onNext, onPrev }: StepClassProps) {
  const [activeTab, setActiveTab] = useState<"School" | "Competitive">("School");

  const schoolClasses = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  
  const competitiveExams = [
    { name: "JEE Main", desc: "Engineering Entrance Core Syllabus" },
    { name: "JEE Advanced", desc: "Advanced STEM Analytical Reasoning" },
    { name: "NEET", desc: "Medical Core and Biological Aptitude" },
    { name: "CUET", desc: "Common University Entrance Benchmarks" },
    { name: "Olympiad", desc: "High-order Critical STEM Diagnostics" },
    { name: "NDA", desc: "Defence Academy Evaluative Context" },
    { name: "UPSC Foundation", desc: "Administrative Analytical Prose" },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4" id="step-class-container">
      {/* Progress timeline */}
      <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Step 1
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">→</span>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
            Step 2 of 4
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Class / Grade
          </span>
        </div>
        <div className="flex space-x-1">
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-60" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Editorial Header */}
      <div className="space-y-2 text-left md:text-center md:max-w-2xl md:mx-auto">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Select Class or Grade
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Choose your school class or target competitive exam to get reading material tailored for you.
        </p>
      </div>

      {/* Modern, crisp Tab system */}
      <div className="flex justify-center pt-2">
        <div className="inline-flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800/60 border border-zinc-200/40 dark:border-zinc-850">
          <button
            type="button"
            onClick={() => setActiveTab("School")}
            className={`flex items-center space-x-2 rounded-md px-5 py-2 text-xs font-semibold transition cursor-pointer ${
              activeTab === "School"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
            }`}
          >
            <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>School Curriculum (1-12)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab("Competitive")}
            className={`flex items-center space-x-2 rounded-md px-5 py-2 text-xs font-semibold transition cursor-pointer ${
              activeTab === "Competitive"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
            }`}
          >
            <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Competitive Exams</span>
          </button>
        </div>
      </div>

      {/* Selection Grid with high structural visual differentiation */}
      <div className="min-h-[220px] pt-4">
        {activeTab === "School" ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {schoolClasses.map((cls) => {
              const isSelected = selected === cls;
              return (
                <button
                  key={cls}
                  onClick={() => onChange(cls)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/10 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-650 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850"
                  }`}
                >
                  <GraduationCap className={`h-4.5 w-4.5 mb-1.5 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`} />
                  <span className="font-sans text-xs tracking-tight">{cls}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {competitiveExams.map((exam) => {
              const isSelected = selected === exam.name;
              return (
                <button
                  key={exam.name}
                  onClick={() => onChange(exam.name)}
                  className={`flex flex-col items-start justify-between text-left rounded-xl border p-5 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/10 dark:border-emerald-400 dark:bg-emerald-950/20 font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-650 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850"
                  }`}
                >
                  <div className="flex w-full items-center justify-between mb-2">
                    <span className={`font-sans text-xs font-bold ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-850 dark:text-zinc-100'}`}>{exam.name}</span>
                    <Compass className={`h-4.5 w-4.5 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`} />
                  </div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{exam.desc}</span>
                </button>
              );
            })}
          </div>
        )}
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
          disabled={!selected}
          className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-6 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
          title={!selected ? "Please select a target standard to continue" : "Continue"}
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
