import React, { useState, useEffect } from "react";
import { 
  BoardType, DifficultyLevel, PassageTopic, PassageType, PassageLengthType, 
  WordCountOption, VocabularyLevel 
} from "../types";
import { 
  ArrowLeft, ArrowRight, Settings, AlignLeft, Sparkles, BookOpen, 
  CheckSquare, HelpCircle, Languages, Activity, Check, Compass, AlertCircle
} from "lucide-react";

interface StepConfigureProps {
  board: BoardType;
  academicLevel: string;
  difficulty: DifficultyLevel;
  onSubmit: (config: any) => void;
  onPrev: () => void;
  errorText?: string;
}

export default function StepConfigure({
  board,
  academicLevel,
  difficulty,
  onSubmit,
  onPrev,
  errorText,
}: StepConfigureProps) {
  // Passage Topics
  const topics: PassageTopic[] = [
    "Science", "Space", "Environment", "History", "Geography", "Technology", 
    "AI", "Wildlife", "Sports", "Indian Culture", "Festivals", "Health", 
    "Current Affairs", "Literature", "Biography", "Economics", "Agriculture", 
    "Astronomy", "Custom", "Random"
  ];

  // Passage Genres / Comprehension Categories
  const types: PassageType[] = [
    "Informative", "Narrative", "Descriptive", "Expository", "Analytical", 
    "Argumentative", "Persuasive", "Historical", "Scientific", "Biographical", 
    "Editorial", "Literary", "Fiction", "Adventure", "Moral Story", 
    "Editorial Style", "Data Interpretation", "Random"
  ];

  // Word count options
  const wordCountOptions: WordCountOption[] = [
    "100", "150", "200", "250", "300", "400", "500", "700", "1000", "Random"
  ];

  // Vocab level
  const vocabLevels: VocabularyLevel[] = [
    "Basic", "Grade-Level Standard", "Advanced", "Competitive Exam Level", "Random"
  ];

  // Question Options
  const questionTypeOptions = [
    { id: "random", label: "Random (Dynamic selection)", category: "Dynamic" },
    { id: "mcq", label: "Multiple Choice Questions (MCQs)", category: "Objective" },
    { id: "trueFalse", label: "True / False Questions", category: "Objective" },
    { id: "fillBlanks", label: "Fill in the Blanks", category: "Objective" },
    { id: "matchFollowing", label: "Match the Following", category: "Objective" },
    { id: "oneWord", label: "One-Word Answers", category: "Objective" },
    { id: "shortAnswer", label: "Short Answer Questions", category: "Subjective" },
    { id: "longAnswer", label: "Long Answer Questions", category: "Subjective" },
    { id: "vocabulary", label: "Vocabulary Evaluation", category: "Language" },
    { id: "synonyms", label: "Synonyms & Antonyms", category: "Language" },
    { id: "meanings", label: "Contextual Word Meanings", category: "Language" },
    { id: "referenceToContext", label: "Reference to Context", category: "Critical" },
    { id: "grammar", label: "Grammar Analysis Questions", category: "Language" },
    { id: "sentenceRearrangement", label: "Sentence Rearrangement", category: "Critical" },
  ];

  // Grammar options
  const grammarOptionsList = [
    "Random", "Nouns", "Pronouns", "Adjectives", "Adverbs", "Verbs", "Tenses", "Articles", 
    "Prepositions", "Conjunctions", "Voice", "Narration", "Subject-Verb Agreement", "Punctuation"
  ];

  // Learning Objectives
  const learningObjectivesList = [
    "Random", "Reading Skills", "Vocabulary Building", "Critical Thinking", "Grammar Practice", 
    "Exam Preparation", "Speed Reading"
  ];

  // Writing style options
  const aiFeaturesList = [
    "Generated Original Passage",
    "Inspired by Famous Authors (Style copy)",
    "Public Domain Literature Style",
  ];

  // STATES
  const [topic, setTopic] = useState<PassageTopic>("Science");
  const [customTopic, setCustomTopic] = useState("");
  const [passageType, setPassageType] = useState<PassageType>("Informative");
  const [passageLength, setPassageLength] = useState<PassageLengthType>("Medium");
  const [wordCount, setWordCount] = useState<WordCountOption>("Random");
  const [vocabularyLevel, setVocabularyLevel] = useState<VocabularyLevel>("Grade-Level Standard");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(["mcq", "shortAnswer", "vocabulary"]);
  const [selectedGrammar, setSelectedGrammar] = useState<string[]>(["Tenses", "Articles"]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(["Reading Skills", "Critical Thinking"]);
  const [language, setLanguage] = useState<"English" | "Hindi">("English");
  const [aiFeature, setAiFeature] = useState(aiFeaturesList[0]);

  // Estimated reading time calculator
  const [estimatedTime, setEstimatedTime] = useState(2);

  useEffect(() => {
    let words = 300;
    if (wordCount !== "Random") {
      words = parseInt(wordCount);
    } else {
      switch (passageLength) {
        case "Very Short": words = 120; break;
        case "Short": words = 200; break;
        case "Medium": words = 350; break;
        case "Long": words = 500; break;
        case "Very Long": words = 800; break;
        default: words = 350;
      }
    }
    const time = Math.max(1, Math.ceil(words / 150));
    setEstimatedTime(time);
  }, [passageLength, wordCount]);

  const toggleQuestion = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const toggleGrammar = (g: string) => {
    if (selectedGrammar.includes(g)) {
      setSelectedGrammar(selectedGrammar.filter((item) => item !== g));
    } else {
      setSelectedGrammar([...selectedGrammar, g]);
    }
  };

  const toggleObjective = (o: string) => {
    if (selectedObjectives.includes(o)) {
      setSelectedObjectives(selectedObjectives.filter((item) => item !== o));
    } else {
      setSelectedObjectives([...selectedObjectives, o]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestions.length === 0) {
      alert("Please select at least one evaluation format.");
      return;
    }

    const randomizedFields: any = {};

    let finalDifficulty: DifficultyLevel = difficulty;
    if (difficulty === "Random") {
      const realDiffs: DifficultyLevel[] = ["Easy", "Medium", "Hard", "Expert"];
      finalDifficulty = realDiffs[Math.floor(Math.random() * realDiffs.length)];
      randomizedFields.difficulty = finalDifficulty;
    }

    let finalTopic: PassageTopic = topic;
    if (topic === "Random") {
      const realTopics = [
        "Science", "Space", "Environment", "History", "Geography", "Technology", 
        "AI", "Wildlife", "Sports", "Indian Culture", "Festivals", "Health", 
        "Current Affairs", "Literature", "Biography", "Economics", "Agriculture", 
        "Astronomy"
      ];
      finalTopic = realTopics[Math.floor(Math.random() * realTopics.length)] as PassageTopic;
      randomizedFields.topic = finalTopic;
    }

    let finalPassageType: PassageType = passageType;
    if (passageType === "Random") {
      const realTypes = [
        "Informative", "Narrative", "Descriptive", "Expository", "Persuasive", 
        "Biographical", "Scientific", "Historical", "Fiction", "Adventure", 
        "Moral Story", "Editorial Style"
      ];
      finalPassageType = realTypes[Math.floor(Math.random() * realTypes.length)] as PassageType;
      randomizedFields.passageType = finalPassageType;
    }

    let finalPassageLength: PassageLengthType = passageLength;
    if (passageLength === "Random") {
      const realLengths = ["Very Short", "Short", "Medium", "Long", "Very Long"];
      finalPassageLength = realLengths[Math.floor(Math.random() * realLengths.length)] as PassageLengthType;
      randomizedFields.passageLength = finalPassageLength;
    }

    let finalVocabularyLevel: VocabularyLevel = vocabularyLevel;
    if (vocabularyLevel === "Random") {
      const realVocabs = ["Basic", "Grade-Level Standard", "Advanced", "Competitive Exam Level"];
      finalVocabularyLevel = realVocabs[Math.floor(Math.random() * realVocabs.length)] as VocabularyLevel;
      randomizedFields.vocabularyLevel = finalVocabularyLevel;
    }

    let finalGrammar = [...selectedGrammar];
    if (selectedGrammar.includes("Random")) {
      const availableGrammar = [
        "Nouns", "Pronouns", "Adjectives", "Adverbs", "Verbs", "Tenses", "Articles", 
        "Prepositions", "Conjunctions", "Voice", "Narration", "Subject-Verb Agreement", "Punctuation"
      ];
      const count = Math.floor(Math.random() * 3) + 2; 
      const shuffled = [...availableGrammar].sort(() => 0.5 - Math.random());
      finalGrammar = shuffled.slice(0, count);
      randomizedFields.grammarOptions = finalGrammar;
    }

    let finalQuestions = [...selectedQuestions];
    if (selectedQuestions.includes("random")) {
      const availableQuestions = [
        "mcq", "trueFalse", "fillBlanks", "matchFollowing", "oneWord", 
        "shortAnswer", "longAnswer", "vocabulary", "synonyms", "meanings", 
        "referenceToContext", "grammar", "sentenceRearrangement"
      ];
      const count = Math.floor(Math.random() * 3) + 3; 
      const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
      finalQuestions = shuffled.slice(0, count);
      randomizedFields.questionTypes = finalQuestions;
    }

    let finalObjectives = [...selectedObjectives];
    if (selectedObjectives.includes("Random")) {
      const availableObjectives = [
        "Reading Skills", "Vocabulary Building", "Critical Thinking", "Grammar Practice", 
        "Exam Preparation", "Speed Reading"
      ];
      const count = Math.floor(Math.random() * 2) + 2; 
      const shuffled = [...availableObjectives].sort(() => 0.5 - Math.random());
      finalObjectives = shuffled.slice(0, count);
      randomizedFields.learningObjectives = finalObjectives;
    }

    onSubmit({
      board,
      academicLevel,
      difficulty: finalDifficulty,
      topic: finalTopic === "Custom" ? customTopic || "General" : finalTopic,
      passageType: finalPassageType,
      passageLength: finalPassageLength,
      wordCount,
      vocabularyLevel: finalVocabularyLevel,
      questionTypes: finalQuestions,
      grammarOptions: finalGrammar,
      learningObjectives: finalObjectives,
      language,
      aiFeature,
      randomizedFields,
      originalConfig: {
        difficulty,
        topic,
        passageType,
        passageLength,
        vocabularyLevel,
        grammarOptions: selectedGrammar,
        questionTypes: selectedQuestions,
        learningObjectives: selectedObjectives,
      }
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8 max-w-5xl mx-auto py-4" id="configure-form">
      {/* Progress timeline */}
      <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center space-x-1 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition cursor-pointer font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Steps 1-3
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">→</span>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
            Step 4 of 4
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Worksheet Settings
          </span>
        </div>
        <div className="flex space-x-1">
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-20" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-40" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 opacity-70" />
          <div className="h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500" />
        </div>
      </div>

      {/* Editorial Header */}
      <div className="space-y-2 text-left md:text-center md:max-w-2xl md:mx-auto">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Worksheet Settings
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Choose your topic, reading style, question types, and grammar focus to create a personalized worksheet.
        </p>

        {errorText && (
          <div className="mt-3 p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 text-left">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>{errorText}</span>
          </div>
        )}
      </div>

      {/* Split Column Layout */}
      <div className="grid grid-cols-12 gap-6 items-start pt-2">
        {/* LEFT COLUMN: PARAMETER CONFIGURATION */}
        <div className="col-span-12 md:col-span-8 space-y-5">
          
          {/* Section A: Passage Rules */}
          <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <AlignLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">Passage Settings</h4>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center">
                  <Languages className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                  Language
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(["English", "Hindi"] as const).map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-2 px-4 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      language === lang
                        ? "border-emerald-600 bg-emerald-50/10 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850"
                    }`}
                  >
                    {lang === "Hindi" ? "हिंदी (Hindi)" : "English"}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Select */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as PassageTopic)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
              >
                {topics.map((t) => (
                  <option key={t} value={t}>{t === "Random" ? "Random topic" : t}</option>
                ))}
              </select>

              {topic === "Custom" && (
                <div className="mt-2.5 animate-fadeIn">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Space Exploration or Ancient Monuments"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                  />
                </div>
              )}
            </div>

            {/* Passage Type / Genre */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                Reading Style
              </label>
              <select
                value={passageType}
                onChange={(e) => setPassageType(e.target.value as PassageType)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type === "Random" ? "Random style" : type}</option>
                ))}
              </select>
              {passageType === "Data Interpretation" && (
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <span className="font-bold">📊 Visual Module:</span>
                  <span>Generates interactive Bar Graphs, Pie Charts, Line Graphs, Data Tables, Flow Charts, and Infographics.</span>
                </div>
              )}
            </div>

            {/* Passage Length & Words */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                  Length
                </label>
                <select
                  value={passageLength}
                  onChange={(e) => {
                    setPassageLength(e.target.value as PassageLengthType);
                    setWordCount("Random"); 
                  }}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  {(["Very Short", "Short", "Medium", "Long", "Very Long", "Random"] as PassageLengthType[]).map((len) => (
                    <option key={len} value={len}>{len === "Random" ? "Random Length" : len}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                  Word Count
                </label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value as WordCountOption)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  {wordCountOptions.map((wc) => (
                    <option key={wc} value={wc}>{wc === "Random" ? "Auto-select count" : `${wc} Words`}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vocab Level & Signature */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                  Vocabulary Level
                </label>
                <select
                  value={vocabularyLevel}
                  onChange={(e) => setVocabularyLevel(e.target.value as VocabularyLevel)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  {vocabLevels.map((vl) => (
                    <option key={vl} value={vl}>{vl === "Random" ? "Auto-select level" : vl}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                  Writing Style
                </label>
                <select
                  value={aiFeature}
                  onChange={(e) => setAiFeature(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 py-2 px-3 text-xs outline-none transition focus:border-emerald-600 focus:bg-white dark:focus:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-white"
                >
                  {aiFeaturesList.map((feature) => (
                    <option key={feature} value={feature}>{feature}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live stats banner */}
            <div className="flex items-start space-x-3 rounded-lg bg-zinc-50 p-3.5 border border-zinc-200 dark:bg-zinc-850/50 dark:border-zinc-800">
              <Activity className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs font-sans">
                <p className="font-bold text-zinc-800 dark:text-zinc-200">
                  Reading Time Estimate
                </p>
                <p className="text-zinc-550 dark:text-zinc-400 mt-1">
                  Length: <strong className="text-zinc-900 dark:text-white">{wordCount === "Random" ? `~350` : wordCount} words</strong>. Average reading time is about <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{estimatedTime} minute{estimatedTime > 1 ? "s" : ""}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Section B: Assessment Formats */}
          <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">Question Formats</h4>
            </div>

            {/* Question types list with high precision */}
            <div className="max-h-[220px] overflow-y-auto pr-1 space-y-1.5 border border-zinc-100 p-2.5 rounded-lg dark:border-zinc-800 bg-zinc-50/10">
              {questionTypeOptions.map((opt) => {
                const isChecked = selectedQuestions.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center space-x-3 p-2.5 rounded-md cursor-pointer transition text-xs border ${
                      isChecked
                        ? "bg-emerald-50/10 border-emerald-300 dark:bg-emerald-950/15 dark:border-emerald-800 text-zinc-900 dark:text-white font-medium"
                        : "bg-white border-transparent hover:bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleQuestion(opt.id)}
                      className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                    />
                    <div className="flex-grow flex justify-between items-center">
                      <span className="text-zinc-800 dark:text-zinc-200">{opt.label}</span>
                      <span className="text-[9px] font-mono text-zinc-400 font-bold tracking-wider uppercase bg-zinc-100 px-1.5 py-0.5 rounded dark:bg-zinc-800">{opt.category}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Grammar options */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                <span>Grammar Focus</span>
                <span className="text-zinc-450 font-normal tracking-normal lowercase italic">Select topics to practice</span>
              </label>
              <div className="flex flex-wrap gap-1.5 border border-zinc-150 p-3 rounded-lg bg-zinc-50/10 dark:border-zinc-800">
                {grammarOptionsList.map((g) => {
                  const isChecked = selectedGrammar.includes(g);
                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() => toggleGrammar(g)}
                      className={`px-3 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-750 dark:text-zinc-400"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Learning objectives */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Skill Focus
              </label>
              <div className="flex flex-wrap gap-1.5 border border-zinc-150 p-3 rounded-lg bg-zinc-50/10 dark:border-zinc-800">
                {learningObjectivesList.map((o) => {
                  const isChecked = selectedObjectives.includes(o);
                  return (
                    <button
                      type="button"
                      key={o}
                      onClick={() => toggleObjective(o)}
                      className={`px-3 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-750 dark:text-zinc-400"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BLUEPRINT SUMMARY CARD */}
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 sticky top-20 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs space-y-5">
            <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <span className="text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">SUMMARY</span>
              <h3 className="text-sm font-bold text-zinc-850 dark:text-white tracking-tight mt-0.5">Worksheet Summary</h3>
            </div>
            
            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">Board</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{board}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">Class / Grade</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{academicLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">Difficulty</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[9px] bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                  {difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">Topic</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 max-w-[140px] truncate text-right" title={topic === "Custom" ? customTopic : topic}>
                  {topic === "Custom" ? customTopic || "Custom" : topic}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">Style</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{passageType}</span>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 dark:text-zinc-500 font-medium">Reading Time</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-100">~{estimatedTime} min read</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 dark:text-zinc-500 font-medium">Word Count</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-100">
                    {wordCount === "Random" ? `~350 Words` : `${wordCount} Words`}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 py-3 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Worksheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 px-5 py-2.5 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      </div>
    </form>
  );
}
