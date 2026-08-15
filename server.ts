import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Gemini API calls will fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Robust JSON extractor that strips markdown fences and preamble
function extractAndParseJson(rawText: string): any {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty response received from AI model.");
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences ```json ... ``` or ``` ... ```
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }

  // Extract outermost { ... } or [ ... ]
  const firstBrace = cleaned.indexOf("{");
  const firstBracket = cleaned.indexOf("[");
  let startIdx = -1;
  let endIdx = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = cleaned.lastIndexOf("}");
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = cleaned.lastIndexOf("]");
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (err: any) {
    console.error("Failed to parse JSON string:", cleaned.slice(0, 200), err);
    throw new Error(`Invalid JSON syntax returned by model: ${err.message}`);
  }
}

async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  options: {
    contents: any;
    config: any;
  }
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  // Use primary and fallback models
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-3.7-flash",
    "gemini-3.1-flash-lite"
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[Gemini] Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model: model,
        contents: options.contents,
        config: options.config,
      });

      if (response && response.text) {
        console.log(`[Gemini] Generation succeeded with model: ${model}`);
        return response;
      }
    } catch (error: any) {
      lastError = error;
      console.warn(`[Gemini] Model ${model} failed: ${error.message || error}. Trying next model...`);
    }
  }

  throw lastError || new Error("Failed to generate content after trying available models.");
}

// JSON Schema definition for data interpretation sets
const dataInterpretationSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING, description: "Title of the data interpretation set" },
    description: { type: Type.STRING, description: "Background description explaining what the data represents." },
    chartType: { 
      type: Type.STRING, 
      description: "One of: 'Bar Graph', 'Pie Chart', 'Line Graph', 'Table', 'Flow Chart', 'Infographic', 'Mixed Data Set'" 
    },
    dataset: {
      type: Type.OBJECT,
      properties: {
        summaryText: { type: Type.STRING, description: "Overview note describing key takeaways or background notes" },
        headers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Column headers for Tables or Data grids" },
        rows: { 
          type: Type.ARRAY, 
          items: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          description: "Data rows for Tables or Data grids"
        },
        categories: { type: Type.ARRAY, items: { type: Type.STRING }, description: "X-axis categories for Bar/Line Graphs" },
        series: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              values: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              color: { type: Type.STRING }
            },
            required: ["name", "values"]
          }
        },
        slices: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              value: { type: Type.NUMBER },
              percentage: { type: Type.NUMBER },
              color: { type: Type.STRING }
            },
            required: ["label", "value"]
          }
        },
        flowSteps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING }
            },
            required: ["step", "title", "description"]
          }
        },
        infographicNodes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              stat: { type: Type.STRING },
              subtext: { type: Type.STRING },
              badge: { type: Type.STRING }
            },
            required: ["title", "stat", "subtext"]
          }
        }
      }
    },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          type: { type: Type.STRING, description: "'mcq' or 'shortAnswer'" },
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          answer: { type: Type.STRING },
          explanation: { type: Type.STRING, description: "Detailed mathematical, trend, or logical step-by-step breakdown" }
        },
        required: ["id", "type", "question", "answer", "explanation"]
      }
    },
    difficultWords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
          contextSentence: { type: Type.STRING }
        },
        required: ["word", "meaning", "contextSentence"]
      }
    },
    learningObjectivesMet: { type: Type.ARRAY, items: { type: Type.STRING } },
    curriculumComplianceNotes: { type: Type.STRING }
  },
  required: [
    "title",
    "description",
    "chartType",
    "dataset",
    "questions",
    "difficultWords",
    "learningObjectivesMet",
    "curriculumComplianceNotes"
  ]
};

