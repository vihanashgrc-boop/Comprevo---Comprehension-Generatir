import React, { useState } from "react";
import { UserProfile, BoardType } from "../types";
import { syncStreak } from "../utils/streak";
import { Mail, Lock, User, Compass, GraduationCap, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
// @ts-expect-error - dynamic generated asset
import logoUrl from "../assets/images/comprevo_logo_1782735993282.jpg";

interface AuthScreenProps {
  onAuthSuccess: (user: UserProfile) => void;
  initialProfile?: UserProfile | null;
  onClose?: () => void;
  isModal?: boolean;
}

export default function AuthScreen({
  onAuthSuccess,
  initialProfile,
  onClose,
  isModal = false,
}: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(!initialProfile);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Form fields
  const [name, setName] = useState(initialProfile?.name || "");
  const [email, setEmail] = useState(initialProfile?.email || "");
  const [password, setPassword] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<BoardType>(initialProfile?.selectedBoard || "National Standard");
  const [selectedLevel, setSelectedLevel] = useState(initialProfile?.selectedLevel || "");
  
  // Status states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (isForgotPassword) {
        setSuccess(`Password recovery instructions have been sent to ${email}`);
        setTimeout(() => {
          setIsForgotPassword(false);
          setSuccess("");
        }, 3000);
        return;
      }

      if (isLogin && !initialProfile) {
        // Sign In
        if (!email || !password) {
          setError("Please provide all required login credentials.");
          return;
        }
        
        // Simulating success
        let mockUser: UserProfile = {
          name: email.split("@")[0].toUpperCase(),
          email: email,
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
        mockUser = syncStreak(mockUser);
        onAuthSuccess(mockUser);
      } else {
        // Sign Up or Edit Profile
        if (!email || !name) {
          setError("Please complete your full name and email.");
          return;
        }

        let updatedUser: UserProfile = {
          ...initialProfile,
          name,
          email,
          selectedBoard,
          selectedLevel,
          favorites: initialProfile?.favorites || [],
          history: initialProfile?.history || [],
          streak: initialProfile?.streak || 0,
          highestStreak: initialProfile?.highestStreak || 0,
          lastPracticeDate: initialProfile?.lastPracticeDate || "",
          totalPracticeDays: initialProfile?.totalPracticeDays || 0,
          totalWorksheets: initialProfile?.totalWorksheets || 0,
          xp: initialProfile?.xp || 0,
          stars: initialProfile?.stars || 0,
          badges: initialProfile?.badges || [],
          completedWorksheets: initialProfile?.completedWorksheets || [],
        };
        updatedUser = syncStreak(updatedUser);
        onAuthSuccess(updatedUser);
        if (onClose) onClose();
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let googleUser: UserProfile = {
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
      googleUser = syncStreak(googleUser);
      onAuthSuccess(googleUser);
      if (onClose) onClose();
    }, 1200);
  };

  const boards: BoardType[] = ["National Standard", "Advanced Curriculum", "Regional Syllabus", "International Baccalaureate", "Cambridge Standard"];
  const levels = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", 
    "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
    "JEE Main", "JEE Advanced", "NEET", "CUET", "Olympiad", "NDA", "UPSC Foundation"
  ];

  return (
    <div className={`w-full ${isModal ? "" : "max-w-md mx-auto py-12 px-4"}`} id="auth-container">
      <div className="rounded-xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        {/* Modal Close */}
        {isModal && onClose && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs font-mono tracking-tight cursor-pointer"
            >
              ✕ CLOSE
            </button>
          </div>
        )}

        {/* Brand Logo Header */}
        {!initialProfile && (
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-800 shadow-sm mb-2">
              <img 
                src={logoUrl} 
                alt="Comprevo Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-display text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
              COMPREVO
            </h1>
            <p className="text-[9px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Read. Comprehend. Excel.
            </p>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            {initialProfile 
              ? "Account Settings" 
              : isForgotPassword 
              ? "Recover Password" 
              : isLogin 
              ? "Welcome Back" 
              : "Create Account"}
          </h2>
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
            {initialProfile 
              ? "Choose your academic board, grade preferences, and customized curriculum parameters." 
              : isForgotPassword 
              ? "Enter your registered email address below to receive safe password recovery links." 
              : isLogin 
              ? "Enter your workspace email and password to synchronize your worksheets and progress stats." 
              : "Generate original reading passages, context-aligned vocabulary and diagnostic assessments."}
          </p>
        </div>

        {/* Toggle tabs (Only when not editing existing profile) */}
        {!initialProfile && !isForgotPassword && (
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800/60">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`rounded-md py-1.5 text-xs font-semibold tracking-tight transition cursor-pointer ${
                isLogin 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`rounded-md py-1.5 text-xs font-semibold tracking-tight transition cursor-pointer ${
                !isLogin 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Error / Success messages */}
        {error && (
          <div className="mb-5 flex items-center space-x-2.5 rounded-lg bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-5 flex items-center space-x-2.5 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/30">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Sign up or Profile editing only) */}
          {(!isLogin || initialProfile) && !isForgotPassword && (
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vihan Ash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white dark:focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white dark:focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password Field */}
          {!initialProfile && !isForgotPassword && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(""); }}
                    className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white dark:focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Academics Customization */}
          {(!isLogin || initialProfile) && !isForgotPassword && (
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <Compass className="mr-1 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Syllabus Board
                </label>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value as BoardType)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  {boards.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <GraduationCap className="mr-1 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Target Grade
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  <option value="">Not Selected</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 py-2 text-xs font-semibold transition disabled:opacity-50 mt-3 cursor-pointer"
          >
            <span>
              {loading 
                ? "Processing Request..." 
                : isForgotPassword 
                ? "Send recovery email" 
                : initialProfile 
                ? "Save workspace settings" 
                : isLogin 
                ? "Sign In" 
                : "Register account"}
            </span>
            {!loading && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </form>

        {/* Google SSO simulated */}
        {!initialProfile && (
          <div className="mt-5">
            {isForgotPassword ? (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-xs font-semibold text-zinc-500 hover:text-emerald-600 block text-center mx-auto cursor-pointer"
              >
                ← Back to sign-in
              </button>
            ) : (
              <>
                <div className="relative mb-4 flex py-2 items-center">
                  <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
                  <span className="flex-shrink mx-2 text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">or continue with</span>
                  <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center space-x-2 rounded-lg border border-zinc-200 bg-white py-2 px-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.437-2.882-6.437-6.437s2.882-6.437 6.437-6.437c1.556 0 2.978.557 4.093 1.478l3.056-3.056C19.1 2.3 15.89 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.76 0 11.76-4.755 11.76-11.76 0-.616-.067-1.12-.148-1.556H12.24z"
                    />
                  </svg>
                  <span>Google SSO</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
