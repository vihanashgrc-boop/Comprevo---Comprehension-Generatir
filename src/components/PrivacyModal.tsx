import React from "react";
import { Shield, X, Lock, Eye, Database, Globe } from "lucide-react";

interface PrivacyModalProps {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs" id="privacy-policy-modal">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-150 dark:border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                Privacy Policy
              </h3>
              <p className="text-[10px] font-mono font-medium tracking-wider text-zinc-400 dark:text-zinc-550 uppercase">
                COMPREVO Educational Platform
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-5 text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans scrollbar-thin">
          
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 space-y-2">
            <h4 className="font-sans font-bold text-emerald-800 dark:text-emerald-400 text-xs flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> Privacy & Security Commitment
            </h4>
            <p className="text-[11px] leading-relaxed">
              At COMPREVO, we believe educational privacy is paramount. Your worksheets, responses, progress, and performance data are managed with complete transparency and state-of-the-art security.
            </p>
          </div>

          <section className="space-y-2">
            <h4 className="font-sans font-bold text-zinc-900 dark:text-white text-xs flex items-center gap-1.5">
              <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> 1. Data Collection & Local Storage
            </h4>
            <p>
              COMPREVO maintains a completely <strong>client-side local persistence architecture</strong>. We store your preferences, favorites list, practice logs, badges, and learning history directly on your device via <code>localStorage</code>. No personal information or profile telemetry is sent to external, unauthorized database servers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-sans font-bold text-zinc-900 dark:text-white text-xs flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> 2. AI Assessment & Google Gemini API
            </h4>
            <p>
              To create high-quality, personalized reading passages, curriculum-mapped questions, and comprehensive evaluation matrices, COMPREVO utilizes Google's secure <strong>Gemini API</strong> on the server. Only non-identifiable parameters (such as board standards, age levels, topics, and difficulty levels) are processed to engineer context. No email addresses, names, or performance profiles are ever transmitted.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-sans font-bold text-zinc-900 dark:text-white text-xs flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> 3. Data Transparency & Rights
            </h4>
            <p>
              You have full, unhindered control over your learning data. You can inspect your progress, view your cumulative badges, and reset your workspace statistics or history at any moment by logging out or clearing your web application storage. We do not track, profile, monetize, or share your behavior with ad networks.
            </p>
          </section>

          <section className="space-y-2 border-t border-zinc-150 dark:border-zinc-800/80 pt-4">
            <p className="text-[10px] text-zinc-400 dark:text-zinc-550 italic">
              Last updated: June 2026. COMPREVO is built to conform to leading student privacy guidelines and standard data protection mandates.
            </p>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-850 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 font-bold text-xs transition cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}