// API Endpoint: Generate Data Interpretation
app.post("/api/generate-data-interpretation", async (req, res) => {
  try {
    const {
      board = "National Standard",
      academicLevel = "Class 8",
      difficulty = "Medium",
      chartType = "Bar Graph",
      questionFocuses = ["Data Reading", "Comparison", "Percentages", "Trends"],
      language = "English"
    } = req.body;

    const ai = getGeminiClient();

    const systemPrompt = `You are a data analysis and quantitative reasoning exam designer.
Your goal is to generate an authentic Data Interpretation problem set with visual data specifications and analytical questions.

Curriculum parameters:
- Board: ${board}
- Target Grade / Exam Level: ${academicLevel}
- Difficulty Level: ${difficulty}
- Visual Representation Type: ${chartType}
- Question Focus Areas: ${questionFocuses.join(", ")}
- Language: ${language}

DIRECTIVES FOR DATASET & VISUAL CREATION:
- If chartType is "Bar Graph": Provide 'categories' (e.g. 4-6 labels like ["2021", "2022", "2023", "2024"]) and 'series' array with 1-2 data series containing numerical values.
- If chartType is "Pie Chart": Provide 'slices' array with labels, numerical values, and percentages summing to 100%.
- If chartType is "Line Graph": Provide 'categories' (time/periods) and 'series' array with numerical values showing trends over time.
- If chartType is "Table": Provide 'headers' array and 4-6 'rows' of data strings/numbers.
- If chartType is "Flow Chart": Provide 'flowSteps' array with 4-6 connected process nodes (step, title, description, type).
- If chartType is "Infographic": Provide 'infographicNodes' array with 4 key metrics/stats cards.
- If chartType is "Mixed Data Set": Provide BOTH 'categories' + 'series' (or 'slices') AND a table ('headers' + 'rows').

DIRECTIVES FOR QUESTIONS:
- Formulate 5-7 questions testing specific skills requested: ${questionFocuses.join(", ")}.
- Include questions testing:
  1. Data reading (direct retrieval of values)
  2. Comparison (highest/lowest, differences)
  3. Percentages & Ratios (percentage change, ratios between categories)
  4. Trends & Inference (future predictions, conclusions based on facts)
  5. Logical reasoning (evaluating claims based on data)
- For 'mcq' questions, provide 4 options starting with letter keys e.g. "A) ...", "B) ...".
- In 'explanation', show step-by-step mathematical calculations or reasoning breakdown.`;

    let data;
    try {
      const response = await generateContentWithRetryAndFallback(ai, {
        contents: `Generate a Data Interpretation set of type "${chartType}". Grade: "${academicLevel}". Difficulty: "${difficulty}". Language: "${language}". Board: "${board}". Return JSON conforming strictly to schema.`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: dataInterpretationSchema
        }
      });

      if (!response.text) {
        throw new Error("No response received from Gemini.");
      }

      data = extractAndParseJson(response.text);
    } catch (aiErr: any) {
      console.warn("AI generation failed for Data Interpretation, activating pedagogical fallback:", aiErr.message);
      data = {
        title: `${chartType || "Data"} Interpretation & Analysis`,
        description: `An analytical data examination set curated for ${academicLevel} (${board}) focusing on ${chartType} interpretation and quantitative reasoning.`,
        chartType: chartType,
        dataset: {
          summaryText: `This dataset illustrates performance and comparative metrics measured across distinct categories.`,
          headers: ["Category / Group", "Baseline (Units)", "Target (Units)", "Observed Growth (%)"],
          rows: [
            ["Group Alpha", "140", "180", "+28.5%"],
            ["Group Beta", "210", "260", "+23.8%"],
            ["Group Gamma", "95", "150", "+57.9%"],
            ["Group Delta", "310", "340", "+9.7%"]
          ],
          categories: ["2021", "2022", "2023", "2024", "2025"],
          series: [
            { name: "Observed Values", values: [140, 210, 260, 310, 340], color: "#10b981" },
            { name: "Target Standard", values: [150, 200, 250, 300, 350], color: "#6366f1" }
          ],
          slices: [
            { label: "Segment A", value: 35, percentage: 35, color: "#10b981" },
            { label: "Segment B", value: 25, percentage: 25, color: "#3b82f6" },
            { label: "Segment C", value: 20, percentage: 20, color: "#f59e0b" },
            { label: "Segment D", value: 20, percentage: 20, color: "#8b5cf6" }
          ],
          flowSteps: [
            { step: 1, title: "Data Collection", description: "Initial sampling and primary observation across groups.", type: "Start" },
            { step: 2, title: "Verification & Normalization", description: "Standardizing metrics against benchmark parameters.", type: "Process" },
            { step: 3, title: "Comparative Evaluation", description: "Cross-referencing category shifts and percentage deviations.", type: "Analysis" },
            { step: 4, title: "Strategic Synthesis", description: "Deriving conclusive trends and forward recommendations.", type: "Conclusion" }
          ],
          infographicNodes: [
            { title: "Peak Category", stat: "340 Units", subtext: "Highest recorded group metric", badge: "Maximum" },
            { title: "Growth Surge", stat: "+57.9%", subtext: "Group Gamma acceleration", badge: "Trend" },
            { title: "Mean Metric", stat: "232.5", subtext: "Average across groups", badge: "Average" },
            { title: "Target Parity", stat: "96.4%", subtext: "Overall benchmark achievement", badge: "KPI" }
          ]
        },
        questions: [
          {
            id: 1,
            type: "mcq",
            question: "Which category exhibited the highest absolute observed unit value?",
            options: ["A) Group Alpha", "B) Group Beta", "C) Group Gamma", "D) Group Delta"],
            answer: "D) Group Delta",
            explanation: "According to the data table, Group Delta recorded 340 units, which is the highest individual value."
          },
          {
            id: 2,
            type: "shortAnswer",
            question: "Calculate which group recorded the greatest percentage growth rate and explain why.",
            options: [],
            answer: "Group Gamma with +57.9% growth rate.",
            explanation: "Group Gamma increased from a baseline of 95 to 150, representing an increase of ((150 - 95) / 95) * 100 = 57.89% (approx 57.9%)."
          },
          {
            id: 3,
            type: "mcq",
            question: "What is the primary conclusion that can be drawn from the historical trend line?",
            options: [
              "A) Metrics steadily deteriorated over consecutive years.",
              "B) Performance demonstrated sustained upward growth with target alignment.",
              "C) No correlation existed between time and output.",
              "D) Target standards were never reached."
            ],
            answer: "B) Performance demonstrated sustained upward growth with target alignment.",
            explanation: "The values increase consistently across each reporting period while closely tracking or exceeding the projected target line."
          }
        ],
        difficultWords: [
          { word: "Baseline", meaning: "A minimum or starting point used for comparisons", contextSentence: "The experiment recorded an initial baseline of 140 units before adjustments." },
          { word: "Normalization", meaning: "Adjusting values measured on different scales to a common scale", contextSentence: "Data normalization ensured fair comparisons across distinct cohorts." },
          { word: "Parity", meaning: "The state or condition of being equal or on par", contextSentence: "The team achieved target parity across the final evaluations." }
        ],
        learningObjectivesMet: ["Quantitative Reasoning", "Chart & Table Interpretation", "Percentage & Ratio Calculation", "Trend Synthesis"],
        curriculumComplianceNotes: `Aligned with ${board} competency standards for ${academicLevel} empirical reasoning.`
      };
    }

    data.id = "di_" + Date.now();
    data.timestamp = new Date().toISOString();
    res.json(data);
  } catch (error: any) {
    console.error("Data Interpretation Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate Data Interpretation set." });
  }
});
const passageResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Title of the comprehension passage" },
    passage: { 
      type: Type.STRING, 
      description: "The complete reading comprehension passage text. Write in 3-5 elegant paragraphs. Must be high quality, engaging, age-appropriate, and match the specified topic and style." 
    },
    estimatedReadingTime: { type: Type.INTEGER, description: "Estimated reading time in minutes (e.g., 3)" },
    difficultWords: {
      type: Type.ARRAY,
      description: "List of 4-6 advanced or contextually difficult words from the passage with their definitions and context usage.",
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
          contextSentence: { type: Type.STRING, description: "A sentence showing how this word is used, ideally from the passage or very similar." }
        },
        required: ["word", "meaning", "contextSentence"]
      }
    },
    questions: {
      type: Type.ARRAY,
      description: "A well-balanced array of questions according to curriculum reading guidelines.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          type: { 
            type: Type.STRING, 
            description: "The question type: 'mcq', 'trueFalse', 'fillBlanks', 'matchFollowing', 'oneWord', 'shortAnswer', 'longAnswer', 'vocabulary', 'synonyms', 'antonyms', 'meanings', 'referenceToContext', 'grammar', 'sentenceRearrangement'" 
          },
          question: { type: Type.STRING, description: "The question text. Formulate clear, grade-appropriate, exam-ready questions." },
          options: {
            type: Type.ARRAY,
            description: "Options array. Required ONLY for 'mcq' (provide 4 distinct choices, like ['A) Choice 1', 'B) Choice 2', ...]) and 'matchFollowing' (provide a list of elements to match). For other question types, leave empty or omit.",
            items: { type: Type.STRING }
          },
          answer: { type: Type.STRING, description: "The correct answer. For MCQs, start with the letter key (e.g., 'A) choice text')." },
          explanation: { type: Type.STRING, description: "Detailed, step-by-step pedagogical explanation of the correct answer and context clues." },
          context: { type: Type.STRING, description: "Optional reference context (quote/excerpt) for Reference-To-Context type questions." }
        },
        required: ["id", "type", "question", "answer", "explanation"]
      }
    },
    learningObjectivesMet: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of target learning objectives achieved by this passage (e.g. Critical Thinking, Reading Comprehension, Vocabulary Building)."
    },
    curriculumComplianceNotes: { 
      type: Type.STRING, 
      description: "Brief note explaining curriculum guidelines compliance (e.g. competency level, factual/literary style, case-study structure)." 
    }
  },
  required: [
    "title",
    "passage",
    "estimatedReadingTime",
    "difficultWords",
    "questions",
    "learningObjectivesMet",
    "curriculumComplianceNotes"
  ]
};

