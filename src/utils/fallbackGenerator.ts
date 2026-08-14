import { GeneratedPassage, Question, DifficultWord } from "../types";

interface FallbackConfig {
  board?: string;
  academicLevel?: string;
  difficulty?: string;
  topic?: string;
  passageType?: string;
  passageLength?: string;
  vocabularyLevel?: string;
  language?: "English" | "Hindi";
  questionTypes?: string[];
  grammarOptions?: string[];
  randomizedFields?: any;
}

const TOPIC_TEMPLATES: Record<string, { title: string; passage: string; words: DifficultWord[]; questions: Question[] }> = {
  "Science": {
    title: "The Architecture of Scientific Inquiry: Unraveling the Natural World",
    passage: `Science is fundamentally a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe. From the microscopic interactions of subatomic particles to the grand expanses of celestial galaxies, scientific inquiry relies on rigorous observation, structured hypothesis formulation, and empirical verification.\n\nThroughout the Renaissance and the Scientific Revolution, pioneers like Galileo and Newton demonstrated that empirical measurements should supersede philosophical dogma. When scientists conduct experiments, they control confounding variables to isolate causal mechanisms. This methodical rigor ensures that findings can be independently replicated by peers across the globe, establishing a collective foundation of verifiable truth.\n\nIn modern laboratories, interdisciplinary collaboration has accelerated breakthrough discoveries. Genomics, quantum computing, and materials science increasingly merge, offering innovative solutions to pressing global dilemmas such as climate change and disease eradication. Ultimately, the essence of science is not merely a static collection of facts, but a dynamic, self-correcting quest driven by curiosity and intellectual integrity.`,
    words: [
      { word: "Empirical", meaning: "Based on, concerned with, or verifiable by observation or experience rather than theory.", contextSentence: "Scientists require empirical verification before accepting a novel hypothesis." },
      { word: "Confounding", meaning: "Factors other than the independent variable that may cause a result.", contextSentence: "Researchers carefully control confounding variables in clinical trials." },
      { word: "Interdisciplinary", meaning: "Relating to more than one branch of knowledge.", contextSentence: "Interdisciplinary collaboration enables complex problems to be solved creatively." },
      { word: "Dogma", meaning: "A principle or set of principles laid down by an authority as incontrovertibly true.", contextSentence: "Empirical evidence encouraged thinkers to question centuries of dogma." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "According to the passage, what is the defining characteristic of scientific knowledge?",
        options: [
          "A) It is based purely on historical dogma and philosophical tradition.",
          "B) It consists of testable explanations, predictions, and empirical verification.",
          "C) It avoids international peer replication to maintain secrecy.",
          "D) It remains permanently static and immutable over time."
        ],
        answer: "B) It consists of testable explanations, predictions, and empirical verification.",
        explanation: "The opening paragraph explicitly identifies science as building knowledge through testable explanations and empirical verification."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Why do researchers control confounding variables during experimental investigations?",
        options: [],
        answer: "To isolate causal mechanisms and ensure that observed effects are directly attributable to the variable being tested.",
        explanation: "Controlling confounding variables prevents external factors from distorting the experimental results."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "Scientific progress relies on independent replication of findings by peer researchers worldwide.",
        options: [],
        answer: "True",
        explanation: "Paragraph two emphasizes that methodical rigor ensures findings can be independently replicated by peers globally."
      },
      {
        id: 4,
        type: "vocabulary",
        question: "Which of the following is the closest synonym to 'Empirical' as used in paragraph 2?",
        options: ["A) Observational / Evidence-based", "B) Purely Theoretical", "C) Fictional", "D) Untestable"],
        answer: "A) Observational / Evidence-based",
        explanation: "Empirical refers directly to knowledge rooted in observable evidence and experimental measurement."
      },
      {
        id: 5,
        type: "inference",
        question: "What does the author imply by describing science as a 'dynamic, self-correcting quest'?",
        options: [
          "A) Scientific theories never change once established.",
          "B) New evidence can refine or overturn outdated theories over time.",
          "C) Scientists work without guidelines or peer review.",
          "D) Errors in science are ignored by researchers."
        ],
        answer: "B) New evidence can refine or overturn outdated theories over time.",
        explanation: "A self-correcting process continuously updates its understanding as new experimental insights emerge."
      }
    ]
  },
  "Environment": {
    title: "Ecosystem Resilience: The Web of Biodiversity and Climate Stability",
    passage: `Earth's biosphere is an intricately interconnected tapestry where every organism, from subterranean nitrogen-fixing bacteria to apex canopy predators, plays an indispensable ecological role. Biodiversity provides crucial ecosystem services, including air purification, watershed regulation, soil regeneration, and pollination of agricultural crops upon which human survival depends.\n\nAnthropogenic pressures—such as habitat fragmentation, industrial deforestation, and greenhouse gas emissions—have strained these natural equilibria. When keystone species disappear, trophic cascades can destabilize entire biomes. For instance, the degradation of coastal mangrove forests diminishes natural buffers against storm surges, exacerbating shoreline erosion and imperiling marine nurseries.\n\nConservation biologists advocate for landscape-scale restoration and the establishment of ecological corridors that allow wildlife migration. Transitioning toward circular economies and sustainable resource management is no longer merely an ethical aspiration, but an ecological necessity. Preserving planetary biodiversity guarantees the resilience required to withstand climatic volatility for generations to come.`,
    words: [
      { word: "Anthropogenic", meaning: "Originating in human activity, especially regarding environmental pollution.", contextSentence: "Anthropogenic emissions are the primary driver of rapid modern climate shifts." },
      { word: "Trophic Cascade", meaning: "Side-effect when a trophic level (species) of the ecosystem is reduced or removed.", contextSentence: "The loss of wolves initiated a trophic cascade throughout the national park." },
      { word: "Resilience", meaning: "The capacity of an ecosystem to recover from disturbance or damage.", contextSentence: "High biodiversity increases the ecological resilience of coral reef systems." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What primary danger arises when keystone species are eliminated from an ecosystem?",
        options: [
          "A) It immediately increases agricultural crop yields.",
          "B) It triggers trophic cascades that destabilize entire biomes.",
          "C) It prevents atmospheric carbon dioxide from dispersing.",
          "D) It expands mangrove coverage along coastlines."
        ],
        answer: "B) It triggers trophic cascades that destabilize entire biomes.",
        explanation: "Paragraph two notes that the loss of keystone species triggers trophic cascades, destabilizing the entire ecosystem."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Mention two ecosystem services provided by biodiversity according to the text.",
        options: [],
        answer: "Air purification, watershed regulation, soil regeneration, or agricultural crop pollination.",
        explanation: "The first paragraph lists these vital ecosystem functions supported by biological diversity."
      },
      {
        id: 3,
        type: "vocabulary",
        question: "What is the meaning of the term 'Anthropogenic' in the passage?",
        options: ["A) Human-caused", "B) Natural occurrence", "C) Ancient", "D) Aquatic"],
        answer: "A) Human-caused",
        explanation: "Anthropogenic specifically denotes processes or impacts originating from human activities."
      }
    ]
  },
  "Space": {
    title: "Cosmic Horizons: The New Era of Deep-Space Exploration",
    passage: `For millennia, humanity gazed at the night sky with wonder, charting constellations and pondering the origins of the cosmos. In the modern era, telescope technology and interplanetary robotic probes have transformed astrophysics from speculative observation into profound observational science. Space telescopes positioned at gravitational Lagrange points capture infrared photons emitted over thirteen billion years ago, peering into the cosmic dawn.\n\nSpace exploration is not merely an academic endeavor; it drives technological innovation across materials science, telecommunications, and robotics. Modern lunar exploration under international accords aims to establish sustainable base stations that will serve as stepping stones for crewed missions to Mars. Developing closed-loop life support systems and in-situ resource utilization technologies on the Moon provides crucial blueprints for long-duration interplanetary travel.\n\nBeyond utilitarian benefits, the search for biosignatures on icy moons like Europa and Enceladus addresses the fundamental question: Are we alone? Discovering extraterrestrial microbial life would redefine humanity's philosophical place in the universe, emphasizing our shared identity on this fragile pale blue dot.`,
    words: [
      { word: "Lagrange Points", meaning: "Positions in space where the gravitational forces of two large bodies balance out.", contextSentence: "Telescopes stationed at Lagrange points maintain stable observation orbits." },
      { word: "Biosignatures", meaning: "Any substance, element, or feature providing scientific evidence of past or present life.", contextSentence: "Spectroscopic analysis looks for biosignatures in exoplanet atmospheres." },
      { word: "In-situ", meaning: "In its original place; utilizing local materials where they are found.", contextSentence: "In-situ resource utilization allows astronauts to harvest lunar water ice." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Why are space telescopes positioned at gravitational Lagrange points?",
        options: [
          "A) To capture cosmic infrared photons from a stable, unobstructed vantage point.",
          "B) To avoid radio communication with ground stations.",
          "C) To harvest lunar soil directly for rocket propellant.",
          "D) To orbit closely around low Earth satellites."
        ],
        answer: "A) To capture cosmic infrared photons from a stable, unobstructed vantage point.",
        explanation: "Lagrange points allow telescopes to maintain stable orbital alignments to capture pristine deep-space observations."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "What is the purpose of testing closed-loop life support systems on the Moon?",
        options: [],
        answer: "To serve as a blueprint and technical testbed for future long-duration crewed missions to Mars.",
        explanation: "The second paragraph highlights that lunar life support systems prepare astronauts for extended interplanetary travel."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "Discovering biosignatures on icy moons would confirm the presence of extraterrestrial life.",
        options: [],
        answer: "True",
        explanation: "Biosignatures represent measurable chemical or physical evidence of living organisms."
      }
    ]
  }
};

