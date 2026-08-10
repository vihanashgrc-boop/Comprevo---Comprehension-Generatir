import React, { useState } from "react";
import { GeneratedPassage, Question, DifficultWord, UserProfile } from "../types";
import { jsPDF } from "jspdf";
import { 
  Sparkles, Check, Download, Copy, Printer, Share2, BookOpen, 
  HelpCircle, Award, ListChecks, ArrowLeft, RefreshCw, AlertCircle,
  Eye, MessageSquare, Send, BookMarked, AlignLeft, GraduationCap, Compass, Play, Trophy, Clock
} from "lucide-react";

interface PassageViewerProps {
  data: GeneratedPassage;
  onModify: (action: string, instructions?: string) => Promise<void>;
  onBack: () => void;
  isModifying: boolean;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  user: UserProfile;
  onStartSolving: () => void;
}

export default function PassageViewer({
  data,
  onModify,
  onBack,
  isModifying,
  onToggleFavorite,
  isFavorite,
  user,
  onStartSolving,
}: PassageViewerProps) {
  // Navigation & Toggle States
  const [activeTab, setActiveTab] = useState<"read" | "attempt" | "results">("read");
  const [highlightVocab, setHighlightVocab] = useState(true);
  const [selectedWord, setSelectedWord] = useState<DifficultWord | null>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Attempt State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attemptSubmitted, setAttemptSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Reading Assistant Chat State
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "tutor"; text: string }>>([
    { sender: "tutor", text: "Hello! I am your Reading Coach. If you are stuck on a difficult sentence, want a word defined, or need help understanding a paragraph, ask me here. I'm happy to help you learn!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loadingAssistant, setLoadingAssistant] = useState(false);

  // Copy/Share status
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Calculate score on submission
  const handleAttemptSubmit = () => {
    let rightCount = 0;
    data.questions.forEach((q) => {
      const userAnswer = (answers[q.id] || "").trim().toLowerCase();
      const correctAnswer = q.answer.trim().toLowerCase();
      
      if (q.type === "mcq" || q.type === "trueFalse") {
        const userLetter = userAnswer.charAt(0);
        const correctLetter = correctAnswer.charAt(0);
        if (userLetter === correctLetter || userAnswer === correctAnswer) {
          rightCount++;
        }
      } else {
        const cleanCorrect = correctAnswer.replace(/[^\w\s]/g, "");
        const cleanUser = userAnswer.replace(/[^\w\s]/g, "");
        const commonWordsCount = cleanUser.split(" ").filter(w => w && cleanCorrect.includes(w)).length;
        if (commonWordsCount > 0 || cleanCorrect === cleanUser) {
          rightCount++;
        }
      }
    });
    setScore(rightCount);
    setAttemptSubmitted(true);
    setActiveTab("results");
  };

  // Assistant Chat trigger
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loadingAssistant) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setLoadingAssistant(true);

    try {
      const response = await fetch("/api/generate-passage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: `Tutor explanation regarding: "${data.title}"`,
          passageType: "Informative explanation",
          academicLevel: data.config.academicLevel,
          board: data.config.board,
          difficulty: data.config.difficulty,
          questionTypes: ["oneWord"],
          language: data.config.language,
          aiFeature: `You are a supportive, enthusiastic school tutor. Clarify, simplify, and teach.
          Here is the passage the student is reading:
          "${data.passage}"

          Answer the student's question precisely, keeping it under 100 words. Focus on teaching the grammar, vocabulary, or theme simply.
          Student's question: "${userText}"`
        })
      });

      const resData = await response.json();
      const tutorReply = resData.passage || "I'm ready to help you analyze this text! Let's break down any sentences or ideas you find confusing.";
      
      setChatMessages((prev) => [...prev, { sender: "tutor", text: tutorReply }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { sender: "tutor", text: "Oops, I had trouble connecting. Please ask again!" }]);
    } finally {
      setLoadingAssistant(false);
    }
  };

  // Helper to highlight terms inside the body
  const renderPassageWithHighlights = () => {
    if (!highlightVocab || data.difficultWords.length === 0) {
      return <p className="whitespace-pre-line text-sm md:text-base leading-relaxed font-serif text-zinc-800 dark:text-zinc-200 tracking-normal">{data.passage}</p>;
    }

    let text = data.passage;
    const sortedWords = [...data.difficultWords].sort((a, b) => b.word.length - a.word.length);
    
    const parts: { type: "text" | "word"; content: string; wordObj?: DifficultWord }[] = [];
    let currentIdx = 0;

    const escWords = sortedWords.map(w => w.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    const regex = new RegExp(`\\b(${escWords})\\b`, "gi");

    let match;
    while ((match = regex.exec(text)) !== null) {
      const matchText = match[0];
      const matchIdx = match.index;

      if (matchIdx > currentIdx) {
        parts.push({ type: "text", content: text.substring(currentIdx, matchIdx) });
      }

      const originalWordObj = data.difficultWords.find(
        (w) => w.word.toLowerCase() === matchText.toLowerCase()
      );
      parts.push({
        type: "word",
        content: matchText,
        wordObj: originalWordObj
      });

      currentIdx = regex.lastIndex;
    }

    if (currentIdx < text.length) {
      parts.push({ type: "text", content: text.substring(currentIdx) });
    }

    return (
      <div className="whitespace-pre-line text-sm md:text-base leading-relaxed font-serif text-zinc-850 dark:text-zinc-150 tracking-normal">
        {parts.map((p, idx) => {
          if (p.type === "word" && p.wordObj) {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedWord(p.wordObj!)}
                className="mx-0.5 border-b-2 border-emerald-500/50 hover:bg-emerald-50/50 text-emerald-800 dark:text-emerald-400 font-bold font-serif cursor-help transition px-0.5 rounded-xs"
                title="Click for dictionary meaning"
              >
                {p.content}
              </button>
            );
          }
          return <React.Fragment key={idx}>{p.content}</React.Fragment>;
        })}
      </div>
    );
  };

  // COPY WORKSHEET TO CLIPBOARD
  const handleCopy = () => {
    let content = `TITLE: ${data.title}\n\n`;
    content += `PASSAGE:\n${data.passage}\n\n`;
    content += `DIFFICULT VOCABULARY:\n`;
    data.difficultWords.forEach((v) => {
      content += `- ${v.word}: ${v.meaning} (Example: ${v.contextSentence})\n`;
    });
    content += `\nQUESTIONS:\n`;
    data.questions.forEach((q, i) => {
      content += `${i + 1}. [${q.type}] ${q.question}\n`;
      if (q.options) {
        content += `Options: ${q.options.join(" | ")}\n`;
      }
    });
    content += `\nANSWER KEY & EXPLANATIONS:\n`;
    data.questions.forEach((q, i) => {
      content += `${i + 1}. Answer: ${q.answer}\nExplanation: ${q.explanation}\n\n`;
    });

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // PRINT DIRECTLY
  const handlePrint = () => {
    window.print();
  };

  // SHARE LINK
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // PDF DOWNLOAD (jspdf implementation)
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPageOverflow = (neededHeight: number) => {
      if (y + neededHeight > 280) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(5, 150, 105); // emerald color theme
    doc.text(`${data.config.board.toUpperCase()} WORKSHEET - ${data.config.academicLevel.toUpperCase()}`, margin, y);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(113, 113, 122);
    doc.text(`Level: ${data.config.difficulty} | Language: ${data.config.language}`, pageWidth - margin - 50, y);
    y += 4;
    doc.setDrawColor(228, 228, 231);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 24, 27); 
    const titleLines = doc.splitTextToSize(data.title, contentWidth);
    doc.text(titleLines, margin, y);
    y += (titleLines.length * 6) + 4;

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(161, 161, 170);
    doc.text(`Reading Duration: ~${data.estimatedReadingTime} minutes`, margin, y);
    y += 8;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(39, 39, 42); 
    const passageLines = doc.splitTextToSize(data.passage, contentWidth);
    
    passageLines.forEach((line: string) => {
      checkPageOverflow(6);
      doc.text(line, margin, y);
      y += 5.5;
    });
    y += 8;

    checkPageOverflow(40);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(24, 24, 27);
    doc.text("Word Dictionary", margin, y);
    y += 6;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    data.difficultWords.forEach((word) => {
      checkPageOverflow(12);
      doc.setFont("Helvetica", "bold");
      doc.text(`${word.word}: `, margin, y);
      doc.setFont("Helvetica", "normal");
      
      const meanLines = doc.splitTextToSize(`${word.meaning}`, contentWidth - 30);
      doc.text(meanLines, margin + 25, y);
      y += (meanLines.length * 4.5) + 3;
    });
    y += 8;

    checkPageOverflow(20);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(24, 24, 27);
    doc.text("Questions", margin, y);
    y += 8;

    data.questions.forEach((q, idx) => {
      const qText = `${idx + 1}. [${q.type.toUpperCase()}] ${q.question}`;
      const qLines = doc.splitTextToSize(qText, contentWidth);
      checkPageOverflow((qLines.length * 5) + 12);
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(qLines, margin, y);
      y += (qLines.length * 5) + 3;

      if (q.options && q.options.length > 0) {
        doc.setFont("Helvetica", "normal");
        q.options.forEach((opt) => {
          checkPageOverflow(6);
          doc.text(`   [  ]  ${opt}`, margin + 4, y);
          y += 5;
        });
        y += 2;
      } else {
        checkPageOverflow(10);
        doc.setDrawColor(212, 212, 216);
        doc.line(margin + 4, y + 4, margin + 120, y + 4);
        y += 8;
      }
      y += 3;
    });

    doc.addPage();
    y = 20;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(24, 24, 27);
    doc.text("Answers & Explanations", margin, y);
    y += 8;

    data.questions.forEach((q, idx) => {
      checkPageOverflow(25);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(`Question ${idx + 1}: ${q.question.substring(0, 50)}...`, margin, y);
      y += 5;

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(16, 185, 129); 
      doc.text(`Correct Answer: ${q.answer}`, margin + 4, y);
      y += 5;

      doc.setFont("Helvetica", "normal");
      doc.setTextColor(113, 113, 122); 
      const expLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, contentWidth - 10);
      doc.text(expLines, margin + 4, y);
      y += (expLines.length * 4.5) + 6;
      doc.setTextColor(24, 24, 27); 
    });

    doc.save(`${data.title.replace(/\s+/g, "_")}_Worksheet.pdf`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 relative" id="passage-workspace">
      
      {/* LEFT: MAIN PASSAGE CONTAINER & TOOLBAR (Col-7) */}
      <div className="lg:col-span-7 space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs relative">
          
          {/* Back & Title metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-zinc-200 bg-white py-1.5 px-3 text-xs font-semibold text-zinc-650 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Choose</span>
            </button>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 text-[9px] font-mono font-bold text-zinc-500 uppercase dark:bg-zinc-800 dark:border-zinc-750">
                {data.config.board}
              </span>
              <span className="inline-flex items-center rounded-md bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 text-[9px] font-mono font-bold text-zinc-500 uppercase dark:bg-zinc-800 dark:border-zinc-750">
                {data.config.academicLevel}
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-150 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-800 uppercase dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
                {data.config.difficulty} {data.randomizedFields?.difficulty && "(Random)"}
              </span>
            </div>
          </div>

          {/* Prompt Adjustment Bar (no flashy elements, elegant and solid) */}
          <div className="my-4.5 flex flex-wrap gap-1.5 rounded-lg bg-zinc-50 p-2 border border-zinc-200 dark:bg-zinc-850 dark:border-zinc-800">
            <button
              onClick={() => onModify("simplify_passage")}
              disabled={isModifying}
              className="px-2.5 py-1.5 text-[10px] font-bold rounded-md border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition disabled:opacity-50 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-350 dark:hover:bg-zinc-700 cursor-pointer flex items-center space-x-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Make Simpler</span>
            </button>

            <button
              onClick={() => onModify("improve_vocabulary")}
              disabled={isModifying}
              className="px-2.5 py-1.5 text-[10px] font-bold rounded-md border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-750 transition disabled:opacity-50 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-350 dark:hover:bg-zinc-700 cursor-pointer flex items-center space-x-1"
            >
              <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span>Enrich Vocab</span>
            </button>

            <button
              onClick={() => onModify("increase_difficulty")}
              disabled={isModifying}
              className="px-2.5 py-1.5 text-[10px] font-bold rounded-md border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition disabled:opacity-50 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-350 dark:hover:bg-zinc-700 cursor-pointer flex items-center space-x-1"
            >
              <Eye className="h-3 w-3 text-zinc-500" />
              <span>Harder</span>
            </button>

            <button
              onClick={() => onModify("decrease_difficulty")}
              disabled={isModifying}
              className="px-2.5 py-1.5 text-[10px] font-bold rounded-md border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition disabled:opacity-50 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-350 dark:hover:bg-zinc-700 cursor-pointer flex items-center space-x-1"
            >
              <Eye className="h-3 w-3 text-emerald-600" />
              <span>Easier</span>
            </button>

            <button
              onClick={() => onModify("regenerate_questions")}
              disabled={isModifying}
              className="px-2.5 py-1.5 text-[10px] font-bold rounded-md border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition disabled:opacity-50 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-350 dark:hover:bg-zinc-700 cursor-pointer flex items-center space-x-1"
            >
              <RefreshCw className="h-3 w-3 text-zinc-500" />
              <span>Reset Questions</span>
            </button>
          </div>

          {/* Loading status overlay */}
          {isModifying && (
            <div className="absolute inset-0 bg-zinc-900/10 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-xl">
              <div className="flex flex-col items-center bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-2.5 animate-pulse">
                <RefreshCw className="h-5 w-5 text-emerald-600 animate-spin" />
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-250">Rebuilding worksheet...</p>
              </div>
            </div>
          )}

          {/* Passage Area */}
          <div className="space-y-4 px-1">
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-display text-2xl font-bold text-zinc-950 dark:text-white leading-snug">
                {data.title}
              </h1>
              <button
                onClick={() => onToggleFavorite(data.id)}
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-lg"
                title="Add to Saved"
              >
                <span>{isFavorite ? "★ Starred" : "☆ Star"}</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-zinc-400 font-mono font-medium">
              <span>⏱ READ TIME: ~{data.estimatedReadingTime} MINS</span>
              <span>•</span>
              <button
                onClick={() => setHighlightVocab(!highlightVocab)}
                className="text-emerald-600 dark:text-emerald-450 hover:underline cursor-pointer font-bold uppercase tracking-wider text-[9px]"
              >
                <span>{highlightVocab ? "HIDE TARGET WORDS" : "HIGHLIGHT TARGET WORDS"}</span>
              </button>
            </div>

            {/* Render with dynamic Highlights / dictionary tool */}
            <div className="relative border-l border-emerald-500/20 pl-4 py-1.5 dark:border-emerald-500/30">
              {renderPassageWithHighlights()}
            </div>
          </div>

          {/* Dictionary definitions popup panel */}
          {selectedWord && (
            <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 animate-fadeIn dark:border-zinc-800 dark:bg-zinc-850/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BookMarked className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                  <strong className="text-xs text-zinc-900 dark:text-zinc-250 uppercase tracking-widest font-mono font-bold">{selectedWord.word}</strong>
                </div>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-zinc-450 hover:text-zinc-700 dark:hover:text-zinc-200 text-[10px] font-mono tracking-tight cursor-pointer"
                >
                  ✕ CLOSE DEFINITION
                </button>
              </div>
              <p className="text-xs text-zinc-700 mt-2.5 dark:text-zinc-350">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Meaning: </span>
                {selectedWord.meaning}
              </p>
              <p className="text-xs text-zinc-500 italic mt-1.5 leading-relaxed dark:text-zinc-405">
                <span className="font-semibold text-zinc-650 dark:text-zinc-350">Usage Example: </span>
                "{selectedWord.contextSentence}"
              </p>
            </div>
          )}

          {/* Detailed Configuration Metadata */}
          <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4.5 dark:border-zinc-800 dark:bg-zinc-850/40">
            <div className="flex items-center space-x-1.5 mb-3.5 border-b border-zinc-250 pb-2 dark:border-zinc-800">
              <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h5 className="text-[10px] font-mono font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">WORKSHEET BLUEPRINT SETTINGS</h5>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-[11px] font-sans">
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Syllabus Theme</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.topic}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Literary Genre</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.passageType}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Length Target</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.passageLength}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Vocabulary Level</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.vocabularyLevel}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Complexity</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.difficulty}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono font-bold text-[9px] tracking-wider uppercase">Medium</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-250">
                  {data.config.language}
                </span>
              </div>
            </div>

            {/* Randomized lists */}
            {(data.randomizedFields?.grammarOptions || data.randomizedFields?.questionTypes || data.randomizedFields?.learningObjectives) && (
              <div className="mt-4 pt-3.5 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5 text-[10px] font-sans">
                {data.randomizedFields?.grammarOptions && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-1">Grammar targets:</span>
                    {data.randomizedFields.grammarOptions.map((g) => (
                      <span key={g} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 rounded px-2 py-0.5 font-bold text-[9px]">
                        {g}
                      </span>
                    ))}
                  </div>
                )}
                {data.randomizedFields?.questionTypes && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-1">Formats:</span>
                    {data.randomizedFields.questionTypes.map((qt) => {
                      const displayLabel = qt === "mcq" ? "MCQs" : qt === "trueFalse" ? "True/False" : qt === "fillBlanks" ? "Fill Blanks" : qt === "matchFollowing" ? "Match Following" : qt === "oneWord" ? "One Word" : qt === "shortAnswer" ? "Short Answer" : qt === "longAnswer" ? "Long Answer" : qt;
                      return (
                        <span key={qt} className="bg-zinc-100 text-zinc-750 dark:bg-zinc-800 dark:text-zinc-450 rounded px-2 py-0.5 font-bold text-[9px]">
                          {displayLabel}
                        </span>
                      );
                    })}
                  </div>
                )}
                {data.randomizedFields?.learningObjectives && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-1">Objectives:</span>
                    {data.randomizedFields.learningObjectives.map((o) => (
                      <span key={o} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 rounded px-2 py-0.5 font-bold text-[9px]">
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Curriculum Compliance Summary notes */}
          <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800 dark:bg-zinc-850/30">
            <span className="font-bold text-zinc-750 dark:text-zinc-300 block mb-1">Academic Standards Compliance</span>
            {data.curriculumComplianceNotes}
          </div>
        </div>
      </div>

      {/* RIGHT: TABS FOR ASSESSMENT & RESULTS (Col-5) */}
      <div className="lg:col-span-5 space-y-5">
        
        {/* Workspace Toolbar / Exporters */}
        <div className="rounded-xl border border-zinc-200 bg-white p-2.5 flex flex-wrap gap-2 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 min-w-[75px] inline-flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 py-2 text-xs font-semibold transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>PDF</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 min-w-[75px] inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-350 dark:hover:bg-zinc-850 transition cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex-1 min-w-[75px] inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-650 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 min-w-[75px] inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-650 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{shared ? "Shared" : "Share"}</span>
          </button>
        </div>

        {/* Assessment tab selectors */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-850">
            <button
              onClick={() => setActiveTab("read")}
              className={`py-2 text-center text-xs font-bold rounded-md transition cursor-pointer ${
                activeTab === "read"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
              }`}
            >
              Question Key
            </button>
            <button
              onClick={() => setActiveTab("attempt")}
              className={`py-2 text-center text-xs font-bold rounded-md transition cursor-pointer ${
                activeTab === "attempt"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
              }`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => {
                const hasCompleted = (user?.completedWorksheets || []).some((w) => w.passageId === data.id);
                if (!attemptSubmitted && !hasCompleted) {
                  setAlertMsg("Please solve the worksheet in Practice Mode first to unlock results.");
                  setTimeout(() => setAlertMsg(null), 3500);
                  return;
                }
                setActiveTab("results");
              }}
              className={`py-2 text-center text-xs font-bold rounded-md transition cursor-pointer ${
                activeTab === "results"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-750 dark:text-white"
                  : "text-zinc-550 hover:text-zinc-900 dark:text-zinc-400"
              }`}
            >
              Your Results
            </button>
          </div>

          <div className="p-5 relative">
            {alertMsg && (
              <div className="absolute top-2 left-2 right-2 bg-zinc-900 text-white p-3 rounded-lg text-xs font-semibold shadow-md flex items-center space-x-2 z-10 animate-fadeIn dark:bg-zinc-100 dark:text-zinc-950">
                <AlertCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="flex-grow">{alertMsg}</span>
                <button type="button" onClick={() => setAlertMsg(null)} className="font-bold opacity-80 cursor-pointer">✕</button>
              </div>
            )}
            
            {/* TAB 1: QUESTION KEY & SOLUTION VIEW */}
            {activeTab === "read" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                  <span className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-100">Worksheet Questions ({data.questions.length})</span>
                </div>

                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                  {data.questions.map((q, idx) => (
                    <div key={q.id} className="border-b border-zinc-100 pb-3.5 last:border-0 dark:border-zinc-800 font-sans">
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">Q{idx + 1}.</span> {q.question}
                      </p>
                      
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                          {q.options.map((opt, oIdx) => (
                            <span key={oIdx} className="text-[10px] bg-zinc-50 border border-zinc-150 px-2 py-1 rounded text-zinc-600 dark:bg-zinc-850 dark:border-zinc-800 dark:text-zinc-400">
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}

                      <details className="mt-3 text-xs">
                        <summary className="cursor-pointer font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                          View Answer & Analysis
                        </summary>
                        <div className="mt-2 bg-zinc-50 p-3 rounded-lg border border-zinc-150 space-y-1.5 dark:bg-zinc-850 dark:border-zinc-800">
                          <p className="font-bold text-emerald-700 dark:text-emerald-400">
                            Answer: {q.answer}
                          </p>
                          <p className="text-zinc-550 leading-relaxed dark:text-zinc-400">
                            {q.explanation}
                          </p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: EXAM ATTEMPT PRACTICE LAUNCHER BOARD */}
            {activeTab === "attempt" && (() => {
              const hasDraft = !!localStorage.getItem(`passage_draft_answers_${data.id}`);
              const attempts = (user?.completedWorksheets || []).filter((w) => w.passageId === data.id);
              
              // Stats derivation
              const bestScore = attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;
              const avgPercentage = attempts.length > 0 
                ? Math.round(attempts.reduce((acc, curr) => acc + curr.percentage, 0) / attempts.length) 
                : 0;

              return (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                    <span className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-100">Practice Hub</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-150 rounded px-1.5 py-0.5 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">INTERACTIVE SYSTEM</span>
                  </div>

                  {/* LAUNCH SESSION BANNER CARD */}
                  <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-850 shadow-xs text-center space-y-4">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-450">
                      <Play className="h-5 w-5 fill-emerald-500 stroke-emerald-600" />
                    </div>

                    <div className="space-y-1 max-w-sm mx-auto">
                      <h4 className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        {hasDraft ? "Resume Active Session" : "Start Reading Assessment"}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                        {hasDraft 
                          ? "You have a pending saved draft. Continue from where you left off with zero progress lost!" 
                          : "Answer interactive questions with an integrated challenge timer, flag system, and automated evaluation."}
                      </p>
                    </div>

                    <div className="flex justify-center items-center gap-4 text-[10px] font-mono text-zinc-450 font-bold uppercase">
                      <span>{data.questions.length} Questions</span>
                      <span className="text-zinc-300 dark:text-zinc-800">•</span>
                      <span>~15 Mins Target</span>
                    </div>

                    <button
                      onClick={onStartSolving}
                      className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>{hasDraft ? "Resume Practice Session" : "Start Solving Worksheet"}</span>
                    </button>
                  </div>

                  {/* PERFORMANCE STATS SUB-BOARD */}
                  {attempts.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-zinc-200 bg-white p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">BEST GRADE</p>
                        <h4 className="text-xl font-bold font-display mt-0.5 text-zinc-850 dark:text-white">
                          {bestScore} / {data.questions.length}
                        </h4>
                      </div>
                      <div className="rounded-lg border border-zinc-200 bg-white p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">AVG PRECISION</p>
                        <h4 className="text-xl font-bold font-display mt-0.5 text-emerald-600 dark:text-emerald-400">
                          {avgPercentage}%
                        </h4>
                      </div>
                    </div>
                  )}

                  {/* PREVIOUS PRACTICE ATTEMPTS HISTORY */}
                  {attempts.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">Recent Attempts</h5>
                      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 font-sans">
                        {attempts.map((attempt, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-950/20 text-[10px]"
                          >
                            <div className="space-y-0.5">
                              <span className="font-bold text-zinc-700 dark:text-zinc-300 block">Attempt #{attempts.length - index}</span>
                              <span className="text-zinc-400 text-[9px] block flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {attempt.timestamp}
                              </span>
                            </div>
                            
                            <div className="text-right space-y-0.5">
                              <span className="font-extrabold text-zinc-850 dark:text-zinc-100 block">
                                {attempt.score} / {attempt.maxScore}
                              </span>
                              <span className="text-emerald-600 dark:text-emerald-450 font-bold block text-[9px]">
                                {attempt.percentage}% Correct
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* TAB 3: REVIEW RESULTS & SCORES */}
            {activeTab === "results" && (() => {
              const passageAttempts = (user?.completedWorksheets || []).filter((w) => w.passageId === data.id);
              const latestEvalAttempt = passageAttempts[0];

              if (latestEvalAttempt && latestEvalAttempt.evaluation) {
                const evalObj = latestEvalAttempt.evaluation;
                return (
                  <div className="space-y-4 font-sans">
                    {/* Score Card */}
                    <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-850 shadow-xs text-center">
                      <Award className="mx-auto h-7 w-7 text-emerald-600 dark:text-emerald-400 mb-1" />
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">Latest Diagnostic Score</p>
                      <h4 className="font-display text-2xl font-bold mt-1 text-zinc-905 dark:text-white">
                        {evalObj.overallScore} / {evalObj.maxScore}
                      </h4>
                      <div className="mt-2 inline-flex items-center rounded bg-emerald-50 border border-emerald-150 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
                        SKILL: {evalObj.learningSummary.estimatedSkillLevel}
                      </div>
                    </div>

                    {/* Quick Diagnostic Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="rounded bg-zinc-50 border border-zinc-200 p-2 dark:bg-zinc-850 dark:border-zinc-800">
                        <span className="text-zinc-400 block font-mono">ACCURACY</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-450">{evalObj.accuracy}%</span>
                      </div>
                      <div className="rounded bg-zinc-50 border border-zinc-200 p-2 dark:bg-zinc-850 dark:border-zinc-800">
                        <span className="text-zinc-400 block font-mono">TIME TAKEN</span>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{evalObj.timeTaken}</span>
                      </div>
                      <div className="rounded bg-zinc-50 border border-zinc-200 p-2 dark:bg-zinc-850 dark:border-zinc-800">
                        <span className="text-zinc-400 block font-mono">XP REWARD</span>
                        <span className="font-bold text-amber-600">+{evalObj.rewards?.xpGained || 50}</span>
                      </div>
                    </div>

                    {/* Strengths & Growth Areas Checklist */}
                    <div className="space-y-3.5 text-[11px] leading-relaxed border-t border-b border-zinc-150 dark:border-zinc-800 py-3">
                      {evalObj.learningSummary.strengths.length > 0 && (
                        <div>
                          <span className="font-extrabold text-emerald-700 dark:text-emerald-450 block uppercase tracking-wider text-[9px]">✔ Core Strengths</span>
                          <p className="text-zinc-650 dark:text-zinc-400 mt-0.5">{evalObj.learningSummary.strengths[0]}</p>
                        </div>
                      )}
                      {evalObj.learningSummary.topicsToImprove.length > 0 && (
                        <div>
                          <span className="font-extrabold text-amber-700 dark:text-amber-500 block uppercase tracking-wider text-[9px]">▲ Focus Areas</span>
                          <p className="text-zinc-650 dark:text-zinc-400 mt-0.5">{evalObj.learningSummary.topicsToImprove[0]}</p>
                        </div>
                      )}
                      {evalObj.learningSummary.practiceRecommendations.length > 0 && (
                        <div>
                          <span className="font-extrabold text-zinc-500 block uppercase tracking-wider text-[9px]">★ Recommendation</span>
                          <p className="text-zinc-500 italic mt-0.5">{evalObj.learningSummary.practiceRecommendations[0]}</p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 text-center text-[10px] font-bold">
                      <button
                        onClick={onStartSolving}
                        className="flex-1 py-2 text-center text-xs font-bold rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-650 transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
                      >
                        Practice Again
                      </button>
                    </div>
                  </div>
                );
              }

              // Fallback for simple local scores
              return (
                <div className="space-y-4">
                  {/* Score Summary Card */}
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900 font-sans">
                    <Award className="mx-auto h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">DIAGNOSTIC SCORE</p>
                    <h4 className="font-display text-3xl font-bold mt-1 text-zinc-905 dark:text-white">
                      {score} / {data.questions.length}
                    </h4>
                    <div className="mt-2.5 inline-flex items-center rounded bg-emerald-50 border border-emerald-150 px-3 py-1 text-[10px] font-mono font-bold text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
                      GRADE OUTCOME: {score === data.questions.length ? "EXCELLENT" : score >= data.questions.length * 0.7 ? "SCHOLASTIC" : "FOUNDATIONAL"}
                    </div>
                  </div>

                  {/* Question review */}
                  <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1 font-sans">
                    {data.questions.map((q, idx) => {
                      const userAnswer = answers[q.id] || "No answer submitted";
                      const isCorrect = (q.type === "mcq" || q.type === "trueFalse") 
                        ? userAnswer.charAt(0).toLowerCase() === q.answer.charAt(0).toLowerCase() 
                        : userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();

                      return (
                        <div key={q.id} className="border-b border-zinc-100 pb-3 last:border-0 dark:border-zinc-800 text-[11px]">
                          <p className="font-bold text-zinc-850 dark:text-zinc-200">
                            Q{idx + 1}. {q.question}
                          </p>
                          
                          <div className="mt-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 space-y-1">
                            <p className={isCorrect ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                              Your Answer: {userAnswer}
                            </p>
                            <p className="text-zinc-800 dark:text-zinc-250 font-bold">
                              Correct Answer: {q.answer}
                            </p>
                            <p className="text-zinc-500 italic leading-relaxed mt-1.5 dark:text-zinc-400">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setAnswers({});
                        setAttemptSubmitted(false);
                        setActiveTab("attempt");
                      }}
                      className="flex-1 py-2 text-center text-xs font-bold rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-650 transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => onModify("regenerate_questions")}
                      className="flex-1 py-2 text-center text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-850 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 transition cursor-pointer"
                    >
                      New Questions
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Reading Assistant Floating Panel Trigger */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <MessageSquare className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h5 className="font-sans text-xs font-bold text-zinc-850 dark:text-zinc-100">Reading Coach</h5>
                <p className="text-[10px] text-zinc-400">Query semantic breakdowns and word origins.</p>
              </div>
            </div>
            <button
              onClick={() => setAssistantOpen(!assistantOpen)}
              className="px-3 py-1 bg-zinc-100 hover:bg-zinc-250 text-zinc-700 font-bold text-[10px] rounded transition dark:bg-zinc-800 dark:text-zinc-355 dark:hover:bg-zinc-750 cursor-pointer"
            >
              {assistantOpen ? "Close Coach" : "Ask Coach"}
            </button>
          </div>

          {/* Expanded Reading Assistant Panel */}
          {assistantOpen && (
            <div className="mt-4 flex flex-col h-[280px]">
              <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 max-h-[190px]">
                {chatMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wide mb-0.5">
                      {msg.sender === "user" ? "You" : "Coach"}
                    </span>
                    <p className={`text-xs rounded p-2.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-zinc-900 text-white rounded-tr-none dark:bg-zinc-100 dark:text-zinc-900 font-medium"
                        : "bg-zinc-50 text-zinc-700 rounded-tl-none dark:bg-zinc-850 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800"
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                ))}
                {loadingAssistant && (
                  <div className="flex items-center space-x-2 animate-pulse">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest">Coach is researching...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChatMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about the text..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow rounded-lg border border-zinc-200 py-1.5 px-3 text-xs outline-none transition focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={loadingAssistant || !chatInput.trim()}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 transition disabled:opacity-40 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