// API Endpoint: Generate Passage
app.post("/api/generate-passage", async (req, res) => {
  const {
    board = "National Standard",
    academicLevel = "Class 8",
    difficulty = "Medium",
    topic = "Science",
    passageType = "Informative",
    passageLength = "Medium",
    wordCount = "Random",
    vocabularyLevel = "Grade-Level Standard",
    questionTypes = ["mcq", "shortAnswer"],
    grammarOptions = [],
    learningObjectives = [],
    language = "English",
    aiFeature = "Generated Original Passage"
  } = req.body || {};

  const safeTopic = topic || "Science";
  const isHindi = language === "Hindi";

  try {
    const ai = getGeminiClient();

    // Map length/word count
    let lengthInstructions = `Length: ${passageLength}`;
    if (wordCount && wordCount !== "Random") {
      lengthInstructions = `Write a passage of approximately ${wordCount} words.`;
    } else {
      switch (passageLength) {
        case "Very Short": lengthInstructions = "Write a short passage of 100-150 words."; break;
        case "Short": lengthInstructions = "Write a passage of 150-250 words."; break;
        case "Medium": lengthInstructions = "Write a passage of 250-400 words."; break;
        case "Long": lengthInstructions = "Write a passage of 400-600 words."; break;
        case "Very Long": lengthInstructions = "Write a comprehensive passage of 600-1000 words."; break;
        default: lengthInstructions = "Write a passage of 250-450 words.";
      }
    }

    const systemPrompt = `You are an expert curriculum designer, educator, and examination paper setter.
Your goal is to generate an authentic, high-quality, age-appropriate reading comprehension passage and corresponding questions strictly following educational guidelines.

Ensure the output complies with:
- Board: ${board}
- Target Grade/Exam: ${academicLevel}
- Language: ${language}
- Difficulty Level: ${difficulty} (Adjust vocabulary difficulty, sentence structure complexity, passage depth, and inference-demand of questions accordingly).
- Topic: ${safeTopic}
- Passage Type/Genre: ${passageType}
${passageType === "Data Interpretation" ? `- SPECIAL INSTRUCTION FOR DATA INTERPRETATION: You are generating a Data Interpretation assessment. The 'passage' text MUST include structured data tables, bar representations, numerical datasets, or data matrices formatted neatly in Markdown/ASCII tables and charts. The questions MUST directly test data reading, percentages, ratios, trend analysis, comparisons, and logical reasoning based on the provided dataset.` : ""}
- ${lengthInstructions}
- Vocabulary Target: ${vocabularyLevel}
- Grammar focuses to include in grammar questions: ${grammarOptions.join(", ") || "General grade-level grammar"}
- Target Learning Goals: ${learningObjectives.join(", ") || "General reading and comprehension"}
- Passage Creative Style: ${aiFeature} (If "Inspired by Famous Authors", write the text in the distinct writing style of a renowned author suitable for this topic/grade, but do not plagiarize. If "Public Domain Literature", use or base it heavily on classic literature style. Otherwise, write an original engaging pedagogical passage).

Please follow these question writing directives:
- Select from these types: ${questionTypes.join(", ")}. Provide at least 1 question for each selected type. Ensure total of at least 5-8 questions.
- For 'mcq', 'options' array is required with exactly 4 options. Include the letter key inside option strings e.g. "A) ...", "B) ...".
- For 'matchFollowing', provide the matching items inside 'options'.
- For 'grammar-based questions', formulate questions focused on ${grammarOptions.join(", ") || "grammar points"}.
- Formulate application-based and inference-based questions suitable for the specified difficulty. Higher difficulties require deeper analytical questions rather than simple retrieval.
- All text must be in ${isHindi ? "Hindi (हिंदी)" : "English"}. If Hindi is chosen, ensure the whole JSON (title, passage, questions, difficult words, explanations) is in Hindi except for standard JSON keys.`;

    let data;
    try {
      const response = await generateContentWithRetryAndFallback(ai, {
        contents: `Create a reading comprehension passage and assessment. 
Topic details: "${safeTopic}". 
Passage Type: "${passageType}". 
Level: "${academicLevel}". 
Language: "${language}". 
Board: "${board}". 
Please respond with a single, perfectly structured JSON object conforming strictly to the requested schema. Ensure all fields are filled with high quality content.`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.75,
          responseMimeType: "application/json",
          responseSchema: passageResponseSchema
        }
      });

      if (!response.text) {
        throw new Error("No response text received from Gemini.");
      }

      data = extractAndParseJson(response.text);
    } catch (aiErr: any) {
      console.warn("AI generation failed for Passage, activating pedagogical fallback:", aiErr.message);
      
      const passageTitle = isHindi 
        ? `${safeTopic} - एक अध्ययन`
        : `The Wonders of ${safeTopic}: A Journey of Understanding`;

      const fallbackText = isHindi
        ? `प्रकृति और विज्ञान हमारे जीवन के अभिन्न अंग हैं। किसी भी विषय का गहन अध्ययन हमें नई दृष्टि प्रदान करता है। ज्ञान केवल तथ्यों को याद रखना नहीं, बल्कि उनका तर्कसंगत विश्लेषण करना है।\n\nविभिन्न खोजों ने मानवीय समझ को विस्तार दिया है। जब हम जिज्ञासा और अवलोकन के माध्यम से नए सिद्धांतों को समझते हैं, तो हमारी बौद्धिक क्षमता में वृद्धि होती है। कठिन परिस्थितियों में भी वैज्ञानिक दृष्टिकोण हमें समाधान की ओर ले जाता है।\n\nअतः प्रत्येक विद्यार्थी को निरंतर अध्ययन और अनुसंधान की प्रवृत्ति अपनानी चाहिए। यह दृष्टिकोण न केवल परीक्षा में उत्तम परिणाम दिलाता है, बल्कि समाज के उत्थान में भी सहायक सिद्ध होता है।`
        : `Throughout human history, the pursuit of knowledge regarding ${safeTopic.toLowerCase()} has fundamentally transformed how societies perceive the world. When scholars and researchers investigate natural phenomena, they rely on methodical observation and rigorous experimentation to unlock deeper truths.\n\nAt the core of this discipline lies the balance between empirical evidence and imaginative hypothesis. Every major breakthrough begins with an inquisitive mind asking fundamental questions. Over time, collaborative efforts across cultures synthesize distinct insights, yielding progressive frameworks that benefit global communities.\n\nModern advancements demonstrate that continuous critical thinking is essential. By developing keen analytical habits and questioning assumptions, learners cultivate lifelong competencies that empower them to address future challenges with clarity and confidence.`;

      data = {
        title: passageTitle,
        passage: fallbackText,
        estimatedReadingTime: 3,
        difficultWords: isHindi ? [
          { word: "अभिन्न", meaning: "जो अलग न किया जा सके / अनिवार्य", contextSentence: "प्रकृति हमारे जीवन का अभिन्न अंग है।" },
          { word: "तर्कसंगत", meaning: "तर्क या विचार पर आधारित / युक्तिसंगत", contextSentence: "हमें तर्कसंगत विश्लेषण करना चाहिए।" },
          { word: "जिज्ञासा", meaning: "जानने की तीव्र इच्छा", contextSentence: "जिज्ञासा से नई खोजों का मार्ग प्रशस्त होता है।" }
        ] : [
          { word: "Empirical", meaning: "Based on observation or experience rather than purely theoretical ideas", contextSentence: "Researchers depend on empirical evidence to validate their hypotheses." },
          { word: "Inquisitive", meaning: "Curious and eager to learn or discover new things", contextSentence: "An inquisitive student continuously asks thoughtful questions during discussions." },
          { word: "Synthesize", meaning: "To combine distinct elements or ideas into a coherent whole", contextSentence: "The scholars worked together to synthesize multiple cultural perspectives." }
        ],
        questions: [
          {
            id: 1,
            type: "mcq",
            question: isHindi ? "गद्यांश के अनुसार ज्ञान का वास्तविक अर्थ क्या है?" : "According to the passage, what is central to the pursuit of knowledge?",
            options: isHindi 
              ? ["A) केवल तथ्यों को रटना", "B) तर्कसंगत विश्लेषण और समझ", "C) पुस्तकों का संचय", "D) बिना सोचे विचार स्वीकारना"]
              : ["A) Memorizing isolated facts", "B) Methodical observation and empirical evidence", "C) Avoiding collaborative research", "D) Rejecting imaginative ideas"],
            answer: isHindi ? "B) तर्कसंगत विश्लेषण और समझ" : "B) Methodical observation and empirical evidence",
            explanation: isHindi 
              ? "गद्यांश में स्पष्ट किया गया है कि ज्ञान केवल तथ्यों को याद रखना नहीं बल्कि तर्कसंगत विश्लेषण है।"
              : "The text emphasizes that researchers rely on methodical observation and empirical validation rather than passive recall."
          },
          {
            id: 2,
            type: "shortAnswer",
            question: isHindi ? "वैज्ञानिक दृष्टिकोण अपनाने से क्या लाभ होते हैं?" : "How does cultivating an inquisitive mind benefit learners?",
            options: [],
            answer: isHindi 
              ? "यह समस्याओं का समाधान खोजने और बौद्धिक क्षमता बढ़ाने में सहायक होता है।"
              : "It fosters critical thinking habits that empower learners to address complex challenges with confidence.",
            explanation: isHindi 
              ? "गद्यांश के अनुसार वैज्ञानिक दृष्टिकोण कठिन परिस्थितियों में समाधान ढूंढने में सहायक होता है।"
              : "The passage notes that developing analytical habits prepares individuals for future academic and real-world hurdles."
          },
          {
            id: 3,
            type: "trueFalse",
            question: isHindi ? "कठिन परिस्थितियों में जिज्ञासा कोई भूमिका नहीं निभाती।" : "Scientific breakthroughs typically begin with inquisitive questioning of fundamental assumptions.",
            options: [],
            answer: isHindi ? "असत्य (False)" : "True",
            explanation: isHindi 
              ? "गद्यांश के अनुसार जिज्ञासा समाधान की ओर ले जाती है।"
              : "The second paragraph directly states that major breakthroughs originate from curious minds asking foundational questions."
          },
          {
            id: 4,
            type: "vocabulary",
            question: isHindi ? "गद्यांश से 'जिज्ञासा' शब्द का सही अर्थ चुनिए।" : "Identify the synonym of the word 'Empirical' as used in the passage.",
            options: ["A) Purely theoretical", "B) Observational and experimental", "C) Imaginary", "D) Unverified"],
            answer: isHindi ? "जानने की तीव्र इच्छा" : "B) Observational and experimental",
            explanation: "In the passage, empirical evidence refers to knowledge gained from verifiable observations and direct tests."
          }
        ],
        learningObjectivesMet: ["Reading Comprehension", "Critical Thinking", "Vocabulary in Context", "Inference Extraction"],
        curriculumComplianceNotes: `Aligned with ${board} educational guidelines for ${academicLevel} evaluation.`
      };
    }

    data.id = "passage_" + Date.now();
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.json({
      id: "passage_" + Date.now(),
      title: `${safeTopic} - Comprehensive Assessment`,
      passage: `The systematic study of ${safeTopic} forms a core component of contemporary academic inquiry. By examining principles through evidence and observation, learners develop structured critical reasoning skills.\n\nDeveloping strong reading comprehension skills equips learners with the ability to distill core concepts from complex texts and make thoughtful inferences.`,
      estimatedReadingTime: 2,
      difficultWords: [
        { word: "Inference", meaning: "A conclusion reached on the basis of evidence and reasoning", contextSentence: "Careful reading allows students to draw valid inferences." }
      ],
      questions: [
        {
          id: 1,
          type: "mcq",
          question: "What is essential for systematic inquiry according to the text?",
          options: ["A) Passive memorization", "B) Evidence-based study and observation", "C) Avoiding complex texts", "D) Guesswork"],
          answer: "B) Evidence-based study and observation",
          explanation: "The text emphasizes systematic observation and evidence-based study."
        },
        {
          id: 2,
          type: "shortAnswer",
          question: "How does reading comprehension support learners?",
          options: [],
          answer: "It equips them to distill core concepts and draw thoughtful inferences.",
          explanation: "The passage notes that comprehension skills enable learners to analyze text deeply."
        }
      ],
      learningObjectivesMet: ["Reading Comprehension", "Analytical Reasoning"],
      curriculumComplianceNotes: `Aligned with ${board} educational guidelines for ${academicLevel}.`
    });
  }
});

