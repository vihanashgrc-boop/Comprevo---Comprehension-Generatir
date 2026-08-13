export type BoardType = "National Standard" | "Advanced Curriculum" | "Regional Syllabus" | "International Baccalaureate" | "Cambridge Standard";

export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Expert" | "Random";

export interface AcademicLevel {
  id: string;
  name: string;
  category: "School" | "Competitive Exams";
}

export type PassageTopic = 
  | "Science"
  | "Space"
  | "Environment"
  | "History"
  | "Geography"
  | "Technology"
  | "AI"
  | "Wildlife"
  | "Sports"
  | "Indian Culture"
  | "Festivals"
  | "Health"
  | "Current Affairs"
  | "Literature"
  | "Biography"
  | "Economics"
  | "Agriculture"
  | "Astronomy"
  | "Custom"
  | "Random";

export type PassageType = 
  | "Informative"
  | "Narrative"
  | "Descriptive"
  | "Expository"
  | "Analytical"
  | "Argumentative"
  | "Persuasive"
  | "Historical"
  | "Scientific"
  | "Biographical"
  | "Editorial"
  | "Literary"
  | "Fiction"
  | "Adventure"
  | "Moral Story"
  | "Editorial Style"
  | "Data Interpretation"
  | "Random";

export type DataChartType = 
  | "Bar Graph"
  | "Pie Chart"
  | "Line Graph"
  | "Table"
  | "Flow Chart"
  | "Infographic"
  | "Mixed Data Set";

export type DataQuestionFocus = 
  | "Data Reading"
  | "Comparison"
  | "Percentages"
  | "Ratios"
  | "Trends"
  | "Logical Reasoning"
  | "Inference"
  | "Conclusions";

export interface DataInterpretationSet {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  chartType: DataChartType;
  dataset: {
    headers?: string[];
    rows?: (string | number)[][];
    categories?: string[];
    series?: { name: string; values: number[]; color?: string }[];
    slices?: { label: string; value: number; percentage?: number; color?: string }[];
    flowSteps?: { step: number; title: string; description: string; type?: "start" | "process" | "decision" | "end" }[];
    infographicNodes?: { title: string; stat: string; subtext: string; badge?: string }[];
    summaryText?: string;
  };
  questions: Question[];
  difficultWords: DifficultWord[];
  learningObjectivesMet: string[];
  curriculumComplianceNotes: string;
  config: {
    board: BoardType;
    academicLevel: string;
    difficulty: DifficultyLevel;
    chartType: DataChartType;
    questionFocuses: DataQuestionFocus[];
    language: "English" | "Hindi";
  };
}

export type PassageLengthType = "Very Short" | "Short" | "Medium" | "Long" | "Very Long" | "Random";

export type WordCountOption = "100" | "150" | "200" | "250" | "300" | "400" | "500" | "700" | "1000" | "Random";

export type VocabularyLevel = "Basic" | "Grade-Level Standard" | "Advanced" | "Competitive Exam Level" | "Random";

export interface QuestionTypeOption {
  id: string;
  name: string;
  description: string;
}

export interface GrammarOption {
  id: string;
  name: string;
}

export interface LearningObjectiveOption {
  id: string;
  name: string;
}

export interface DifficultWord {
  word: string;
  meaning: string;
  contextSentence: string;
}

export interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  context?: string;
}

export interface GeneratedPassage {
  id: string;
  timestamp: string;
  title: string;
  passage: string;
  estimatedReadingTime: number;
  difficultWords: DifficultWord[];
  questions: Question[];
  learningObjectivesMet: string[];
  curriculumComplianceNotes: string;
  // Config used
  config: {
    board: BoardType;
    academicLevel: string;
    difficulty: DifficultyLevel;
    topic: string;
    passageType: string;
    passageLength: string;
    vocabularyLevel: string;
    language: "English" | "Hindi";
  };
  randomizedFields?: {
    difficulty?: string;
    topic?: string;
    passageType?: string;
    passageLength?: string;
    vocabularyLevel?: string;
    grammarOptions?: string[];
    questionTypes?: string[];
    learningObjectives?: string[];
  };
}

export interface EvaluationResult {
  overallScore: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  timeTaken: string;
  questionsAttempted: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  questionsAnalysis: {
    questionId: number;
    status: "correct" | "incorrect" | "skipped";
    scoreAwarded: number;
    maxScore: number;
    studentAnswer: string;
    correctAnswer: string;
    isAlternativeWordingUsed?: boolean;
    detailedFeedback: string;
    explanation: string;
  }[];
  learningSummary: {
    strengths: string[];
    topicsToImprove: string[];
    grammarMistakes: string[];
    vocabularySuggestions: string[];
    readingSkills: string[];
    estimatedSkillLevel: string;
    practiceRecommendations: string[];
  };
  rewards: {
    starsAwarded: number;
    badgesEarned: string[];
    xpGained: number;
    streakUpdated: number;
  };
}

export interface CompletedWorksheet {
  passageId: string;
  passageTitle: string;
  timestamp: string;
  date?: string; // Standardized YYYY-MM-DD local date
  subject: string;
  academicLevel: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeTakenSeconds: number;
  userAnswers: Record<string, any>;
  evaluation: EvaluationResult;
}

export interface UserProfile {
  name: string;
  email: string;
  selectedBoard: BoardType;
  selectedLevel: string;
  favorites: string[]; // List of generated passage IDs
  history: GeneratedPassage[];
  streak: number;
  highestStreak?: number;
  lastPracticeDate?: string;
  totalPracticeDays?: number;
  totalWorksheets: number;
  xp?: number;
  stars?: number;
  badges?: string[];
  completedWorksheets?: CompletedWorksheet[];
}
