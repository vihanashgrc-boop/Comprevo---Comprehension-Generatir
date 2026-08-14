import React, { useState } from "react";
import { Library, Moon, Sun, Award, Flame, User, LogOut, Compass, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import { UserProfile } from "../types";
// @ts-expect-error - dynamic generated asset
import logoUrl from "../assets/images/comprevo_logo_1782735993282.jpg";

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateComprehensionGenerator?: () => void;
  onNavigateReadingComprehensionGenerator?: () => void;
  onNavigateDataInterpretation?: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenProfile: () => void;
}

export default function Header({
  user,
  onLogout,
  onNavigateHome,
  onNavigateComprehensionGenerator,
  onNavigateReadingComprehensionGenerator,
  onNavigateDataInterpretation,
  theme,
  onToggleTheme,
  onOpenProfile,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-stone-50/80 backdrop-blur-md transition-colors dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand/Logo */}
        <div
          onClick={onNavigateHome}
          className="flex cursor-pointer items-center space-x-2.5 group"
          id="brand-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden bg-white border border-zinc-250 dark:border-zinc-800 shadow-sm transition-transform group-hover:scale-[1.02]">
            <img 
              src={logoUrl} 
              alt="COMPREVO Logo" 
              className="h-full w-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
              COMPREVO
            </span>
            <div className="text-[8px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Read. Learn. Succeed.
            </div>
          </div>
        </div>

        {/* Center Navigation Links for Desktop */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-1 text-xs">
          <button
            onClick={onNavigateHome}
            className="px-3 py-1.5 rounded-lg font-medium text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer"
          >
            Dashboard
          </button>
          {onNavigateComprehensionGenerator && (
            <button
              onClick={onNavigateComprehensionGenerator}
              className="px-3 py-1.5 rounded-lg font-medium text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>AI Generator</span>
            </button>
          )}
          {onNavigateReadingComprehensionGenerator && (
            <button
              onClick={onNavigateReadingComprehensionGenerator}
              className="px-3 py-1.5 rounded-lg font-medium text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer flex items-center space-x-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Reading Generator</span>
            </button>
          )}
          {onNavigateDataInterpretation && (
            <button
              onClick={onNavigateDataInterpretation}
              className="px-3 py-1.5 rounded-lg font-medium text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:text-white dark:hover:bg-zinc-900 transition cursor-pointer flex items-center space-x-1.5"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Practice</span>
            </button>
          )}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          {/* Quick Streak Indicator */}
          {user && (
            <div className="hidden items-center space-x-2 sm:flex">
              <div 
                className="flex items-center space-x-1.5 rounded-full border border-orange-200/50 bg-orange-50/40 px-2.5 py-0.5 text-[10px] font-mono font-medium text-orange-700 dark:border-orange-950/30 dark:bg-orange-950/20 dark:text-orange-400"
                title="Daily practice streak"
              >
                <Flame className="h-3 w-3 fill-orange-500 text-orange-500 animate-pulse" />
                <span>Streak: {user.streak}d</span>
              </div>

              <div 
                className="flex items-center space-x-1.5 rounded-full border border-emerald-200/50 bg-emerald-50/40 px-2.5 py-0.5 text-[10px] font-mono font-medium text-emerald-800 dark:border-emerald-950/30 dark:bg-emerald-950/20 dark:text-emerald-400"
                title="Total finished worksheets"
              >
                <Award className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>Worksheets: {user.totalWorksheets}</span>
              </div>
            </div>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 cursor-pointer"
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {theme === "light" ? (
              <Moon className="h-3.5 w-3.5 text-zinc-500" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            )}
          </button>

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-left transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 cursor-pointer"
                id="user-profile-menu-btn"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-[10px] font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden max-w-[100px] text-xs font-medium sm:block">
                  <p className="truncate text-zinc-800 dark:text-zinc-200 font-mono tracking-tight">{user.name}</p>
                </div>
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-zinc-200 bg-white p-1 shadow-md focus:outline-none z-40 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-[9px] font-mono text-zinc-400">STUDENT PROFILE</p>
                      <p className="truncate text-xs font-semibold text-zinc-800 dark:text-zinc-100">{user.email}</p>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => {
                          onOpenProfile();
                          setShowDropdown(false);
                        }}
                        className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        <User className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Profile Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateHome();
                          setShowDropdown(false);
                        }}
                        className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        <Library className="h-3.5 w-3.5 text-emerald-600" />
                        <span>My Worksheets</span>
                      </button>

                      {onNavigateComprehensionGenerator && (
                        <button
                          onClick={() => {
                            onNavigateComprehensionGenerator();
                            setShowDropdown(false);
                          }}
                          className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                          <span>AI Comprehension Guide</span>
                        </button>
                      )}

                      {onNavigateReadingComprehensionGenerator && (
                        <button
                          onClick={() => {
                            onNavigateReadingComprehensionGenerator();
                            setShowDropdown(false);
                          }}
                          className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Reading Generator</span>
                        </button>
                      )}

                      {onNavigateDataInterpretation && (
                        <button
                          onClick={() => {
                            onNavigateDataInterpretation();
                            setShowDropdown(false);
                          }}
                          className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Data Interpretation</span>
                        </button>
                      )}

                      <hr className="my-1 border-zinc-100 dark:border-zinc-800" />

                      <button
                        onClick={() => {
                          onLogout();
                          setShowDropdown(false);
                        }}
                        className="flex w-full items-center space-x-2 rounded-md px-2.5 py-1.5 text-left text-xs text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenProfile}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 px-3.5 py-1.5 text-xs font-semibold text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 transition cursor-pointer"
              id="get-started-btn"
            >
              <User className="h-3.5 w-3.5" />
              <span>Get Started</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