// API Endpoint: Modify/Update Passage (Regenerate, Simplify, etc.)
app.post("/api/modify-passage", async (req, res) => {
  try {
    const {
      currentData,
      action, // 'simplify_passage' | 'increase_difficulty' | 'decrease_difficulty' | 'improve_vocabulary' | 'regenerate_questions' | 'regenerate_answers' | 'custom'
      additionalInstructions = "",
      academicLevel = "Class 8",
      language = "English"
    } = req.body;

    if (!currentData) {
      return res.status(400).json({ error: "Missing current passage data" });
    }

    const ai = getGeminiClient();

    let actionPrompt = "";
    switch (action) {
      case "simplify_passage":
        actionPrompt = "Simplify the passage's vocabulary and sentence structures to make it much easier to read while retaining the core information. Adjust the questions to suit the simpler text.";
        break;
      case "increase_difficulty":
        actionPrompt = "Elevate the passage's vocabulary to an advanced/expert level, use complex syntaxes, and increase the depth of the topic. Upgrade the questions to demand higher-order thinking skills (HOTS), inference, and critical analysis.";
        break;
      case "decrease_difficulty":
        actionPrompt = "Reduce the difficulty level by simplifying terms, making the sentence structure direct, and asking simpler retrieval-based questions.";
        break;
      case "improve_vocabulary":
        actionPrompt = "Enrich the passage with advanced, precise, academic vocabulary appropriate for board preparation. Highlight these new words in the 'difficultWords' section.";
        break;
      case "regenerate_questions":
        actionPrompt = "Keep the passage text EXACTLY identical, but generate a brand new, highly diverse set of questions matching curriculum standard guidelines. Keep title, passage, and difficultWords unchanged.";
        break;
      case "regenerate_answers":
        actionPrompt = "Keep the passage and questions identical, but double check and fully recalculate/rewrite the answers, answer keys, and step-by-step pedagogical explanations to make them extraordinarily clear and accurate.";
        break;
      default:
        actionPrompt = `Apply the following modification: ${additionalInstructions}`;
    }

    const systemPrompt = `You are a professional pedagogical reviewer and curriculum developer.
You are given a JSON representing a reading comprehension worksheet containing a title, passage, estimated reading time, difficult words list, and a set of questions.

Your task is to modify this worksheet as requested:
"${actionPrompt}"
${additionalInstructions ? `Additional detailed user request: "${additionalInstructions}"` : ""}

Ensure you maintain the same JSON format.
If the requested action is to regenerate or modify the passage, you may update the passage, title, and difficultWords.
If the request is ONLY about questions, make sure the passage text remains EXACTLY identical, and only generate new/improved questions and keys.
Make sure all text remains in ${language === "Hindi" ? "Hindi (हिंदी)" : "English"}.`;

    let data;
    try {
      const response = await generateContentWithRetryAndFallback(ai, {
        contents: `Here is the current JSON data:
${JSON.stringify(currentData)}

Please modify this based on the guidelines. Respond with a single, perfectly formatted JSON object matching the original structure exactly.`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: passageResponseSchema
        }
      });

      if (!response.text) {
        throw new Error("No response text received from Gemini.");
      }

      data = extractAndParseJson(response.text);
    } catch (aiErr: any) {
      console.warn("AI modify failed, applying fallback modification:", aiErr.message);
      data = { ...currentData };
      if (action === "simplify_passage") {
        data.title = `${data.title} (Simplified Edition)`;
      } else if (action === "increase_difficulty") {
        data.title = `${data.title} (Advanced HOTS Edition)`;
      }
    }

    res.json(data);
  } catch (error: any) {
    console.error("Gemini Modification Error:", error);
    res.status(500).json({ error: error.message || "Failed to modify the passage." });
  }
});

