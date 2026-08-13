import { useState, useEffect, useRef, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Award, 
  AlertCircle, 
  ThumbsUp, 
  Check, 
  X, 
  ArrowLeft, 
  HelpCircle, 
  Trophy, 
  Zap, 
  Star, 
  Flame,
  RefreshCw,
  Play,
  RotateCcw,
  Compass,
  CheckSquare
} from "lucide-react";
import { GeneratedPassage, Question, UserProfile, EvaluationResult } from "../types";
import { getLocalDateString, syncStreak } from "../utils/streak";

interface WorksheetSolverProps {
  passage: GeneratedPassage;
  user: UserProfile;
  onBack: () => void;
  onSaveProgress: (updatedUser: UserProfile) => void;
}

export default function WorksheetSolver({ 
  passage, 
  user, 
  onBack, 
  onSaveProgress 
}: WorksheetSolverProps) {
  const { id: passageId, title, passage: passageText, questions = [], config } = passage;

  // --- STATE VARIABLES ---
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    // Attempt to load saved draft from localStorage
    const savedDraft = localStorage.getItem(`passage_draft_answers_${passageId}`);
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const [flags, setFlags] = useState<Record<number, boolean>>(() => {
    const savedFlags = localStorage.getItem(`passage_draft_flags_${passageId}`);
    if (savedFlags) {
      try {
        return JSON.parse(savedFlags);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // Timer states
  const [isTimed, setIsTimed] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // 15 mins default
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Solving Workflow states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [autoSaveNotification, setAutoSaveNotification] = useState<boolean>(false);

  // Active question reference
  const currentQuestion: Question = questions[currentIdx] || questions[0];

  // List of educational loading statements for worksheet evaluation
  const loadingMessages = [
    "Checking your answers...",
    "Reviewing spelling and word choices...",
    "Checking your understanding of the text...",
    "Calculating your score and streak..."
  ];
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // --- EFFECT: TIMER ---
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !showReview && !isSubmitting) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        if (isTimed) {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              handleAutoSubmit();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isTimed, showReview, isSubmitting]);

  // --- EFFECT: ROTATING LOADING MESSAGES ---
  useEffect(() => {
    let interval: any = null;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  // --- EFFECT: AUTO-SAVE TO LOCALSTORAGE ---
  const saveDraft = (currentAnswers: Record<number, string>, currentFlags: Record<number, boolean>) => {
    localStorage.setItem(`passage_draft_answers_${passageId}`, JSON.stringify(currentAnswers));
    localStorage.setItem(`passage_draft_flags_${passageId}`, JSON.stringify(currentFlags));
  };

  const handleSetAnswer = (qId: number, val: string) => {
    const updated = { ...answers, [qId]: val };
    setAnswers(updated);
    saveDraft(updated, flags);

    // Briefly notify auto-save
    setAutoSaveNotification(true);
    setTimeout(() => setAutoSaveNotification(false), 2000);
  };

  const handleToggleFlag = (qId: number) => {
    const updatedFlags = { ...flags, [qId]: !flags[qId] };
    setFlags(updatedFlags);
    saveDraft(answers, updatedFlags);
  };

  // --- FORMAT TIMER DISPLAY ---
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // --- RENDER DYNAMIC QUESTION INPUTS ---
  const renderQuestionInput = (q: Question) => {
    const qType = q.type.toLowerCase();
    const currentVal = answers[q.id] || "";

    // 1. Multiple Choice Questions (MCQ)
    if (qType === "mcq" || (q.options && q.options.length > 0 && qType !== "matchfollowing" && qType !== "sentencefollowing")) {
      const options = q.options || [];
      return (
        <div className="grid gap-2.5 mt-2" id={`question-input-mcq-${q.id}`}>
          {options.map((opt, idx) => {
            const isSelected = currentVal === opt;
            const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
            return (
              <button
                type="button"
                key={idx}
                onClick={() => handleSetAnswer(q.id, opt)}
                className={`flex items-center text-left text-xs p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/10 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold shadow-xs"
                    : "border-zinc-200/85 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-750 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mr-3 transition-colors ${
                  isSelected 
                    ? "bg-emerald-600 text-white dark:bg-emerald-500" 
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}>
                  {optionLetter}
                </span>
                <span className="flex-grow">{opt}</span>
              </button>
            );
          })}
        </div>
      );
    }

    // 2. True / False Toggles
    if (qType === "truefalse" || qType === "true_false") {
      const isTrueSelected = currentVal.toLowerCase() === "true";
      const isFalseSelected = currentVal.toLowerCase() === "false";
      return (
        <div className="flex gap-4 mt-2" id={`question-input-tf-${q.id}`}>
          <button
            type="button"
            onClick={() => handleSetAnswer(q.id, "True")}
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
              isTrueSelected
                ? "border-emerald-600 bg-emerald-50/10 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300 font-bold"
                : "border-zinc-200/85 bg-white hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <span className={`text-xl mb-1 ${isTrueSelected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}>●</span>
            <span className="text-sm">True</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSetAnswer(q.id, "False")}
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
              isFalseSelected
                ? "border-red-600 bg-red-50/10 text-red-950 dark:border-red-500 dark:bg-red-950/20 dark:text-red-300 font-bold"
                : "border-zinc-200/85 bg-white hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <span className={`text-xl mb-1 ${isFalseSelected ? "text-red-600 dark:text-red-400" : "text-zinc-400"}`}>✕</span>
            <span className="text-sm">False</span>
          </button>
        </div>
      );
    }

    // 3. Fill in the Blanks / One-Word Answers
    if (qType === "fillblanks" || qType === "oneword" || qType === "one_word" || qType === "vocabulary" || qType === "synonyms" || qType === "meanings") {
      return (
        <div className="space-y-1.5 mt-2" id={`question-input-text-${q.id}`}>
          <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Your Answer</label>
          <input
            type="text"
            placeholder="Type your brief answer here..."
            value={currentVal}
            onChange={(e) => handleSetAnswer(q.id, e.target.value)}
            className="w-full rounded-xl border-2 border-zinc-200 bg-white py-3 px-4 text-xs font-sans outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-500 shadow-xs"
          />
        </div>
      );
    }

    // 4. Short / Long Descriptive Answers
    const isLong = qType === "longanswer" || qType === "long_answer" || qType === "referencetocontext";
    const wordCount = currentVal.trim() === "" ? 0 : currentVal.trim().split(/\s+/).length;
    const charCount = currentVal.length;

    if (qType === "shortanswer" || qType === "short_answer" || isLong || qType === "grammar" || qType === "referencetocontext") {
      return (
        <div className="space-y-2 mt-2" id={`question-input-textarea-${q.id}`}>
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Written Draft Workspace</label>
            <div className="flex space-x-3 text-[10px] font-mono text-zinc-400">
              <span>{charCount} chars</span>
              <span>{wordCount} words</span>
            </div>
          </div>
          <textarea
            rows={isLong ? 7 : 4}
            placeholder={isLong ? "Compose your comprehensive explanatory response here..." : "Type your analytical response here..."}
            value={currentVal}
            onChange={(e) => handleSetAnswer(q.id, e.target.value)}
            className="w-full rounded-xl border-2 border-zinc-200 bg-white py-3 px-4 text-xs font-sans leading-relaxed outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-500 shadow-xs resize-y"
          />
        </div>
      );
    }

    // 5. Match the Following Dropdowns
    if (qType === "matchfollowing" || qType === "match_following") {
      // Try to parse options or lines. Usually looks like:
      // A. Term 1 -> Option choice, B. Term 2 -> Option choice etc.
      // Let's render a simple descriptive text box but also helper instructions
      return (
        <div className="space-y-3.5 mt-2" id={`question-input-match-${q.id}`}>
          <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-[11px] leading-relaxed dark:bg-zinc-850 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350">
            <span className="font-bold block text-zinc-800 dark:text-zinc-200 mb-1">Matching Helper</span>
            Type the matching pairs in the text field below (e.g., A-2, B-4, C-1, D-3).
          </div>
          <input
            type="text"
            placeholder="e.g. A-2, B-4, C-1, D-3..."
            value={currentVal}
            onChange={(e) => handleSetAnswer(q.id, e.target.value)}
            className="w-full rounded-xl border-2 border-zinc-200 bg-white py-3 px-4 text-xs font-sans outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-500 shadow-xs"
          />
        </div>
      );
    }

    // 6. Sentence Rearrangement Helper
    if (qType === "sentencerearrangement" || qType === "sentence_rearrangement") {
      return (
        <div className="space-y-3.5 mt-2" id={`question-input-rearrange-${q.id}`}>
          <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-[11px] leading-relaxed dark:bg-zinc-850 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350">
            <span className="font-bold block text-zinc-800 dark:text-zinc-200 mb-1">Arrangement Workspace</span>
            Enter the correct order sequence of characters or sentences (e.g., C-A-D-B or 3-1-4-2).
          </div>
          <input
            type="text"
            placeholder="Type ordered sequence here (e.g. C-A-D-B)..."
            value={currentVal}
            onChange={(e) => handleSetAnswer(q.id, e.target.value)}
            className="w-full rounded-xl border-2 border-zinc-200 bg-white py-3 px-4 text-xs font-sans outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-500 shadow-xs"
          />
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="space-y-1.5 mt-2" id={`question-input-fallback-${q.id}`}>
        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Your Answer</label>
        <textarea
          rows={3}
          placeholder="Type your response here..."
          value={currentVal}
          onChange={(e) => handleSetAnswer(q.id, e.target.value)}
          className="w-full rounded-xl border-2 border-zinc-200 bg-white py-3 px-4 text-xs font-sans outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-500 shadow-xs"
        />
      </div>
    );
  };

  // --- SUBMIT WORKSHEET FLOW ---
  const handleAutoSubmit = () => {
    setSubmitMessage("Time expired! Automatically submitting your answers...");
    submitWorksheetAttempt();
  };

  const handleManualSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  const submitWorksheetAttempt = async () => {
    setShowSubmitConfirm(false);
    setIsSubmitting(true);
    setLoadingMsgIdx(0);

    try {
      // Create user answers object with empty strings for unattempted
      const preparedAnswers: Record<number, string> = {};
      questions.forEach((q) => {
        preparedAnswers[q.id] = answers[q.id] || "";
      });

      // Call dynamic evaluation AI endpoint
      const response = await fetch("/api/evaluate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passage: passageText,
          questions: questions,
          userAnswers: preparedAnswers,
          timeTaken: formatTime(timeElapsed)
        })
      });

      if (!response.ok) {
        throw new Error("Evaluation failed server-side.");
      }

      const evalData: EvaluationResult = await response.json();
      evalData.timeTaken = formatTime(timeElapsed); // Inject elapsed time

      setEvaluation(evalData);
      setShowReview(true);

      // Clear local storage drafts for this worksheet since it's submitted!
      localStorage.removeItem(`passage_draft_answers_${passageId}`);
      localStorage.removeItem(`passage_draft_flags_${passageId}`);
    } catch (err: any) {
      alert(err.message || "An error occurred while evaluating your sheet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SAVE COMPLETED RESULTS & GAMIFICATION IN USER PROFILE ---
  const handleFinishedReview = () => {
    if (!evaluation) {
      onBack();
      return;
    }

    // Format new completed worksheet object
    const completedRecord = {
      passageId,
      passageTitle: title,
      timestamp: new Date().toLocaleString(),
      date: getLocalDateString(),
      subject: config.topic || "General Reading",
      academicLevel: config.academicLevel,
      score: evaluation.overallScore,
      maxScore: evaluation.maxScore,
      percentage: evaluation.percentage,
      timeTakenSeconds: timeElapsed,
      userAnswers: answers,
      evaluation: evaluation
    };

    // Prepare updated user object
    const currentCompleted = user.completedWorksheets || [];
    const currentBadges = user.badges || [];
    const currentXp = user.xp || 0;
    const currentStars = user.stars || 0;

    // Union/Concat badges without duplicates
    const newBadgesList = [...currentBadges];
    evaluation.rewards.badgesEarned.forEach((badge) => {
      if (!newBadgesList.includes(badge)) {
        newBadgesList.push(badge);
      }
    });

    const initialUpdatedUser: UserProfile = {
      ...user,
      xp: currentXp + evaluation.rewards.xpGained,
      stars: currentStars + evaluation.rewards.starsAwarded,
      badges: newBadgesList,
      completedWorksheets: [completedRecord, ...currentCompleted]
    };

    const updatedUser = syncStreak(initialUpdatedUser);

    onSaveProgress(updatedUser);
  };

  // --- RESET/RESTART PRACTICE ---
  const handleResetPractice = () => {
    setAnswers({});
    setFlags({});
    setTimeElapsed(0);
    setTimeRemaining(15 * 60);
    setCurrentIdx(0);
    setShowResetConfirm(false);
    localStorage.removeItem(`passage_draft_answers_${passageId}`);
    localStorage.removeItem(`passage_draft_flags_${passageId}`);
  };

  // --- DERIVE QUESTION NAVIGATION STATISTICS ---
  const stats = useMemo(() => {
    let answered = 0;
    let unanswered = 0;
    let flagged = 0;

    questions.forEach((q) => {
      const attempted = answers[q.id] && answers[q.id].trim() !== "";
      if (attempted) answered++;
      else unanswered++;
      if (flags[q.id]) flagged++;
    });

    return { answered, unanswered, flagged };
  }, [answers, flags, questions]);

  // If review mode is active, render the comprehensive Review Screen
  if (showReview && evaluation) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn py-4" id="review-screen-stage">
        {/* TOP CONGRATULATORY CARD */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-500/5 dark:bg-emerald-950/10 p-6 md:p-8 text-center space-y-4 shadow-xs dark:border-emerald-900/30">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md animate-bounce">
            <Trophy className="h-7 w-7" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100">
              Worksheet Completed!
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Your submission has been evaluated successfully by our educational diagnostics engine.
            </p>
          </div>

          {/* Gamification Stars animation overlay */}
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, idx) => {
              const starFilled = idx < evaluation.rewards.starsAwarded;
              return (
                <Star
                  key={idx}
                  className={`h-7 w-7 transition-all ${
                    starFilled 
                      ? "text-amber-500 fill-amber-500 scale-110 drop-shadow-sm" 
                      : "text-zinc-300 dark:text-zinc-700"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* CORE STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">Diag Score</p>
            <h4 className="font-display text-2xl font-bold mt-1 text-zinc-850 dark:text-white">
              {evaluation.overallScore} / {evaluation.maxScore}
            </h4>
            <span className="text-[10px] text-zinc-500 font-sans mt-1 block">Marks Awarded</span>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">Accuracy</p>
            <h4 className="font-display text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
              {evaluation.accuracy}%
            </h4>
            <span className="text-[10px] text-zinc-500 font-sans mt-1 block">Attempt Precision</span>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">XP Gained</p>
            <h4 className="font-display text-2xl font-bold mt-1 text-amber-600 dark:text-amber-500 flex items-center justify-center gap-1">
              <Zap className="h-5 w-5 fill-amber-500 stroke-amber-600" />
              +{evaluation.rewards.xpGained}
            </h4>
            <span className="text-[10px] text-zinc-500 font-sans mt-1 block">Level progression</span>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">Time Taken</p>
            <h4 className="font-display text-2xl font-bold mt-1 text-zinc-800 dark:text-zinc-200">
              {evaluation.timeTaken}
            </h4>
            <span className="text-[10px] text-zinc-500 font-sans mt-1 block">Duration speed</span>
          </div>
        </div>

        {/* REWARDS & BADGES EARNED */}
        {evaluation.rewards.badgesEarned.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 mb-3.5">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Badges Unlocked</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {evaluation.rewards.badgesEarned.map((badge, idx) => (
                <div 
                  key={idx}
                  className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400"
                >
                  <Trophy className="h-3 w-3 text-amber-500" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CORE GRID: DETAILED REVIEW & LEARNING SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: DETAILED QUESTION REVIEW (Col-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-4 border-b border-zinc-100 pb-2 dark:border-zinc-800 flex items-center justify-between">
                <span>Itemized Grading Feedback</span>
                <span className="text-[10px] font-mono text-zinc-400 lowercase font-normal">
                  {evaluation.correctCount} correct • {evaluation.incorrectCount} incorrect
                </span>
              </h3>

              <div className="space-y-6">
                {evaluation.questionsAnalysis.map((analysis, index) => {
                  const originalQ = questions.find(q => q.id === analysis.questionId);
                  const isCorrect = analysis.status === "correct";
                  const isSkipped = analysis.status === "skipped";

                  return (
                    <div 
                      key={analysis.questionId} 
                      className={`border-b border-zinc-100 pb-5 last:border-0 last:pb-0 dark:border-zinc-800`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-bold text-zinc-850 dark:text-zinc-200 leading-relaxed">
                          <span className="text-emerald-600 dark:text-emerald-450 mr-1.5 font-bold">Q{index + 1}.</span>
                          {originalQ ? originalQ.question : "Question Detail"}
                        </p>
                        
                        {/* Status chip */}
                        {isCorrect ? (
                          <span className="inline-flex items-center space-x-1 text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded shrink-0">
                            <Check className="h-2.5 w-2.5" />
                            <span>CORRECT</span>
                          </span>
                        ) : isSkipped ? (
                          <span className="inline-flex items-center space-x-1 text-[9px] font-bold font-mono bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-0.5 rounded shrink-0">
                            <span>SKIPPED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[9px] font-bold font-mono bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400 px-2 py-0.5 rounded shrink-0">
                            <X className="h-2.5 w-2.5" />
                            <span>INCORRECT</span>
                          </span>
                        )}
                      </div>

                      {/* Answer Comparison */}
                      <div className="mt-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 dark:bg-zinc-850 dark:border-zinc-800/80 space-y-2 text-[11px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">Your Answer</span>
                            <span className={`font-semibold block ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : isSkipped ? "text-zinc-400 italic" : "text-red-700 dark:text-red-400"}`}>
                              {analysis.studentAnswer || "No response provided."}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">Reference Answer</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                              {analysis.correctAnswer}
                            </span>
                          </div>
                        </div>

                        {/* Alternative wording flag notice */}
                        {analysis.isAlternativeWordingUsed && (
                          <div className="rounded bg-amber-50/50 border border-amber-200/40 p-2 text-[10px] text-amber-800 dark:bg-amber-950/10 dark:text-amber-400 mt-1 flex items-center space-x-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                            <span>Alternative wording accepted. Conceptually matching reference standard.</span>
                          </div>
                        )}

                        {/* Detailed evaluative feedback */}
                        {analysis.detailedFeedback && (
                          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">Diagnostic Review</span>
                            <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans font-medium text-[11px]">
                              {analysis.detailedFeedback}
                            </p>
                          </div>
                        )}

                        {/* Explanatory concept note */}
                        {analysis.explanation && (
                          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-450 block font-bold">Explanation & Concept</span>
                            <p className="text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans text-[10px] mt-0.5">
                              {analysis.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: COMPREHENSIVE LEARNING SUMMARY (Col-1) */}
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 mb-3.5 border-b border-zinc-100 pb-2 dark:border-zinc-800">
                <Award className="h-4 w-4 text-emerald-500" />
                <span>Pedagogical Diagnostics</span>
              </h3>

              <div className="space-y-4 text-xs font-sans">
                {/* Estimated Skill Level */}
                <div className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-200 dark:bg-zinc-850 dark:border-zinc-800">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">ESTIMATED SKILL LEVEL</span>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-450 mt-1 block">
                    {evaluation.learningSummary.estimatedSkillLevel}
                  </span>
                </div>

                {/* Strengths */}
                {evaluation.learningSummary.strengths.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1 text-emerald-600">
                      <Check className="h-3 w-3" /> Core Strengths
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 dark:text-zinc-400 text-[11px] leading-relaxed">
                      {evaluation.learningSummary.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Topics to Improve */}
                {evaluation.learningSummary.topicsToImprove.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1 text-amber-600">
                      <Compass className="h-3 w-3" /> Areas for Growth
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 dark:text-zinc-400 text-[11px] leading-relaxed">
                      {evaluation.learningSummary.topicsToImprove.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Grammar mistakes */}
                {evaluation.learningSummary.grammarMistakes.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1 text-red-500">
                      <AlertCircle className="h-3 w-3" /> Grammar Feedback
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 dark:text-zinc-400 text-[11px] leading-relaxed">
                      {evaluation.learningSummary.grammarMistakes.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Vocabulary suggestions */}
                {evaluation.learningSummary.vocabularySuggestions.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                      <Sparkles className="h-3 w-3 text-amber-500" /> Vocabulary Enrichment
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 dark:text-zinc-400 text-[11px] leading-relaxed">
                      {evaluation.learningSummary.vocabularySuggestions.map((voc, idx) => (
                        <li key={idx}>{voc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reading Comprehension Skills */}
                {evaluation.learningSummary.readingSkills.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> Skills Evaluated
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {evaluation.learningSummary.readingSkills.map((sk, idx) => (
                        <span key={idx} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-350 rounded px-2 py-0.5 text-[9px] font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practice Recommendations */}
                {evaluation.learningSummary.practiceRecommendations.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-500" /> Practice Checklist
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 dark:text-zinc-400 text-[11px] leading-relaxed font-medium">
                      {evaluation.learningSummary.practiceRecommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DONE BUTTON */}
        <button
          onClick={handleFinishedReview}
          className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 py-3 text-xs font-semibold transition shadow-md cursor-pointer"
        >
          <CheckSquare className="h-4 w-4" />
          <span>Save Diagnostics & Finish practice Session</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn py-4 relative" id="worksheet-solver-stage">
      
      {/* EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-sm w-full rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 text-zinc-800 dark:text-zinc-200">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
              <h4 className="font-bold text-sm">Save draft & exit practice?</h4>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Your written draft answers are saved safely in this browser. You can return and resume practice at any time.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-750 dark:text-zinc-300 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Continue Solving
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 py-2 rounded-lg text-xs font-semibold text-white transition cursor-pointer"
              >
                Yes, Save & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-sm w-full rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 text-red-650 dark:text-red-400">
              <RotateCcw className="h-5 w-5 shrink-0" />
              <h4 className="font-bold text-sm">Reset entire sheet?</h4>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Are you sure you want to delete all written draft answers? This action cannot be undone.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-750 dark:text-zinc-300 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPractice}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Yes, Reset Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL SUBMIT CONFIRMATION */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-sm w-full rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 text-zinc-800 dark:text-zinc-200">
              <CheckSquare className="h-5 w-5 text-emerald-500 shrink-0" />
              <h4 className="font-bold text-sm">Submit worksheet attempt?</h4>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You have answered <strong className="font-bold">{stats.answered}</strong> of <strong className="font-bold">{questions.length}</strong> questions. Ready to submit for full AI evaluation?
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-750 dark:text-zinc-300 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={submitWorksheetAttempt}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATED EVALUATION LOADING LAYER */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm text-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full border border-emerald-500/10 bg-emerald-500/5 animate-pulse" />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-lg">
              <RefreshCw className="h-6 w-6 animate-spin" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-sm">
            <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest">
              Evaluating Worksheet
            </h4>
            <p className="text-[11px] text-emerald-400 font-mono font-bold transition-all h-4">
              {loadingMessages[loadingMsgIdx]}
            </p>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
              Our pedagogical evaluation engine is parsing context and validating answers against syllabus reference guidelines.
            </p>
          </div>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 text-xs font-semibold transition cursor-pointer"
            title="Save draft and exit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono font-bold uppercase text-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                Practice Session
              </span>
              {autoSaveNotification && (
                <span className="text-[9px] font-mono font-semibold text-zinc-400 animate-pulse">
                  Draft saved
                </span>
              )}
            </div>
            <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1 max-w-md">
              {title}
            </h2>
          </div>
        </div>

        {/* TIMER & TIMER SETTINGS */}
        <div className="flex items-center space-x-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1.5 border border-zinc-200/50 dark:border-zinc-800 text-xs">
          <button
            onClick={() => setIsTimed(!isTimed)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[10px] ${
              isTimed 
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs" 
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
            }`}
          >
            Timed Mode
          </button>
          
          <div className="flex items-center space-x-1.5 font-mono font-bold pr-2 text-[11px]">
            <Clock className={`h-3.5 w-3.5 ${isTimed && timeRemaining < 120 ? "text-red-500 animate-pulse" : "text-zinc-500"}`} />
            <span className={isTimed && timeRemaining < 120 ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
              {isTimed ? formatTime(timeRemaining) : formatTime(timeElapsed)}
            </span>
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: READING PASSAGE DRAWER (Col-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-xs overflow-hidden">
            <div className="bg-zinc-50 dark:bg-zinc-850 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Reference Passage</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                {config.passageLength} Length
              </span>
            </div>

            <div className="p-4 md:p-5 max-h-[500px] overflow-y-auto space-y-4 text-xs font-serif leading-relaxed text-zinc-750 dark:text-zinc-300 whitespace-pre-line border-b border-zinc-100 dark:border-zinc-850">
              {passageText}
            </div>
            
            {/* DIFFICULT WORDS CHEAT SHEET */}
            {passage.difficultWords && passage.difficultWords.length > 0 && (
              <div className="p-4 bg-amber-500/5 dark:bg-amber-950/10 border-t border-zinc-100 dark:border-zinc-850/60">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Compass className="h-4 w-4" /> Cheat-Sheet Vocabulary ({passage.difficultWords.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-sans">
                  {passage.difficultWords.map((wordObj, wIdx) => (
                    <div key={wIdx} className="rounded bg-white p-2 border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/80">
                      <strong className="font-extrabold text-zinc-800 dark:text-zinc-200 block">{wordObj.word}</strong>
                      <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">{wordObj.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: INTERACTIVE WORKSPACE SOLVER (Col-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* ACTIVE QUESTION PANEL */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs space-y-4 relative overflow-hidden">
            {/* Ribbon Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />

            {/* Top Row with question numbering and flags */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <span className="text-xs font-extrabold font-mono text-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded">
                Question {currentIdx + 1} of {questions.length}
              </span>
              
              <button
                type="button"
                onClick={() => handleToggleFlag(currentQuestion.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition cursor-pointer ${
                  flags[currentQuestion.id]
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    : "border-zinc-200/60 text-zinc-400 hover:text-zinc-650 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-850"
                }`}
              >
                <Flag className={`h-3 w-3 ${flags[currentQuestion.id] ? "fill-amber-500 stroke-amber-600" : ""}`} />
                <span>{flags[currentQuestion.id] ? "Flagged for Review" : "Flag"}</span>
              </button>
            </div>

            {/* Question Text Prompt */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                Type: {currentQuestion.type || "Descriptive"}
              </span>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed font-sans">
                {currentQuestion.question}
              </p>
              {currentQuestion.context && (
                <p className="text-[10px] leading-relaxed text-zinc-500 italic bg-zinc-50/70 border border-zinc-150 p-2.5 rounded-lg dark:bg-zinc-850 dark:border-zinc-800/85">
                  Context: {currentQuestion.context}
                </p>
              )}
            </div>

            {/* INPUT CONTROLS SLOW CONDUIT */}
            <div className="pt-2">
              {renderQuestionInput(currentQuestion)}
            </div>

            {/* PREVIOUS / NEXT COMPACT ROUTE */}
            <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                className={`inline-flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentIdx === 0
                    ? "opacity-35 select-none pointer-events-none text-zinc-400"
                    : "text-zinc-600 hover:bg-zinc-55 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850 dark:hover:text-white"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev Question</span>
              </button>

              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className={`inline-flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentIdx === questions.length - 1
                    ? "opacity-35 select-none pointer-events-none text-zinc-400"
                    : "text-zinc-600 hover:bg-zinc-55 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850 dark:hover:text-white"
                }`}
              >
                <span>Next Question</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* QUESTION NAVIGATION GRID & SUBMIT CARD */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800 text-[11px] font-sans">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Question Navigator</span>
              <div className="flex space-x-3 font-mono text-[9px] text-zinc-400 font-bold uppercase">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> {stats.answered} Answered</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> {stats.flagged} Flagged</span>
              </div>
            </div>

            {/* GRID OF QUESTION CHIPS */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const isSelected = idx === currentIdx;
                const isAnswered = answers[q.id] && answers[q.id].trim() !== "";
                const isFlagged = flags[q.id];

                let chipClass = "border-2 border-zinc-200 text-zinc-500 hover:border-zinc-350 dark:border-zinc-800 dark:text-zinc-400";
                if (isAnswered) {
                  chipClass = "border-2 border-emerald-500 text-emerald-800 bg-emerald-500/5 hover:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/40";
                }
                if (isFlagged) {
                  chipClass = "border-2 border-amber-500 text-amber-800 bg-amber-500/5 hover:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/40";
                }
                if (isSelected) {
                  chipClass = "border-2 border-zinc-900 text-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:text-white dark:bg-zinc-850 font-bold scale-105";
                }

                return (
                  <button
                    type="button"
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${chipClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* BUTTONS ROW */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center justify-center space-x-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-850 text-zinc-550 dark:text-zinc-400 py-2.5 text-xs font-semibold transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Answers</span>
              </button>

              <button
                type="button"
                onClick={handleManualSubmitClick}
                className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Worksheet</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
