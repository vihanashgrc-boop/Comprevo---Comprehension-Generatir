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
      apiKey: key || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  options: {
    contents: any;
    config: any;
  }
) {
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-pro",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite"
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    const maxRetries = 2;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Gemini] Attempting generation with model: ${model} (Attempt ${attempt}/${maxRetries})`);
        const response = await ai.models.generateContent({
          model: model,
          contents: options.contents,
          config: options.config,
        });

        if (response && response.text) {
          console.log(`[Gemini] Generation succeeded with model: ${model}`);
          return response;
        }
        throw new Error("Received empty response from Gemini.");
      } catch (error: any) {
        lastError = error;
        console.error(`[Gemini] Error with model ${model} on attempt ${attempt}:`, error.message || error);
        
        // If it's not a temporary or demand-related error, we might still want to try the fallback model.
        // Wait a small amount of time before retrying the same model
        if (attempt < maxRetries) {
          const delay = attempt * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    console.warn(`[Gemini] Model ${model} failed after all retries. Falling back...`);
  }

  throw lastError || new Error("Failed to generate content after trying multiple models and retries.");
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

    const data = JSON.parse(response.text.trim());
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
  try {
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
    } = req.body;

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
- Topic: ${topic}
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
- All text must be in ${language === "Hindi" ? "Hindi (हिंदी)" : "English"}. If Hindi is chosen, ensure the whole JSON (title, passage, questions, difficult words, explanations) is in Hindi except for standard JSON keys.`;

    const response = await generateContentWithRetryAndFallback(ai, {
      contents: `Create a reading comprehension passage and assessment. 
Topic details: "${topic}". 
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

    const data = JSON.parse(response.text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate passage. Please verify your configurations and API key." });
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

    const data = JSON.parse(response.text.trim());
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

    const data = JSON.parse(response.text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Evaluation Error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate the worksheet." });
  }
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