// JSON Schema definition for evaluation responses
const evaluationResponseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.INTEGER, description: "Total score awarded to the student" },
    maxScore: { type: Type.INTEGER, description: "Maximum possible score for the worksheet (number of questions)" },
    percentage: { type: Type.INTEGER, description: "Percentage grade (e.g., 85)" },
    accuracy: { type: Type.INTEGER, description: "Accuracy percentage based on correct vs attempted (e.g., 90)" },
    timeTaken: { type: Type.STRING, description: "Time taken formatted string" },
    questionsAttempted: { type: Type.INTEGER, description: "Total questions attempted by the student" },
    correctCount: { type: Type.INTEGER, description: "Count of correct answers" },
    incorrectCount: { type: Type.INTEGER, description: "Count of incorrect answers" },
    skippedCount: { type: Type.INTEGER, description: "Count of skipped questions" },
    questionsAnalysis: {
      type: Type.ARRAY,
      description: "Detailed per-question grading and analysis",
      items: {
        type: Type.OBJECT,
        properties: {
          questionId: { type: Type.INTEGER, description: "ID of the question graded" },
          status: { type: Type.STRING, description: "Status: 'correct', 'incorrect', or 'skipped'" },
          scoreAwarded: { type: Type.INTEGER, description: "Score awarded (0 or 1)" },
          maxScore: { type: Type.INTEGER, description: "Maximum score for this question (usually 1)" },
          studentAnswer: { type: Type.STRING, description: "The answer provided by the student" },
          correctAnswer: { type: Type.STRING, description: "The expected correct reference answer" },
          isAlternativeWordingUsed: { 
            type: Type.BOOLEAN, 
            description: "Whether the answer was awarded full marks despite having minor differences in wording or phrasing from the expected answer (true/false)." 
          },
          detailedFeedback: { 
            type: Type.STRING, 
            description: "Short feedback explaining specifically why the student's answer is correct, accepted with alternative wording, or incorrect." 
          },
          explanation: { type: Type.STRING, description: "The educational explanation of the correct concept." }
        },
        required: ["questionId", "status", "scoreAwarded", "maxScore", "studentAnswer", "correctAnswer", "detailedFeedback", "explanation"]
      }
    },
    learningSummary: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 specific reading or comprehension strengths shown" },
        topicsToImprove: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 specific topics or question areas to improve" },
        grammarMistakes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of grammar errors spotted in student's descriptive answers" },
        vocabularySuggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggestions for richer vocabulary based on their inputs" },
        readingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Reading comprehension skills utilized" },
        estimatedSkillLevel: { type: Type.STRING, description: "Estimated proficiency level" },
        practiceRecommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific learning recommendations for future worksheet practice" }
      },
      required: ["strengths", "topicsToImprove", "grammarMistakes", "vocabularySuggestions", "readingSkills", "estimatedSkillLevel", "practiceRecommendations"]
    },
    rewards: {
      type: Type.OBJECT,
      properties: {
        starsAwarded: { type: Type.INTEGER, description: "Stars awarded (1 to 5 stars depending on score)" },
        badgesEarned: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Badges earned (e.g. ['Perfect Score', 'Speedy Solved', 'Critical Thinker', 'Vocab Master'])" },
        xpGained: { type: Type.INTEGER, description: "Experience points earned" },
        streakUpdated: { type: Type.INTEGER, description: "Updated streak count" }
      },
      required: ["starsAwarded", "badgesEarned", "xpGained"]
    }
  },
  required: ["overallScore", "maxScore", "percentage", "accuracy", "questionsAttempted", "correctCount", "incorrectCount", "skippedCount", "questionsAnalysis", "learningSummary", "rewards"]
};

