import React, { useState, useEffect } from "react";
import { UserProfile, BoardType, DifficultyLevel, GeneratedPassage } from "./types";
import { syncStreak } from "./utils/streak";
import Header from "./components/Header";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import StepBoard from "./components/StepBoard";
import StepClass from "./components/StepClass";
import StepDifficulty from "./components/StepDifficulty";
import StepConfigure from "./components/StepConfigure";
import PassageViewer from "./components/PassageViewer";
import WorksheetSolver from "./components/WorksheetSolver";
import DataInterpretationModule from "./components/DataInterpretationModule";
import ComprehensionGeneratorLanding from "./components/ComprehensionGeneratorLanding";
import ReadingComprehensionGeneratorLanding from "./components/ReadingComprehensionGeneratorLanding";
import Class8ComprehensionLanding from "./components/Class8ComprehensionLanding";
import PrivacyModal from "./components/PrivacyModal";
import { Sparkles, Compass, AlertCircle, BookOpen, Clock, Activity, RefreshCw, ArrowLeft } from "lucide-react";

export default function App() {
  // Theme Management
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Authentication & Profile States
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Helper to determine initial step from URL path
  const getStepFromPath = (): string => {
    if (typeof window === "undefined") return "dashboard";
    const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
    if (path === "/reading-comprehension-generator") return "reading_comprehension_generator";
    if (path === "/comprehension-generator") return "comprehension_generator";
    if (path === "/class-8-comprehension") return "class_8_comprehension";
    if (path === "/data-interpretation") return "data_interpretation";
    if (path === "/generator") return "step_board";
    return "dashboard";
  };

  // Funnel Navigation Step State
  // 'dashboard' | 'auth' | 'step_board' | 'step_class' | 'step_difficulty' | 'step_configure' | 'generating' | 'viewer' | 'data_interpretation' | 'comprehension_generator' | 'reading_comprehension_generator' | 'class_8_comprehension'
  const [step, setStep] = useState<string>(() => getStepFromPath());

  // Selection configurations
  const [board, setBoard] = useState<BoardType>(() => {
    const stored = localStorage.getItem("passage_user_session");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.selectedBoard) return parsed.selectedBoard;
      } catch (_) {}
    }
    return "National Standard";
  });
  const [academicLevel, setAcademicLevel] = useState<string>(() => {
    const stored = localStorage.getItem("passage_user_session");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.history && parsed.history.length > 0) {
          return parsed.history[0].config.academicLevel;
        }
      } catch (_) {}
    }
    return "";
  });
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");

  // Current Active Generated Passage state
  const [activePassage, setActivePassage] = useState<GeneratedPassage | null>(null);

  // Loading & Generation states
  const [generationLoading, setGenerationLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Loading messages rotation during generation
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const loadingMessages = [
    "Formulating reading passage structures...",
    "Injecting vocabulary aligned to grade expectations...",
    "Drafting diagnostic assessment questions...",
    "Formulating contextual dictionary annotations...",
    "Verifying curriculum standards compliance...",
    "Polishing the final workbook workspace..."
  ];

  // Route Synchronization Helper
  const navigateTo = (targetStep: string, urlPath: string) => {
    setStep(targetStep);
    if (window.location.pathname !== urlPath) {
      window.history.pushState({}, "", urlPath);
    }
  };

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      const targetStep = getStepFromPath();
      setStep(targetStep);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initialize Session
  useEffect(() => {
    // Sync Theme
    const storedTheme = localStorage.getItem("passage_theme") as "light" | "dark" || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Sync User Profile / Create Default Student Profile
    const storedUser = localStorage.getItem("passage_user_session");
    const initialRouteStep = getStepFromPath();

    if (storedUser) {
      try {
        let parsed = JSON.parse(storedUser);
        // Ensure academic level is in sync with history
        if (parsed.history && parsed.history.length > 0) {
          parsed.selectedLevel = parsed.history[0].config.academicLevel;
        } else {
          parsed.selectedLevel = "";
          parsed.streak = parsed.streak || 0;
          parsed.totalWorksheets = parsed.totalWorksheets || 0;
        }

        // Initialize gamification properties if missing
        parsed.completedWorksheets = parsed.completedWorksheets || [];
        parsed.xp = parsed.xp || 0;
        parsed.stars = parsed.stars || 0;
        parsed.badges = parsed.badges || [];

        // Sync streak values dynamically
        parsed = syncStreak(parsed);

        setUser(parsed);
        if (parsed.selectedBoard) setBoard(parsed.selectedBoard);
        setAcademicLevel(parsed.selectedLevel);
        localStorage.setItem("passage_user_session", JSON.stringify(parsed));
        setStep(initialRouteStep);
      } catch (err) {
        setStep("auth");
      }
    } else {
      // Setup a default premium student profile so the user doesn't hit a login block
      let defaultStudent: UserProfile = {
        name: "Vihan Ash",
        email: "vihan.ash.grc@gmail.com",
        selectedBoard: "National Standard",
        selectedLevel: "",
        favorites: [],
        history: [],
        streak: 0,
        totalWorksheets: 0,
        completedWorksheets: [],
        xp: 0,
        stars: 0,
        badges: [],
      };
      defaultStudent = syncStreak(defaultStudent);
      setUser(defaultStudent);
      setBoard("National Standard");
      setAcademicLevel("");
      localStorage.setItem("passage_user_session", JSON.stringify(defaultStudent));
      setStep(initialRouteStep);
    }
  }, []);

  // Sync theme changes to body
  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("passage_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Auth/Onboarding Success Handler
  const handleAuthSuccess = (newProfile: UserProfile) => {
    // Sync academic level dynamically with most recent worksheet in history
    if (newProfile.history && newProfile.history.length > 0) {
      newProfile.selectedLevel = newProfile.history[0].config.academicLevel;
    } else if (!newProfile.selectedLevel) {
      newProfile.selectedLevel = "";
    }
    setUser(newProfile);
    if (newProfile.selectedBoard) {
      setBoard(newProfile.selectedBoard);
    }
    setAcademicLevel(newProfile.selectedLevel);
    localStorage.setItem("passage_user_session", JSON.stringify(newProfile));
    setShowProfileSettings(false);
    if (step === "auth") {
      setStep("dashboard");
    }
  };

  // Synchronized preference handlers
  const handleBoardChange = (b: BoardType) => {
    setBoard(b);
    if (user) {
      const updated = { ...user, selectedBoard: b };
      setUser(updated);
      localStorage.setItem("passage_user_session", JSON.stringify(updated));
    }
  };

  const handleAcademicLevelChange = (lvl: string) => {
    setAcademicLevel(lvl);
    if (user) {
      const updated = { ...user, selectedLevel: lvl };
      setUser(updated);
      localStorage.setItem("passage_user_session", JSON.stringify(updated));
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("passage_user_session");
    setUser(null);
    setStep("auth");
  };

  // Rotate loading messages smoothly
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generationLoading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [generationLoading]);

  // Trigger Passage Generation
  const handleGeneratePassage = async (finalConfig: any) => {
    // If Data Interpretation is selected, open the dedicated Data Interpretation Workspace
    if (finalConfig.passageType === "Data Interpretation") {
      setBoard(finalConfig.board || "National Standard");
      setAcademicLevel(finalConfig.academicLevel || "Class 8");
      setDifficulty(finalConfig.difficulty || "Medium");
      setStep("data_interpretation");
      return;
    }

    setGenerationLoading(true);
    setStep("generating");
    setErrorText("");
    setLoadingMsgIdx(0);

    try {
      const response = await fetch("/api/generate-passage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalConfig),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate passage.");
      }

      const rawData = await response.json();
      
      // Construct structured GeneratedPassage
      const newPassage: GeneratedPassage = {
        id: `passage_${Date.now()}`,
        timestamp: new Date().toLocaleDateString(),
        title: rawData.title,
        passage: rawData.passage,
        estimatedReadingTime: rawData.estimatedReadingTime,
        difficultWords: rawData.difficultWords,
        questions: rawData.questions,
        learningObjectivesMet: rawData.learningObjectivesMet,
        curriculumComplianceNotes: rawData.curriculumComplianceNotes,
        config: {
          board: finalConfig.board,
          academicLevel: finalConfig.academicLevel,
          difficulty: finalConfig.difficulty,
          topic: finalConfig.topic,
          passageType: finalConfig.passageType,
          passageLength: finalConfig.passageLength,
          vocabularyLevel: finalConfig.vocabularyLevel,
          language: finalConfig.language,
        },
        randomizedFields: finalConfig.randomizedFields,
      };

      // Save to history & update totals
      if (user) {
        const updatedHistory = [newPassage, ...user.history];
        let updatedUser = {
          ...user,
          history: updatedHistory,
          selectedLevel: newPassage.config.academicLevel, // Set selectedLevel to the newly generated worksheet's class
          totalWorksheets: user.totalWorksheets + 1,
        };
        updatedUser = syncStreak(updatedUser);
        setUser(updatedUser);
        localStorage.setItem("passage_user_session", JSON.stringify(updatedUser));
      }

      setActivePassage(newPassage);
      setStep("viewer");
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "An error occurred while generating the assessment. Please verify your connection.");
      setStep("step_configure");
    } finally {
      setGenerationLoading(false);
    }
  };

  // Interactive worksheet adjustments
  const handleModifyPassage = async (action: string, customInstructions: string = "") => {
    if (!activePassage) return;
    setIsModifying(true);
    setErrorText("");

    try {
      const response = await fetch("/api/modify-passage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentData: activePassage,
          action,
          additionalInstructions: customInstructions,
          academicLevel: activePassage.config.academicLevel,
          language: activePassage.config.language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to apply adjustments.");
      }

      const updatedRaw = await response.json();

      const updatedPassage: GeneratedPassage = {
        ...activePassage,
        title: updatedRaw.title,
        passage: updatedRaw.passage,
        estimatedReadingTime: updatedRaw.estimatedReadingTime,
        difficultWords: updatedRaw.difficultWords,
        questions: updatedRaw.questions,
        learningObjectivesMet: updatedRaw.learningObjectivesMet,
        curriculumComplianceNotes: updatedRaw.curriculumComplianceNotes,
      };

      // Update in history
      if (user) {
        const updatedHistory = user.history.map((p) => (p.id === activePassage.id ? updatedPassage : p));
        const updatedUser = { ...user, history: updatedHistory };
        setUser(updatedUser);
        localStorage.setItem("passage_user_session", JSON.stringify(updatedUser));
      }

      setActivePassage(updatedPassage);
    } catch (err: any) {
      alert(err.message || "Could not complete modification.");
    } finally {
      setIsModifying(false);
    }
  };

  // Star / Favorite Toggle
  const handleToggleFavorite = (id: string) => {
    if (!user) return;
    let nextFavorites = [...user.favorites];
    if (nextFavorites.includes(id)) {
      nextFavorites = nextFavorites.filter((favId) => favId !== id);
    } else {
      nextFavorites.push(id);
    }
    const updatedUser = { ...user, favorites: nextFavorites };
    setUser(updatedUser);
    localStorage.setItem("passage_user_session", JSON.stringify(updatedUser));
  };

  // Handle completion of Data Interpretation worksheets
  const handleDataWorksheetCompleted = (score: number, maxScore: number, xp: number) => {
    if (!user) return;
    const updatedUser = { ...user };
    updatedUser.xp = (updatedUser.xp || 0) + xp;
    updatedUser.totalWorksheets = (updatedUser.totalWorksheets || 0) + 1;
    const today = new Date().toLocaleDateString();
    updatedUser.completedWorksheets = updatedUser.completedWorksheets || [];
    updatedUser.completedWorksheets.push({
      id: "di_" + Date.now(),
      title: "Data Interpretation Session",
      score,
      maxScore,
      date: today,
      timestamp: today
    });
    const synced = syncStreak(updatedUser);
    setUser(synced);
    localStorage.setItem("passage_user_session", JSON.stringify(synced));
  };

  return (
    <div className="min-h-screen bg-stone-50/40 pb-16 transition-colors dark:bg-[#09090b]">
      
      {/* Header element */}
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigateHome={() => navigateTo("dashboard", "/")}
        onNavigateComprehensionGenerator={() => navigateTo("comprehension_generator", "/comprehension-generator")}
        onNavigateReadingComprehensionGenerator={() => navigateTo("reading_comprehension_generator", "/reading-comprehension-generator")}
        onNavigateClass8Comprehension={() => navigateTo("class_8_comprehension", "/class-8-comprehension")}
        onNavigateDataInterpretation={() => navigateTo("data_interpretation", "/data-interpretation")}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenProfile={() => setShowProfileSettings(true)}
      />

      {/* Main Canvas Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Profile Onboarding Modal Settings */}
        {showProfileSettings && user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
            <div className="w-full max-w-md animate-scaleUp">
              <AuthScreen
                onAuthSuccess={handleAuthSuccess}
                initialProfile={user}
                onClose={() => setShowProfileSettings(false)}
                isModal={true}
              />
            </div>
          </div>
        )}

        {/* Global Error Notice Bar */}
        {errorText && (
          <div className="mb-6 flex items-center space-x-3 rounded-xl bg-red-50/50 p-4 text-xs text-red-700 dark:bg-red-950/15 dark:text-red-400 border border-red-200 dark:border-red-900/30">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <div className="flex-grow">
              <span className="font-bold block">Worksheet creation failed:</span>
              <span>{errorText}</span>
            </div>
            <button onClick={() => setErrorText("")} className="font-mono px-2 hover:opacity-80 text-sm cursor-pointer">✕</button>
          </div>
        )}

        {/* STEP CONTROLLER COORDINATOR */}
        <div className="w-full" id="step-coordinator-stage">
          
          {/* STEP: AUTHENTICATION */}
          {step === "auth" && (
            <AuthScreen onAuthSuccess={handleAuthSuccess} />
          )}

          {/* STEP: COMPREHENSION GENERATOR LANDING PAGE */}
          {step === "comprehension_generator" && (
            <ComprehensionGeneratorLanding
              onStartGenerator={() => navigateTo("step_board", "/generator")}
              onOpenReadingComprehensionGenerator={() => navigateTo("reading_comprehension_generator", "/reading-comprehension-generator")}
              onOpenClass8Comprehension={() => navigateTo("class_8_comprehension", "/class-8-comprehension")}
              onOpenDataInterpretation={() => navigateTo("data_interpretation", "/data-interpretation")}
              onNavigateHome={() => navigateTo("dashboard", "/")}
            />
          )}

          {/* STEP: READING COMPREHENSION GENERATOR LANDING PAGE */}
          {step === "reading_comprehension_generator" && (
            <ReadingComprehensionGeneratorLanding
              onStartGenerator={() => navigateTo("step_board", "/generator")}
              onOpenComprehensionGenerator={() => navigateTo("comprehension_generator", "/comprehension-generator")}
              onOpenClass8Comprehension={() => navigateTo("class_8_comprehension", "/class-8-comprehension")}
              onOpenDataInterpretation={() => navigateTo("data_interpretation", "/data-interpretation")}
              onNavigateHome={() => navigateTo("dashboard", "/")}
            />
          )}

          {/* STEP: CLASS 8 ENGLISH COMPREHENSION LANDING PAGE */}
          {step === "class_8_comprehension" && (
            <Class8ComprehensionLanding
              onStartGenerator={() => {
                setBoard("National Standard");
                setAcademicLevel("Class 8");
                navigateTo("step_difficulty", "/generator");
              }}
              onOpenComprehensionGenerator={() => navigateTo("comprehension_generator", "/comprehension-generator")}
              onOpenReadingComprehensionGenerator={() => navigateTo("reading_comprehension_generator", "/reading-comprehension-generator")}
              onOpenDataInterpretation={() => navigateTo("data_interpretation", "/data-interpretation")}
              onNavigateHome={() => navigateTo("dashboard", "/")}
            />
          )}

          {/* STEP: DASHBOARD */}
          {step === "dashboard" && user && (
            <Dashboard
              user={user}
              onStartFunnel={() => navigateTo("step_board", "/generator")}
              onSelectPassage={(p) => {
                setActivePassage(p);
                setStep("viewer");
              }}
              onRemoveFavorite={handleToggleFavorite}
              onOpenDataInterpretation={() => navigateTo("data_interpretation", "/data-interpretation")}
              onOpenComprehensionGenerator={() => navigateTo("comprehension_generator", "/comprehension-generator")}
              onOpenReadingComprehensionGenerator={() => navigateTo("reading_comprehension_generator", "/reading-comprehension-generator")}
              onOpenClass8Comprehension={() => navigateTo("class_8_comprehension", "/class-8-comprehension")}
            />
          )}

          {/* STEP: DATA INTERPRETATION MODULE */}
          {step === "data_interpretation" && user && (
            <DataInterpretationModule
              user={user}
              board={board}
              academicLevel={academicLevel || "Class 8"}
              difficulty={difficulty}
              onBackToDashboard={() => navigateTo("dashboard", "/")}
              onWorksheetCompleted={handleDataWorksheetCompleted}
            />
          )}

          {/* STEP 1: BOARD SELECTION */}
          {step === "step_board" && (
            <StepBoard
              selected={board}
              onChange={handleBoardChange}
              onPrev={() => navigateTo("dashboard", "/")}
              onNext={() => setStep("step_class")}
            />
          )}

          {/* STEP 2: CLASS/EXAM SELECTION */}
          {step === "step_class" && (
            <StepClass
              selected={academicLevel}
              onChange={handleAcademicLevelChange}
              onPrev={() => setStep("step_board")}
              onNext={() => setStep("step_difficulty")}
            />
          )}

          {/* STEP 3: DIFFICULTY LEVEL */}
          {step === "step_difficulty" && (
            <StepDifficulty
              selected={difficulty}
              onChange={(diff) => setDifficulty(diff)}
              onPrev={() => setStep("step_class")}
              onNext={() => setStep("step_configure")}
            />
          )}

          {/* STEP 4: PASSAGE DETAILED CONFIGURATION */}
          {step === "step_configure" && (
            <StepConfigure
              board={board}
              academicLevel={academicLevel}
              difficulty={difficulty}
              onPrev={() => setStep("step_difficulty")}
              onSubmit={handleGeneratePassage}
              errorText={errorText}
            />
          )}

          {/* STEP: LOADER / SKELETON LOADER */}
          {step === "generating" && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6" id="generation-loader">
              <div className="relative flex items-center justify-center">
                {/* Visual pulsating circles representing generation */}
                <div className="absolute h-24 w-24 rounded-full border border-emerald-500/10 bg-emerald-500/5 animate-pulse" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                </div>
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-widest">
                  Creating Your Worksheet
                </h4>
                {/* Rotating educational status lines */}
                <p className="text-[11px] text-emerald-600 font-bold dark:text-emerald-400">
                  {loadingMessages[loadingMsgIdx]}
                </p>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                  We are custom-building your reading passage and matching practice questions.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setGenerationLoading(false);
                      setStep("step_configure");
                    }}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-650 transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Cancel & Back</span>
                  </button>
                </div>
              </div>

              {/* Skeleton placeholder preview */}
              <div className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-5 text-left opacity-35 select-none pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
                <div className="h-4 w-1/3 bg-zinc-200 rounded mb-4 dark:bg-zinc-800" />
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-200 rounded dark:bg-zinc-800" />
                  <div className="h-3 bg-zinc-200 rounded dark:bg-zinc-800" />
                  <div className="h-3 bg-zinc-200 rounded w-5/6 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          )}

          {/* STEP: PASSAGE ASSESSMENT WORKSPACE */}
          {step === "viewer" && activePassage && (
            <PassageViewer
              data={activePassage}
              onModify={handleModifyPassage}
              onBack={() => setStep("step_configure")}
              isModifying={isModifying}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={user ? user.favorites.includes(activePassage.id) : false}
              user={user!}
              onStartSolving={() => setStep("solving")}
            />
          )}

          {/* STEP: INTERACTIVE WORKSHEET SOLVER MODE */}
          {step === "solving" && activePassage && (
            <WorksheetSolver
              passage={activePassage}
              user={user!}
              onBack={() => setStep("viewer")}
              onSaveProgress={(updatedProfile) => {
                setUser(updatedProfile);
                localStorage.setItem("passage_user_session", JSON.stringify(updatedProfile));
                setStep("viewer");
              }}
            />
          )}

        </div>
      </main>

      {/* Premium minimal footer */}
      <footer className="mt-auto py-8 border-t border-zinc-150 dark:border-zinc-800/50 mt-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-550 font-sans">
          <div>
            &copy; 2026 <span className="font-bold tracking-tight text-zinc-700 dark:text-zinc-300">COMPREVO</span>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <button
              onClick={() => navigateTo("dashboard", "/")}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
            >
              Home
            </button>
            <span>&bull;</span>
            <button
              onClick={() => navigateTo("reading_comprehension_generator", "/reading-comprehension-generator")}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
            >
              Reading Comprehension Generator
            </button>
            <span>&bull;</span>
            <button
              onClick={() => navigateTo("comprehension_generator", "/comprehension-generator")}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
            >
              AI Comprehension Generator
            </button>
            <span>&bull;</span>
            <button
              onClick={() => navigateTo("data_interpretation", "/data-interpretation")}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
            >
              Data Interpretation
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <span className="font-mono">v1.1.0</span>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal overlay */}
      {showPrivacy && (
        <PrivacyModal onClose={() => setShowPrivacy(false)} />
      )}
    </div>
  );
}