export function generateClientFallbackPassage(config: FallbackConfig): GeneratedPassage {
  const chosenTopicKey = Object.keys(TOPIC_TEMPLATES).find(k => 
    k.toLowerCase() === (config.topic || "").toLowerCase()
  ) || "Science";

  const template = TOPIC_TEMPLATES[chosenTopicKey] || TOPIC_TEMPLATES["Science"];
  const isHindi = config.language === "Hindi";

  const fallbackTitle = isHindi 
    ? `${config.topic || "ज्ञान"} - विशेष अध्ययन अभ्यास`
    : template.title;

  const fallbackPassage = isHindi
    ? `ज्ञान और अनुसंधान मानव सभ्यता की प्रगति के आधार स्तंभ हैं। जब हम किसी विषय का गहन और क्रमबद्ध अध्ययन करते हैं, तो हमें नए तथ्यों और सिद्धांतों की समझ प्राप्त होती है।\n\nवैज्ञानिक दृष्टिकोण हमें अंधविश्वास से दूर रखकर तार्किक सोचने की क्षमता प्रदान करता है। किसी भी समस्या का समाधान ढूंढने के लिए अवलोकन, परिकल्पना और परीक्षण आवश्यक चरण हैं। जब छात्र नियमित रूप से गद्यांशों का विश्लेषण करते हैं, तो उनकी भाषा दक्षता और बौद्धिक क्षमता में अभूतपूर्व वृद्धि होती है।\n\nअतः प्रत्येक शिक्षार्थी को निरंतर स्वाध्याय और विवेकपूर्ण अध्ययन में संलग्न रहना चाहिए।`
    : template.passage;

  const fallbackWords: DifficultWord[] = isHindi ? [
    { word: "क्रमबद्ध", meaning: "एक निश्चित क्रम या नियम के अनुसार व्यवस्थित", contextSentence: "क्रमबद्ध अध्ययन से कठिन विषय भी सरल हो जाते हैं।" },
    { word: "तार्किक", meaning: "तर्क पर आधारित / युक्तिसंगत", contextSentence: "वैज्ञानिक दृष्टिकोण तार्किक सोच को बढ़ावा देता है।" },
    { word: "अभ्यास", meaning: "निरंतर प्रयास और सीखना", contextSentence: "नियमित अभ्यास से परीक्षा में सफलता मिलती है।" }
  ] : template.words;

  const fallbackQuestions: Question[] = isHindi ? [
    {
      id: 1,
      type: "mcq",
      question: "गद्यांश के अनुसार मानव सभ्यता की प्रगति का मुख्य आधार क्या है?",
      options: ["A) अंधविश्वास", "B) ज्ञान और अनुसंधान", "C) केवल भौतिक साधन", "D) बिना सोचे विचार करना"],
      answer: "B) ज्ञान और अनुसंधान",
      explanation: "गद्यांश की पहली पंक्ति में ज्ञान और अनुसंधान को सभ्यता की प्रगति का आधार स्तंभ बताया गया है।"
    },
    {
      id: 2,
      type: "shortAnswer",
      question: "वैज्ञानिक दृष्टिकोण शिक्षार्थी को किस प्रकार सहायता करता है?",
      options: [],
      answer: "यह अंधविश्वास से दूर रखकर तार्किक सोचने और समस्याओं का समाधान करने में सहायता करता है।",
      explanation: "दूसरे अनुच्छेद में वैज्ञानिक दृष्टिकोण के लाभों का वर्णन किया गया है।"
    },
    {
      id: 3,
      type: "trueFalse",
      question: "नियमित गद्यांश विश्लेषण से भाषा दक्षता और बौद्धिक क्षमता बढ़ती है।",
      options: [],
      answer: "True",
      explanation: "गद्यांश में स्पष्ट रूप से उल्लेख है कि नियमित अभ्यास से भाषा दक्षता में वृद्धि होती है।"
    }
  ] : template.questions;

  return {
    id: `passage_${Date.now()}`,
    timestamp: new Date().toLocaleDateString(),
    title: fallbackTitle,
    passage: fallbackPassage,
    estimatedReadingTime: Math.max(2, Math.round(fallbackPassage.split(" ").length / 100)),
    difficultWords: fallbackWords,
    questions: fallbackQuestions,
    learningObjectivesMet: [
      "Reading Comprehension",
      "Critical Thinking & Inference",
      "Contextual Vocabulary Acquisition",
      "Textual Evidence Identification"
    ],
    curriculumComplianceNotes: `Curriculum standard assessment mapped for ${config.academicLevel || "Class 8"} (${config.board || "National Standard"}).`,
    config: {
      board: (config.board as any) || "National Standard",
      academicLevel: config.academicLevel || "Class 8",
      difficulty: (config.difficulty as any) || "Medium",
      topic: config.topic || "Science",
      passageType: config.passageType || "Informative",
      passageLength: config.passageLength || "Medium",
      vocabularyLevel: config.vocabularyLevel || "Grade-Level Standard",
      language: config.language || "English"
    },
    randomizedFields: config.randomizedFields
  };
}