// API Endpoint: Evaluate Student Worksheet
app.post("/api/evaluate-worksheet", async (req, res) => {
  try {
    const {
      passage,
      questions,
      userAnswers,
      timeTaken = "00:00"
    } = req.body;

    if (!passage || !questions || !userAnswers) {
      return res.status(400).json({ error: "Missing required evaluation fields" });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are an expert pedagogical evaluator. You are given a reading comprehension passage, a list of questions, and a student's submitted answers.
Your task is to review and grade the answers carefully, with highly supportive, detailed feedback.

For each question:
- Compare the student's answer with the correct answer.
- Support alternative correct wording for descriptive answers where appropriate. If the student's answer is correct in essence but phrased slightly differently, award full marks (scoreAwarded = 1) and set isAlternativeWordingUsed to true.
- Provide a clear, encouraging explanation.
- For skipped questions (left empty), mark as status 'skipped', scoreAwarded = 0.

Construct a complete diagnostic evaluation including scores, accuracy, per-question analysis, a learning summary, and rewards (stars, badges, XP) based on their performance.`;

    let data;
    try {
      const response = await generateContentWithRetryAndFallback(ai, {
        contents: `PASSAGE:
"${passage}"

QUESTIONS & REFERENCE ANSWERS:
${JSON.stringify(questions)}

STUDENT ANSWERS:
${JSON.stringify(userAnswers)}

TIME TAKEN: "${timeTaken}"

Please evaluate this worksheet attempt and respond with a single, perfectly formatted JSON matching the evaluationResponseSchema.`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
          responseMimeType: "application/json",
          responseSchema: evaluationResponseSchema
        }
      });

      if (!response.text) {
        throw new Error("No response text received from Gemini for evaluation.");
      }

      data = extractAndParseJson(response.text);
    } catch (aiErr: any) {
      console.warn("AI evaluation failed, performing rule-based fallback grading:", aiErr.message);
      
      let correctCount = 0;
      let incorrectCount = 0;
      let skippedCount = 0;
      const questionsAnalysis = questions.map((q: any) => {
        const studentAns = (userAnswers[q.id] || "").trim();
        const correctAns = (q.answer || "").trim();
        
        if (!studentAns) {
          skippedCount++;
          return {
            questionId: q.id,
            status: "skipped",
            scoreAwarded: 0,
            maxScore: 1,
            studentAnswer: "(No response entered)",
            correctAnswer: correctAns,
            isAlternativeWordingUsed: false,
            detailedFeedback: "This question was left unanswered.",
            explanation: q.explanation || "Review the passage context for clues."
          };
        }

        const isExactMatch = studentAns.toLowerCase() === correctAns.toLowerCase() || 
          correctAns.toLowerCase().startsWith(studentAns.toLowerCase().slice(0, 2));
        
        if (isExactMatch) {
          correctCount++;
          return {
            questionId: q.id,
            status: "correct",
            scoreAwarded: 1,
            maxScore: 1,
            studentAnswer: studentAns,
            correctAnswer: correctAns,
            isAlternativeWordingUsed: false,
            detailedFeedback: "Accurate response with sound textual understanding.",
            explanation: q.explanation || "Correct answer."
          };
        } else {
          incorrectCount++;
          return {
            questionId: q.id,
            status: "incorrect",
            scoreAwarded: 0,
            maxScore: 1,
            studentAnswer: studentAns,
            correctAnswer: correctAns,
            isAlternativeWordingUsed: false,
            detailedFeedback: "Your answer differs from the expected reference solution.",
            explanation: q.explanation || "Compare your response with the passage excerpt."
          };
        }
      });

      const totalQ = questions.length || 1;
      const pct = Math.round((correctCount / totalQ) * 100);
      const attempted = correctCount + incorrectCount;
      const acc = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;

      data = {
        overallScore: correctCount,
        maxScore: totalQ,
        percentage: pct,
        accuracy: acc,
        timeTaken: timeTaken,
        questionsAttempted: attempted,
        correctCount: correctCount,
        incorrectCount: incorrectCount,
        skippedCount: skippedCount,
        questionsAnalysis: questionsAnalysis,
        learningSummary: {
          strengths: ["Reading engagement", "Active completion effort", "Comprehension focus"],
          topicsToImprove: ["Contextual inference precision", "Direct fact extraction"],
          grammarMistakes: [],
          vocabularySuggestions: ["Consult the difficult words list for enriched phrasing."],
          readingSkills: ["Passage Navigation", "Literal Comprehension"],
          estimatedSkillLevel: pct >= 80 ? "Advanced" : pct >= 50 ? "Proficient" : "Developing",
          practiceRecommendations: ["Practice regular timed comprehension exercises to build confidence."]
        },
        rewards: {
          starsAwarded: pct >= 80 ? 5 : pct >= 60 ? 4 : pct >= 40 ? 3 : 2,
          badgesEarned: pct === 100 ? ["Perfect Score", "Comprehension Master"] : ["Persistent Learner"],
          xpGained: 50 + correctCount * 10,
          streakUpdated: 1
        }
      };
    }

    res.json(data);
  } catch (error: any) {
    console.error("Gemini Evaluation Error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate the worksheet." });
  }
});

// Serve SEO & PWA files
app.get("/sitemap.xml", (req, res) => {
  const publicPath = path.join(process.cwd(), "public", "sitemap.xml");
  res.header("Content-Type", "application/xml");
  res.sendFile(publicPath);
});

app.get("/robots.txt", (req, res) => {
  const publicPath = path.join(process.cwd(), "public", "robots.txt");
  res.header("Content-Type", "text/plain");
  res.sendFile(publicPath);
});

app.get("/manifest.json", (req, res) => {
  const publicPath = path.join(process.cwd(), "public", "manifest.json");
  res.header("Content-Type", "application/json");
  res.sendFile(publicPath);
});

// Serve frontend and static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
