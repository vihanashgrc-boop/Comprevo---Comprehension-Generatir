import { GeneratedPassage, DifficultWord, Question } from "../types";

export const TOPIC_ANGLES: Record<string, string[]> = {
  "Science": [
    "Bioluminescence in deep-sea organisms of the Mariana Trench",
    "How photosynthesis operates at the sub-cellular chloroplast level",
    "Alexander Fleming's serendipitous laboratory discovery of penicillin",
    "Aerodynamics and how Bernoulli's principle keeps massive aircraft aloft",
    "Magnetoreception: How migratory birds navigate using Earth's magnetic field",
    "The science of earthquakes, seismographs, and the Richter scale",
    "Hydrothermal vent ecosystems flourishing without sunlight via chemosynthesis",
    "The chemistry of fermentation and microscopic yeast metabolism in bread-making",
    "How the human immune system manufactures memory antibodies against pathogens",
    "Van der Waals electrostatic forces enabling geckos to climb vertical glass",
    "Superconductivity and zero electrical resistance at cryogenic temperatures",
    "The water cycle, subterranean aquifers, and artesian spring dynamics",
    "The physics of sound resonance, decibels, and ultrasonic acoustic waves",
    "How carnivorous plants like the Venus flytrap sense and trap prey",
    "Volcanic plate tectonics, magma viscosity, and caldera formation",
    "The discovery of extremophile bacteria thriving in boiling acidic hot springs"
  ],
  "Space": [
    "The James Webb Space Telescope imaging galaxies formed during the cosmic dawn",
    "Perseverance Rover's search for ancient microbial biosignatures in Jezero Crater",
    "The physics of black hole event horizons, spaghettification, and accretion disks",
    "Subsurface oceans and cryogenic geysers on Saturn's moon Enceladus",
    "The 40-year interstellar journey of Voyager 1 and the Golden Record",
    "How astronauts prevent bone density loss and muscle atrophy aboard the ISS",
    "Planetary defense: The DART mission and kinetic asteroid deflection",
    "The life cycle of massive stars: from nebulae to supernovas and neutron stars",
    "Jupiter's Great Red Spot: A 400-year-old high-pressure anticyclonic storm",
    "The search for habitable exoplanets in the Goldilocks zone of TRAPPIST-1",
    "Solar wind, coronal mass ejections, and the geomagnetic science of Auroras",
    "Building permanent lunar habitats using 3D-printed regolith at the South Pole"
  ],
  "Environment": [
    "Trophic cascades: How reintroducing gray wolves regenerated Yellowstone's rivers",
    "Mangrove wetlands acting as coastal bio-shields against tsunamis and storm surges",
    "The multi-generational navigation mystery of monarch butterfly migration",
    "The Great Green Wall of Africa: Battling Sahara desertification with native acacia trees",
    "Peatlands and bogs: The planet's densest terrestrial carbon storage sinks",
    "Autonomous underwater robots restoring bleached coral reefs through larval seeding",
    "Urban vertical farming and 95% water reduction through closed-loop aeroponics",
    "The subterranean mycorrhizal 'Wood Wide Web' connecting trees in old-growth forests",
    "The chemistry of ocean acidification and its impact on calcium-shelled plankton",
    "Rewilding European bison to restore biodiversity in temperate grassland ecosystems",
    "Ancient stepwells (Baolis) of western India and community rainwater harvesting",
    "Honeybee colony communication: The physics and mathematics of the waggle dance"
  ],
  "Technology": [
    "How machine learning neural networks learn to diagnose rare medical radiographs",
    "The engineering evolution of silicon microchips and quantum tunneling limits",
    "Autonomous deep-sea gliders mapping the uncharted ocean floor using sonar",
    "Quantum computing: Qubits, superposition, and quantum entanglement encryption",
    "3D bioprinting of vascularized human tissues for organ transplants",
    "The creation of the World Wide Web by Tim Berners-Lee at CERN in 1989",
    "Smart power grids dynamically routing wind and solar energy with algorithmic balance",
    "LiDAR technology revealing lost ancient civilizations hidden under dense jungle canopies",
    "The engineering of bipedal humanoid robots mastering dynamic real-time balance",
    "Undersea fiber-optic cables: The physical backbone carrying 99% of global internet traffic"
  ],
  "AI": [
    "Computer vision: How convolutional neural networks detect objects in self-driving cars",
    "Natural language processing and how transformers predict contextual word tokens",
    "AI-guided protein folding: AlphaFold predicting 200 million biological molecular shapes",
    "The ethical alignment challenge: Ensuring autonomous AI systems respect human values",
    "AI in climate modeling: Predicting extreme weather patterns with hyper-local precision",
    "Reinforcement learning: How AI algorithms master complex games like Chess and Go",
    "Synthetic voice generation, deepfakes, and cryptographic digital watermarking",
    "AI in precision agriculture: Drones identifying weed clusters and optimizing irrigation"
  ],
  "History": [
    "Jean-François Champollion decoding ancient Egyptian hieroglyphs via the Rosetta Stone",
    "The architectural engineering and acoustic design of the Colosseum in Rome",
    "The ancient Silk Road: How caravan trade networks exchanged silk, spices, and philosophies",
    "The Indus Valley Civilization's advanced grid-planned cities, baths, and covered brick drainage",
    "The construction of the Great Wall of China during the Qin and Ming dynasties",
    "Johannes Gutenberg's movable metal type printing press and the spread of global literacy",
    "Polynesian wayfinders navigating thousands of Pacific ocean miles using stars, winds, and swells",
    "The Library of Alexandria and the tragic loss of ancient world knowledge",
    "The Bletchley Park codebreakers and the mathematical decryption of the Enigma cipher",
    "Ashoka the Great: The Kalinga war transformation and rock edicts of non-violence",
    "The Inca empire's woven rope suspension bridges (Keshwa Chaca) across Andean gorges",
    "Mahatma Gandhi's 1930 Salt March: The non-violent catalyst that mobilized millions"
  ],
  "Wildlife": [
    "The matriarchal leadership and grief mourning rituals of African elephant herds",
    "Echolocation hunting strategies of orca pods in Antarctic pack ice",
    "The high-altitude survival adaptations of the elusive Himalayan snow leopard",
    "Leafcutter ant megacolonies cultivating underground subterranean fungal gardens",
    "Arctic terns: The annual 44,000-mile migration from the Arctic Circle to Antarctica",
    "The mimicry genius of the Australian lyrebird imitating mechanical and avian sounds",
    "The astonishing limb and spinal cord regeneration capabilities of the axolotl",
    "Tool manufacture and problem-solving intelligence in New Caledonian crows",
    "The cooperative hunting tactics and sentinel lookout systems of meerkat mobs",
    "The incredible camouflage and skin color-shifting chromatophores of the cuttlefish"
  ],
  "Sports": [
    "The biomechanics and ground-reaction forces of Usain Bolt's 100m sprint stride",
    "The psychological concept of 'flow state' and hyper-focus in elite championship athletes",
    "The physiology of altitude training and red blood cell adaptations in marathon runners",
    "The evolution of the Olympic Games: From ancient Olympia footraces to modern global games",
    "Hydrodynamics, flip-turns, and drag-reduction suit technology in competitive swimming",
    "The mathematics of spin, Magnus effect, and curveball trajectory in baseball and cricket",
    "Preventing athlete concussions through modern sensor-equipped impact-absorbing helmets",
    "Nutrition, glycogen depletion, and the metabolic phenomenon of 'hitting the wall'"
  ],
  "Indian Culture": [
    "The astronomical precision of the 18th-century stone instruments at Jantar Mantar",
    "The architectural marvel of the Thanjavur Brihadeeswara Temple and its single-stone dome",
    "The mathematical symmetry, geometry, and cultural meaning of morning Kolam and Rangoli",
    "Nalanda University: The ancient residential university that attracted scholars across Asia",
    "The ecological conservation vows of the Bishnoi community protecting Khejri trees and blackbucks",
    "The acoustic engineering and micro-chiseled musical pillars of Hampi's Vittala Temple",
    "The history of Indian spices, black pepper trade, and the ancient Malabar port of Muziris",
    "Classical Kathakali: The rigorous facial gesture language (Mudras) and vibrant storytelling"
  ],
  "Festivals": [
    "The science and celestial astronomy behind Makar Sankranti and the Sun's northern journey",
    "Diwali: The historical, philosophical, and communal celebration of light overcoming darkness",
    "Holi: The cultural arrival of spring, botanical herbal colors, and social harmony",
    "Onam and the folklore of King Mahabali celebrated with Athapookalam floral carpets and boat races",
    "Durga Puja: UNESCO heritage, artisanal clay idol crafting in Kumartuli, and community pandals",
    "Bihu of Assam: Celebrating agricultural agrarian seasons with traditional rhythmic folk dance"
  ],
  "Health": [
    "The architecture of sleep cycles, REM dreaming, and memory consolidation in the human brain",
    "The gut microbiome: How trillions of symbiotic intestinal bacteria influence immune health",
    "Neuroplasticity: How the brain rewires and forms new synaptic pathways when learning skills",
    "The cardiovascular benefits of aerobic exercise on arterial elasticity and heart rate variability",
    "The science of hydration, electrolyte osmolarity, and cellular water absorption",
    "The physiology of stress: How cortisol and adrenaline trigger the fight-or-flight response"
  ],
  "Literature": [
    "Rabindranath Tagore's Nobel Prize-winning Gitanjali and his educational vision at Shantiniketan",
    "The lyrical nature poetry of William Wordsworth and the British Romantic literary movement",
    "The allegorical storytelling and moral themes in George Orwell's classic literature",
    "The timeless wisdom, animal fables, and statecraft lessons of the ancient Panchatantra",
    "The intricate mystery structure and deductive reasoning in Arthur Conan Doyle's Sherlock Holmes",
    "R.K. Narayan's vivid fictional town of Malgudi capturing the essence of Indian life"
  ],
  "Biography": [
    "Dr. A.P.J. Abdul Kalam: The humble Rameswaram boy who became India's 'Missile Man' and President",
    "Marie Curie: The first person to win two Nobel Prizes in Physics and Chemistry through selfless research",
    "Srinivasa Ramanujan: The self-taught mathematical prodigy whose theorems baffled Cambridge scholars",
    "Jane Goodall: Transforming primatology by proving wild chimpanzees make and use tools",
    "Kalpana Chawla: The determined girl from Karnal who realized her dream of voyaging into outer space",
    "Nelson Mandela: The 27-year imprisonment and extraordinary leadership uniting a divided nation"
  ],
  "Geography": [
    "The geological uplift of the Himalayas formed by the collision of the Indian and Eurasian plates",
    "The Mariana Trench and Challenger Deep: Navigating the planet's deepest ocean abysses",
    "The Amazon River basin: The hydrological engine recycling one-fifth of the world's freshwater",
    "The Thar Desert's arid climate adaptations, shifting sand barchans, and saline playa lakes",
    "The Ring of Fire: Pacific tectonic subduction zones, ocean trenches, and volcanic island arcs"
  ],
  "Economics": [
    "The economic history of currency: From cowrie shell bartering to modern digital transactions",
    "Supply, demand, and how market equilibrium prices are determined in everyday commerce",
    "Inflation, purchasing power, and the stabilizing role of central national banks",
    "Microfinance and small community self-help loans transforming rural women's livelihoods"
  ],
  "Agriculture": [
    "The Green Revolution: High-yielding wheat varieties and irrigation innovations ending food shortages",
    "Drip irrigation technology delivering micro-droplets directly to crop roots with zero runoff",
    "Organic vermicomposting and restoring natural soil fertility using earthworm bio-digestion",
    "Crop rotation and planting nitrogen-fixing legumes to naturally replenish depleted agricultural soils"
  ],
  "Astronomy": [
    "The discovery of the cosmic microwave background radiation confirming the Big Bang theory",
    "Exoplanet transit spectroscopy: Detecting water vapor and atmospheres around distant alien suns",
    "Pulsars: Rapidly spinning neutron stars emitting precise cosmic lighthouse radio beams",
    "The life and death of our Sun: From stable main-sequence star to swollen Red Giant"
  ]
};

// Top 5 clickable angle pills for each topic in the UI
export const TOPIC_ANGLE_SUGGESTIONS: Record<string, string[]> = {
  "Science": [
    "Mariana Trench Bioluminescence",
    "How Airplanes Fly (Aerodynamics)",
    "Discovery of Penicillin",
    "Bird Magnetoreception Navigation",
    "Photosynthesis at Cellular Level",
    "The Science of Earthquakes"
  ],
  "Space": [
    "James Webb Telescope Discoveries",
    "Mars Perseverance Rover & Biosignatures",
    "Enceladus Subsurface Ocean Geysers",
    "Black Hole Event Horizons",
    "Voyager 1 Interstellar Journey",
    "Planetary Defense (DART Mission)"
  ],
  "Environment": [
    "Yellowstone Wolves Trophic Cascade",
    "Mangroves as Coastal Tsunami Shields",
    "Monarch Butterfly Multi-Gen Migration",
    "Africa's Great Green Wall",
    "Old-Growth Wood Wide Web Fungi",
    "Coral Reef Robotic Restoration"
  ],
  "Technology": [
    "Quantum Computing & Superposition",
    "Undersea Global Fiber-Optic Cables",
    "3D Bioprinting Human Tissues",
    "LiDAR Revealing Ancient Lost Cities",
    "Smart Clean-Energy Power Grids",
    "Invention of the World Wide Web"
  ],
  "AI": [
    "AlphaFold & 200M Protein Shapes",
    "Computer Vision in Autonomous Vehicles",
    "AI Climate Weather Modeling",
    "Reinforcement Learning in Chess & Go",
    "AI Precision Agriculture Drones",
    "Ethical Alignment in Smart Systems"
  ],
  "History": [
    "Decoding the Rosetta Stone",
    "Ancient Indus Valley Sanitation & Grid Cities",
    "Silk Road Cultural Trade Caravans",
    "Bletchley Park Enigma Codebreaking",
    "Gutenberg's Movable Type Printing Press",
    "Polynesian Wayfinders Pacific Navigation"
  ],
  "Wildlife": [
    "African Elephant Mourning Rituals",
    "Antarctic Orca Pack Echolocation",
    "Himalayan Snow Leopard Adaptations",
    "Leafcutter Ant Fungal Agriculture",
    "Arctic Tern 44,000-Mile Migration",
    "Axolotl Regenerative Biology"
  ],
  "Sports": [
    "Usain Bolt Sprint Biomechanics",
    "The Psychology of 'Flow State'",
    "High-Altitude Marathon Training",
    "Swimming Drag Reduction Technology",
    "Magnus Effect in Baseball & Cricket",
    "Evolution of Modern Olympic Games"
  ],
  "Indian Culture": [
    "Jantar Mantar Astronomical Precision",
    "Brihadeeswara Temple Architecture",
    "Geometry & Symmetry of Kolam/Rangoli",
    "Ancient Nalanda University Heritage",
    "Bishnoi Community Nature Conservation",
    "Hampi Musical Pillars Acoustic Physics"
  ],
  "Festivals": [
    "Astronomy Behind Makar Sankranti",
    "History & Philosophy of Diwali",
    "Botanical Science & Colors of Holi",
    "Onam Folklore & Athapookalam Carpets",
    "Durga Puja Clay Idol Artisans",
    "Assam Bihu Agrarian Harvest Dance"
  ],
  "Health": [
    "Architecture of Sleep & REM Memory",
    "Gut Microbiome & Immune Defenses",
    "Neuroplasticity & Brain Learning",
    "Cardiovascular Aerobic Endurance",
    "Electrolyte Balance & Hydration",
    "Physiology of Fight-or-Flight"
  ],
  "Literature": [
    "Tagore's Gitanjali & Shantiniketan",
    "Wordsworth's Romantic Nature Poetry",
    "Allegory in George Orwell's Classics",
    "Ancient Panchatantra Fables & Statecraft",
    "Deductive Logic of Sherlock Holmes",
    "R.K. Narayan's Malgudi Stories"
  ],
  "Biography": [
    "Dr. A.P.J. Abdul Kalam's Inspiring Journey",
    "Marie Curie's Dual Nobel Laureate Feat",
    "Srinivasa Ramanujan's Mathematical Wonders",
    "Jane Goodall's Chimpanzee Discoveries",
    "Kalpana Chawla's Cosmic Journey",
    "Nelson Mandela's Path to Unity"
  ]
};

// Function to choose a unique angle that hasn't been generated recently
export function getUniqueTopicAngle(topic: string, excludeTitles: string[] = []): string {
  const angles = TOPIC_ANGLES[topic] || TOPIC_ANGLES["Science"];
  const lowerExcludes = excludeTitles.map(t => t.toLowerCase());

  // Filter out angles whose core keywords already appear in recent titles
  const availableAngles = angles.filter(angle => {
    const keywords = angle.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const hasOverlap = keywords.some(kw => lowerExcludes.some(title => title.includes(kw)));
    return !hasOverlap;
  });

  const pool = availableAngles.length > 0 ? availableAngles : angles;
  return pool[Math.floor(Math.random() * pool.length)];
}

// 20+ rich, complete, distinct reading comprehension passages for fail-safe non-repetitive generation
export const COMPREVO_DIVERSE_FALLBACKS: Array<{
  topic: string;
  subtopic: string;
  title: string;
  passage: string;
  words: DifficultWord[];
  questions: Question[];
}> = [
  {
    topic: "Science",
    subtopic: "Bioluminescence",
    title: "Abyssal Illuminations: The Living Lights of the Mariana Trench",
    passage: `Descending miles beneath the sunlit ocean surface into the Hadal zone of the Mariana Trench, absolute darkness envelops the water column. In this realm of crushing hydrostatic pressure and near-freezing temperatures, over ninety percent of marine creatures generate their own cold light through a biochemical process known as bioluminescence. Unlike standard incandescent lightbulbs that waste substantial energy as radiant heat, bioluminescent reactions are nearly one hundred percent energy-efficient.\n\nThis living glow is produced when a light-emitting pigment molecule called luciferin reacts with molecular oxygen, catalyzed by the enzyme luciferase. In deep-sea anglerfish, symbiotic colonies of bioluminescent bacteria inhabit a modified dorsal fin spine called the esca. Dangling this glowing lure like a fishing bait in front of its cavernous jaws, the anglerfish draws curious prey directly into striking distance.\n\nBeyond hunting, bioluminescent species employ light for camouflage and communication. Hatchetfish possess ventral photophores that emit a faint blue hue precisely matching the dim downwelling sunlight from the surface. This ingenious optical trick, known as counter-illumination, erases the fish's silhouette from predators swimming below. Studying these deep-sea adaptations offers modern geneticists and biochemists vital molecular markers to track cellular processes and develop targeted disease diagnostics.`,
    words: [
      { word: "Bioluminescence", meaning: "The production and emission of light by a living organism via a chemical reaction.", contextSentence: "Bioluminescence illuminates the pitch-black waters of the deep ocean." },
      { word: "Counter-illumination", meaning: "A method of active camouflage where an animal produces light to match its background brightness.", contextSentence: "Hatchetfish use counter-illumination to conceal their shadows from bottom-dwelling predators." },
      { word: "Photophores", meaning: "Light-emitting glandular organs found in various deep-sea animals.", contextSentence: "Ventral photophores allow fish to blend with ambient surface light." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What makes bioluminescent light fundamentally different from incandescent lightbulbs?",
        options: [
          "A) It produces light with nearly zero wasted thermal heat.",
          "B) It requires electricity generated by deep-sea currents.",
          "C) It only functions in boiling volcanic waters.",
          "D) It relies entirely on absorbing ultraviolet radiation."
        ],
        answer: "A) It produces light with nearly zero wasted thermal heat.",
        explanation: "The passage explicitly notes that bioluminescent reactions are nearly 100% efficient without wasting energy as radiant heat."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "How does the deep-sea anglerfish utilize its glowing esca to secure food?",
        options: [],
        answer: "It dangles the illuminated esca as bait in front of its mouth to lure curious prey within striking range.",
        explanation: "Paragraph two explains that the glowing lure acts like a fishing bait dangling directly before the anglerfish's jaws."
      },
      {
        id: 3,
        type: "mcq",
        question: "Which enzyme catalyzes the reaction between luciferin and oxygen to produce light?",
        options: ["A) Amylase", "B) Luciferase", "C) Pepsin", "D) Hemoglobin"],
        answer: "B) Luciferase",
        explanation: "The text states that luciferin reacts with oxygen, catalyzed specifically by the enzyme luciferase."
      },
      {
        id: 4,
        type: "vocabulary",
        question: "What is the primary function of counter-illumination as described in paragraph three?",
        options: [
          "A) To signal reproductive readiness to distant mates",
          "B) To camouflage an animal's silhouette against ambient downwelling light",
          "C) To blind attacking predators with sudden strobe flashes",
          "D) To heat up the surrounding cold ocean water"
        ],
        answer: "B) To camouflage an animal's silhouette against ambient downwelling light",
        explanation: "Counter-illumination emits light from the ventral side matching the surface brightness, erasing the animal's silhouette."
      }
    ]
  },
  {
    topic: "Environment",
    subtopic: "Trophic Cascades",
    title: "How Wolves Reshaped the Rivers of Yellowstone",
    passage: `In 1995, wildlife biologists initiated one of the most celebrated ecological experiments in modern conservation by reintroducing fourteen gray wolves into Yellowstone National Park after a seventy-year absence. During the decades without their primary apex predator, elk populations had surged unchecked. Overbrowsing by large elk herds had devastated native willow, aspen, and cottonwood saplings along river valleys, triggering rampant soil erosion and stripping habitats away from migratory songbirds and beavers.\n\nThe return of the wolves sparked a dramatic ecological chain reaction known as a trophic cascade. Wolves did not merely reduce elk numbers through predation; they fundamentally transformed elk behavior. Fearful of ambushes in narrow gorges, elk began avoiding vulnerable riverbeds and riparian corridors. Relieved from constant grazing pressure, streamside vegetation rebounded with remarkable vigor within a single decade.\n\nThe flourishing groves of riverside trees provided bountiful building timber and nutritious bark for beavers, who returned in droves to construct intricate network dams. These beaver ponds created tranquil wetland sanctuaries for amphibians, otters, and freshwater trout. Most astonishingly, the roots of the re-established forests stabilized eroding stream embankments, narrowing river channels and creating permanent meandering pools. Through this profound biological domino effect, the reintroduction of a top predator literally altered the physical geography of Yellowstone's waterways.`,
    words: [
      { word: "Trophic Cascade", meaning: "An ecological phenomenon triggered by the addition or removal of top predators, rippling down food webs.", contextSentence: "The reintroduction of wolves initiated a trophic cascade that transformed the entire park." },
      { word: "Apex Predator", meaning: "A predator at the very top of a food chain upon which no other creatures prey.", contextSentence: "Gray wolves serve as the apex predator in the Yellowstone ecosystem." },
      { word: "Riparian", meaning: "Relating to or situated on the banks of a river or stream.", contextSentence: "Riparian vegetation recovered rapidly once grazing animals were driven away." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What was the primary negative consequence of the elk population explosion prior to 1995?",
        options: [
          "A) Elks completely dammed up the mountain rivers.",
          "B) Overbrowsing stripped riparian vegetation, causing severe soil erosion.",
          "C) Elks competed with wolves for hunting small rodents.",
          "D) Elks migrated permanently away from the national park."
        ],
        answer: "B) Overbrowsing stripped riparian vegetation, causing severe soil erosion.",
        explanation: "Paragraph one explains that uncontrolled elk herds stripped willows and cottonwoods, causing extensive soil erosion along valleys."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Explain how the behavioral change in elk helped restore Yellowstone's river valleys.",
        options: [],
        answer: "Elk avoided narrow river valleys to escape wolf ambushes, allowing streamside saplings and vegetation to regrow undisturbed.",
        explanation: "Paragraph two details that fear of predation made elk avoid exposed riverbeds, giving saplings time to recover."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "Beavers returned to the park because regenerated riverside trees provided essential food and building material.",
        options: [],
        answer: "True",
        explanation: "Paragraph three notes that flourishing groves provided wood and bark for beavers to construct dams."
      },
      {
        id: 4,
        type: "vocabulary",
        question: "Based on the passage, the word 'Riparian' relates specifically to:",
        options: ["A) High mountain glaciers", "B) Arid desert plateaus", "C) Riverbanks and streamsides", "D) Underground limestone caves"],
        answer: "C) Riverbanks and streamsides",
        explanation: "Riparian refers to the ecological zone bordering rivers, streams, and freshwater banks."
      }
    ]
  },
  {
    topic: "Space",
    subtopic: "Enceladus Geysers",
    title: "The Cryogenic Plumes of Enceladus: An Ocean in Deep Freeze",
    passage: `Tucked far beyond the asteroid belt, orbiting Saturn amidst its dazzling rings, lies Enceladus—a diminutive moon scarcely five hundred kilometers in diameter. When the robotic Cassini spacecraft conducted close flybys of Enceladus in 2005, instruments detected an extraordinary planetary phenomenon: gigantic cryogenic geysers erupting from fractures near the moon's south pole, spewing ice crystals and water vapor hundreds of miles into the vacuum of space.\n\nAstronomers were captivated. Beneath Enceladus's brilliant ice-crusted exterior lies a global, liquid-water ocean kept warm by tidal dissipation. As Enceladus orbits Saturn in an eccentric elliptical path, the colossal gravitational pull of the ringed gas giant flexes and squeezes the moon's rocky core. This intense internal gravitational friction generates geothermal heat, keeping subterranean water in a liquid state despite surface temperatures plummeting below minus two hundred degrees Celsius.\n\nSpectrometric analysis of the vapor plumes revealed an astonishing chemical cocktail: simple organic molecules, methane, carbon dioxide, salts, and molecular hydrogen. On Earth, hydrogen dissolved in ocean water is produced by hydrothermal vents, providing chemical nourishment for thriving communities of chemosynthetic microbes independent of sunlight. The confirmation of hydrothermal vents on the ocean floor of Enceladus makes this frozen moon one of the most promising candidates in our solar system for discovering extraterrestrial microbial life.`,
    words: [
      { word: "Cryogenic", meaning: "Relating to or occurring at extremely low temperatures.", contextSentence: "Cryogenic geysers blast super-chilled ice particles into space." },
      { word: "Tidal Dissipation", meaning: "A process where gravitational tidal forces generate internal friction and heat inside a celestial body.", contextSentence: "Saturn's immense gravity causes tidal dissipation within Enceladus's core." },
      { word: "Hydrothermal Vents", meaning: "Fissures on the seabed from which geothermally heated water discharges.", contextSentence: "Hydrothermal vents provide the chemical energy necessary to support deep-sea ecosystems." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What physical mechanism keeps the subterranean ocean of Enceladus in a liquid state?",
        options: [
          "A) Direct sunlight warming the equator",
          "B) Tidal friction caused by Saturn's gravitational flexing",
          "C) Nuclear radiation from nearby passing asteroids",
          "D) Volcanic combustion fueled by atmospheric oxygen"
        ],
        answer: "B) Tidal friction caused by Saturn's gravitational flexing",
        explanation: "Paragraph two details that gravitational forces from Saturn squeeze Enceladus's core, generating tidal dissipation and geothermal heat."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Why was the discovery of molecular hydrogen in the plumes of Enceladus so exciting to scientists?",
        options: [],
        answer: "Molecular hydrogen indicates hydrothermal vent activity, which on Earth provides energy for chemosynthetic microbial life.",
        explanation: "Paragraph three links dissolved hydrogen to hydrothermal vents that support life without sunlight on Earth."
      },
      {
        id: 3,
        type: "mcq",
        question: "Which spacecraft made the initial discovery of the south pole ice geysers on Enceladus in 2005?",
        options: ["A) Voyager 1", "B) Cassini", "C) New Horizons", "D) Curiosity Rover"],
        answer: "B) Cassini",
        explanation: "The passage notes that the robotic Cassini spacecraft detected the cryogenic geysers during flybys in 2005."
      }
    ]
  },
  {
    topic: "History",
    subtopic: "Indus Valley Civilization",
    title: "Urban Marvels of Mohenjo-Daro: The Ancient Sanitary Engineers",
    passage: `Over four thousand years ago, along the fertile floodplains of the Indus River basin, the bronze-age Indus Valley Civilization flourished as one of humanity's earliest urban societies. While contemporary civilizations in Mesopotamia and dynastic Egypt concentrated resources on monumental pyramids and royal palaces, the planners of Harappa and Mohenjo-Daro prioritized municipal hygiene, egalitarian public architecture, and remarkably sophisticated civil engineering.\n\nExcavations reveal that Mohenjo-Daro was constructed on an orderly gridiron pattern, with wide boulevards aligned precisely to cardinal directions and bisected by secondary residential lanes. Houses were constructed from kiln-fired mud bricks manufactured with standardized dimensions adhering to a strict 1:2:4 ratio. Most impressive was their private domestic infrastructure: almost every household possessed a private bathing chamber paved with tightly fitted waterproof bricks, connected directly to a street drainage channel.\n\nBeneath the paved street thoroughfares ran covered brick sewers fitted with inspection sumps and removable flagstones for municipal silt clearance. Wastewater from domestic latrines flowed into settling jars outside house walls before entering the main drains, preventing urban blockages. At the elevated citadel stood the Great Bath, an imposing public water basin lined with bitumen waterproofing. This unprecedented devotion to public health and water sanitation stood unmatched in world history until the aqueducts of imperial Rome centuries later.`,
    words: [
      { word: "Gridiron", meaning: "A layout of streets that cross each other at right angles to form a rectangular grid.", contextSentence: "Mohenjo-Daro was built using a disciplined gridiron street plan." },
      { word: "Egalitarian", meaning: "Believing in or characterized by social equality and shared public welfare.", contextSentence: "The emphasis on civilian drainage rather than royal palaces reflected egalitarian planning." },
      { word: "Bitumen", meaning: "A natural asphalt tar used in antiquity as a heavy waterproofing sealant.", contextSentence: "Builders sealed the Great Bath with tar-like bitumen to retain water." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "How did Indus Valley architectural priorities differ from those of ancient Egypt and Mesopotamia?",
        options: [
          "A) They built massive stone pyramids for their monarchs.",
          "B) They focused primarily on municipal hygiene, sanitation, and egalitarian civic infrastructure.",
          "C) They had no permanent settlements and lived nomadic lifestyles.",
          "D) They constructed wooden naval warships rather than brick cities."
        ],
        answer: "B) They focused primarily on municipal hygiene, sanitation, and egalitarian civic infrastructure.",
        explanation: "Paragraph one contrasts Egypt's royal tombs with the Indus Valley's emphasis on municipal drainage and civic welfare."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Describe two sanitary features of the drainage system found in Mohenjo-Daro.",
        options: [],
        answer: "Covered brick sewer channels with removable flagstones for cleaning, and domestic settling jars to trap solid waste before it entered main drains.",
        explanation: "Paragraph three mentions covered sewers, removable inspection flagstones, and settling jars."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "Bricks used in Indus Valley construction followed standardized proportional measurements across cities.",
        options: [],
        answer: "True",
        explanation: "Paragraph two states that kiln-fired bricks were manufactured with standardized dimensions adhering to a 1:2:4 ratio."
      }
    ]
  },
  {
    topic: "Indian Culture",
    subtopic: "Jantar Mantar Observatories",
    title: "Jantar Mantar: The Monumental Stone Observatories of Sawai Jai Singh",
    passage: `In the early eighteenth century, Maharaja Sawai Jai Singh II of Jaipur embarked on an audacious scientific mission: to create astronomical tables of unprecedented precision by constructing gigantic stone-and-masonry astronomical instruments. Dissatisfied with small brass astrolabes and telescopes that warped or shook in desert breezes, Jai Singh reasoned that colossal stone structures, securely rooted in bedrock, would eliminate mechanical vibrations and yield permanent, infallible readings.\n\nBetween 1724 and 1735, Jai Singh erected five monumental observatories across northern India, the grandest situated in Jaipur. Known collectively as the Jantar Mantar (derived from the Sanskrit 'Yantra Mantra', meaning calculating instruments), these futuristic geometric structures resemble modern cubist sculptures. The centerpiece is the Vrihat Samrat Yantra, an immense equinoctial sundial standing twenty-seven meters high. Its colossal triangular gnomon casts a crisp shadow that sweeps across graduated marble quadrants at a rate of four millimeters per minute, measuring local solar time to an accuracy of within two seconds.\n\nOther intricate instruments include the Ram Yantra for measuring the altitude and azimuth of celestial bodies, and the Jai Prakash Yantra, featuring dual concave marble bowls mapped with inverted celestial coordinates. Jai Singh’s stone calculators synthesized Hindu astronomical treatises, Islamic mathematical tables (Zij), and European cosmological observations. Today, the Jaipur Jantar Mantar is celebrated as a UNESCO World Heritage site, standing as an enduring testament to India’s deep mathematical legacy and empirical spirit.`,
    words: [
      { word: "Astrolabe", meaning: "An ancient handheld metal instrument used to measure the positions of stars and planets.", contextSentence: "Jai Singh preferred immovable stone instruments over delicate brass astrolabes." },
      { word: "Gnomon", meaning: "The projecting rod or triangular pillar on a sundial that casts a shadow.", contextSentence: "The gigantic gnomon of the Samrat Yantra casts a shadow to calculate local solar time." },
      { word: "Azimuth", meaning: "The horizontal angular direction of a celestial object measured along the horizon.", contextSentence: "The Ram Yantra measures both celestial altitude and azimuth." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Why did Maharaja Sawai Jai Singh II prefer monumental stone instruments over traditional brass astrolabes?",
        options: [
          "A) Metal was too expensive to obtain in eighteenth-century India.",
          "B) Stone structures avoided mechanical vibrations and thermal distortion, ensuring permanent accuracy.",
          "C) Stone was lighter to transport between different cities.",
          "D) Astrolabes were prohibited by royal decree."
        ],
        answer: "B) Stone structures avoided mechanical vibrations and thermal distortion, ensuring permanent accuracy.",
        explanation: "Paragraph one explains that small metal astrolabes shook or warped, whereas massive stone anchored to bedrock provided stable precision."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "What is the function of the Vrihat Samrat Yantra sundial and how accurate is it?",
        options: [],
        answer: "It measures local solar time using a triangular gnomon casting a shadow across marble quadrants, with accuracy down to two seconds.",
        explanation: "Paragraph two states that the 27-meter sundial measures solar time accurately within two seconds."
      },
      {
        id: 3,
        type: "vocabulary",
        question: "What do the Sanskrit root words 'Yantra' and 'Mantra' mean in the name Jantar Mantar?",
        options: [
          "A) Temple and Prayer",
          "B) King and Palace",
          "C) Calculating instruments / Formulas",
          "D) Star and Planet"
        ],
        answer: "C) Calculating instruments / Formulas",
        explanation: "Paragraph two explains that Jantar Mantar derives from Sanskrit words meaning calculating instruments."
      }
    ]
  },
  {
    topic: "Technology",
    subtopic: "Undersea Fiber Optic Cables",
    title: "The Silent Arteries: The Undersea Fiber-Optic Highway",
    passage: `While the modern public assumes that cloud computing and the global internet operate primarily through high-altitude satellites, the physical reality is grounded deep on the ocean floor. Over ninety-nine percent of all transoceanic telecommunications and digital transactions travel through a labyrinth of submarine fiber-optic cables spanning more than 1.4 million kilometers across the seabed.\n\nAt the core of each submarine cable are hair-thin strands of ultra-pure silica glass. Data is encoded into rapid pulses of infrared light emitted by lasers, hurtling through the glass fiber via total internal reflection at roughly two hundred thousand kilometers per second. To prevent optical signals from degrading across vast ocean expanses, optical repeaters containing erbium-doped optical amplifiers are spliced into the cable every fifty to seventy kilometers, boosting light pulses without converting them into electrical currents.\n\nDespite transmitting billions of dollars in financial transactions every second, the deep-sea cable itself is surprisingly compact—barely the thickness of a domestic garden hose in deep water. Near shallow coastal shelves, however, cables are reinforced with multiple layers of galvanized steel armor wire and buried beneath the seabed using subsea jetting plows to shield them from fishing trawler nets and commercial ship anchors. Laying and maintaining these submerged arteries represents one of modern telecommunications' most formidable engineering achievements.`,
    words: [
      { word: "Total Internal Reflection", meaning: "The complete reflection of a light ray within a medium such as glass when striking the surface at an angle.", contextSentence: "Light pulses travel down the fiber-optic glass core through total internal reflection." },
      { word: "Optical Repeater", meaning: "A device that amplifies faint optical signals along a long-distance communications link.", contextSentence: "Repeaters are spaced every sixty kilometers to boost optical signals across the Atlantic." },
      { word: "Subsea Jetting Plow", meaning: "A specialized underwater robotic machine used to trench and bury cables under the sea floor.", contextSentence: "A jetting plow buries the cable beneath the seabed to prevent anchor snagging." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What percentage of transoceanic internet traffic travels via submarine fiber-optic cables?",
        options: ["A) Around 25%", "B) Roughly 50%", "C) Over 99%", "D) Less than 10%"],
        answer: "C) Over 99%",
        explanation: "Paragraph one explicitly states that over ninety-nine percent of all transoceanic digital traffic travels through submarine cables."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "How do optical repeaters keep laser pulses strong across ocean distances?",
        options: [],
        answer: "They use erbium-doped optical amplifiers to re-amplify the light pulses directly every 50 to 70 kilometers without converting them to electricity.",
        explanation: "Paragraph two details that erbium-doped amplifiers boost the light pulses directly along the route."
      },
      {
        id: 3,
        type: "mcq",
        question: "Why are cables near coastlines wrapped in heavy steel armor wire?",
        options: [
          "A) To withstand high water pressure in deep ocean trenches",
          "B) To protect against fishing trawlers and ship anchors in shallow water",
          "C) To conduct extra electrical power to repeaters",
          "D) To prevent shark attacks in warm tropical waters"
        ],
        answer: "B) To protect against fishing trawlers and ship anchors in shallow water",
        explanation: "Paragraph three states that near shallow coastal areas, cables are shielded with steel armor wire to prevent damage from ship anchors and fishing nets."
      }
    ]
  },
  {
    topic: "Wildlife",
    subtopic: "Himalayan Snow Leopard",
    title: "Ghost of the Peaks: The Survival Adaptations of the Snow Leopard",
    passage: `Prowling across rugged, windswept ridgelines in the high Himalayas and Central Asian mountains, the snow leopard is an evolutionary master of extreme cold. Known locally as the 'Ghost of the Mountains' for its uncanny stealth and reclusive nature, this solitary feline thrives at oxygen-depleted altitudes reaching up to five thousand five hundred meters above sea level, where temperatures regularly plunge well below minus thirty degrees Celsius.\n\nEvery anatomical feature of the snow leopard is finely tuned to its harsh alpine environment. Its dense, smoky-gray fur, dappled with dark rosettes, provides flawless camouflage against fractured granite crags and scree slopes. Its wide, fur-covered paws function like natural snowshoes, distributing body mass to prevent the cat from breaking through fragile crusts of winter snow while muffling its footsteps during stalks. A massive, heavily furred tail measuring up to one meter long acts as a counterbalance when making desperate twenty-foot leaps across jagged ravines, and doubles as a warm woolen scarf wrapped around its face to filter freezing gale-force winds during sleep.\n\nPhysiologically, snow leopards possess enlarged nasal cavities that warm and humidify icy, dry air before it reaches the lungs. Their chests are broad and deep, housing enlarged lungs and an elevated concentration of red blood cells to extract maximum oxygen from the thin mountain atmosphere. As an apex predator hunting blue sheep (bharal) and Himalayan ibex, the snow leopard maintains balance in delicate alpine ecosystems, serving as an indicator of environmental health across Asia’s majestic highlands.`,
    words: [
      { word: "Rosettes", meaning: "Rose-like cluster markings or spots on the coats of leopards and jaguars.", contextSentence: "Dark rosettes break up the snow leopard's outline against jagged granite cliffs." },
      { word: "Counterbalance", meaning: "A weight or force that balances another, providing physical stability.", contextSentence: "The long bushy tail provides an essential counterbalance during perilous leaps." },
      { word: "Scree", meaning: "A steep slope covered with loose rock fragments and gravel.", contextSentence: "Snow leopards stalk silently across loose mountain scree." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "How does the snow leopard's tail assist in its survival in the Himalayas?",
        options: [
          "A) It is used to signal other leopards from miles away.",
          "B) It acts as a physical counterbalance during leaps and a warm face covering during sleep.",
          "C) It stores emergency water for times of winter drought.",
          "D) It frightens prey animals with rattling noises."
        ],
        answer: "B) It acts as a physical counterbalance during leaps and a warm face covering during sleep.",
        explanation: "Paragraph two details that the long tail acts as a counterbalance during leaps across ravines and wraps around the face to block freezing winds."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Mention two physiological adaptations that allow the snow leopard to breathe comfortably in high-altitude mountain air.",
        options: [],
        answer: "Enlarged nasal cavities to warm and humidify freezing air, and broad chests with enlarged lungs and extra red blood cells.",
        explanation: "Paragraph three lists enlarged nasal chambers, broad chests, large lungs, and higher red blood cell counts."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "The wide paws of the snow leopard act like natural snowshoes to distribute weight across soft snow.",
        options: [],
        answer: "True",
        explanation: "Paragraph two explains that broad, furred paws distribute weight like snowshoes and muffle walking sounds."
      }
    ]
  },
  {
    topic: "Health",
    subtopic: "Neuroplasticity",
    title: "Rewiring the Mind: The Revolutionary Science of Neuroplasticity",
    passage: `For over a century, neuroscientists operated under the rigid dogma that the adult human brain was an immutable machine. Conventional wisdom asserted that after a critical developmental window in early childhood, brain circuits became permanently hardwired, and damaged or lost neurons could never be replaced or reorganized. However, groundbreaking discoveries in the late twentieth century dismantled this pessimistic model, ushering in the revolutionary paradigm of neuroplasticity.\n\nNeuroplasticity refers to the brain’s remarkable lifelong ability to reorganize its structural architecture and functional networks in response to experiential learning, environmental stimulation, and traumatic injury. When a person acquires a new skill—such as mastering a musical instrument, learning a second language, or solving complex mathematical problems—neurons repeatedly fire electrical impulses together. This synchrony strengthens synaptic junctions through a process known as long-term potentiation, encapsulated in the famous neurological adage: 'neurons that fire together, wire together.'\n\nEqually profound is cortical remapping in recovery from medical trauma. When stroke patients lose mobility in an arm due to localized damage in the motor cortex, intensive physical therapy can stimulate undamaged neighboring regions of the brain to take over the control of the paralyzed limb. Furthermore, engaging in regular cardiovascular exercise stimulates the secretion of Brain-Derived Neurotrophic Factor (BDNF), a biochemical fertilizer that encourages the growth of new dendritic spines and preserves memory circuits in the hippocampus. The human brain is not a static computer chip, but a living, dynamic tapestry that continually shapes itself to meet the demands of everyday life.`,
    words: [
      { word: "Neuroplasticity", meaning: "The ability of the brain to modify its connections and rewire itself throughout life.", contextSentence: "Neuroplasticity proves that adults can continuously form new neural pathways through practice." },
      { word: "Long-term Potentiation", meaning: "A persistent strengthening of synapses based on recent patterns of activity, forming memories.", contextSentence: "Repetitive practice induces long-term potentiation, reinforcing new motor skills." },
      { word: "Cortical Remapping", meaning: "The process by which the brain reorganizes existing sensory or motor cortical maps.", contextSentence: "Cortical remapping allows undamaged brain sections to adopt functions of injured zones." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What erroneous belief did early 20th-century neuroscience hold about the adult human brain?",
        options: [
          "A) That the brain was completely incapable of processing language.",
          "B) That the adult brain was permanently hardwired and could not rewire or adapt.",
          "C) That electrical impulses had no role in memory formation.",
          "D) That stroke patients could easily regenerate severed spinal cords."
        ],
        answer: "B) That the adult brain was permanently hardwired and could not rewire or adapt.",
        explanation: "Paragraph one points out that conventional dogma viewed the adult brain as an immutable, permanently hardwired organ."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "What is the meaning and significance of the neurological phrase 'neurons that fire together, wire together'?",
        options: [],
        answer: "When neurons fire simultaneously during learning, their synaptic connections strengthen, reinforcing new memories and skills.",
        explanation: "Paragraph two explains that repeated simultaneous firing strengthens synaptic junctions through long-term potentiation."
      },
      {
        id: 3,
        type: "mcq",
        question: "Which biochemical compound, stimulated by cardiovascular exercise, encourages new dendritic growth in the hippocampus?",
        options: ["A) Cortisol", "B) Brain-Derived Neurotrophic Factor (BDNF)", "C) Melanin", "D) Hemoglobin"],
        answer: "B) Brain-Derived Neurotrophic Factor (BDNF)",
        explanation: "Paragraph three notes that cardiovascular activity releases BDNF, acting as a molecular fertilizer for brain cells."
      }
    ]
  },
  {
    topic: "Biography",
    subtopic: "Dr. APJ Abdul Kalam",
    title: "Wings of Fire: The Enduring Journey of Dr. A.P.J. Abdul Kalam",
    passage: `Born into a modest boat-owner’s family in the pilgrimage town of Rameswaram, Tamil Nadu, Avul Pakir Jainulabdeen Abdul Kalam rose through relentless perseverance and intellectual humility to become one of India’s most distinguished aerospace scientists and the beloved eleventh President of India. In his early childhood, Kalam awoke at four in the morning to collect newspapers from railway trains, distributing them across town to help fund his primary education, fueled by an insatiable curiosity about flight and natural sciences.\n\nAfter graduating in aerospace engineering from the Madras Institute of Technology, Kalam joined the Indian Space Research Organisation (ISRO). As Project Director, he spearheaded the indigenous development of the SLV-III (Satellite Launch Vehicle), which in 1980 successfully placed the Rohini satellite into Earth orbit, establishing India among an elite group of spacefaring nations. He subsequently transitioned to the Defence Research and Development Organisation (DRDO), leading the Integrated Guided Missile Development Programme that engineered the indigenous Prithvi and Agni missile systems, earning him the honorific title 'The Missile Man of India.'\n\nDespite his scientific accolades and civilian honors, including the Bharat Ratna, Dr. Kalam remained profoundly humble and accessible throughout his presidency from 2002 to 2007. Known as the 'People’s President,' he transformed Rashtrapati Bhavan into a vibrant center of intellectual engagement, personally answering thousands of letters from school students and inspiring youth to dream ambitiously. His passing in 2015 while delivering a lecture to university students in Shillong was a fitting culmination of a life wholly dedicated to teaching, innovation, and national development.`,
    words: [
      { word: "Indigenous", meaning: "Produced, growing, living, or occurring naturally in a particular region; homegrown.", contextSentence: "India celebrated the launch of its indigenous SLV-III satellite vehicle." },
      { word: "Accolade", meaning: "An award or an expression of praise and admiration.", contextSentence: "Dr. Kalam received numerous scientific accolades, including the Bharat Ratna." },
      { word: "Perseverance", meaning: "Continued effort to achieve something despite difficulties, failure, or opposition.", contextSentence: "Through steadfast perseverance, Kalam overcame poverty to become a celebrated scientist." }
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Which milestone launch in 1980 established India as a recognized spacefaring nation under Dr. Kalam's directorship?",
        options: ["A) Chandrayaan-1", "B) Mangalyaan", "C) SLV-III placing the Rohini satellite into orbit", "D) INSAT-1A"],
        answer: "C) SLV-III placing the Rohini satellite into orbit",
        explanation: "Paragraph two states that Kalam served as Project Director for SLV-III, which placed the Rohini satellite into orbit in 1980."
      },
      {
        id: 2,
        type: "shortAnswer",
        question: "Why was Dr. Kalam popularly remembered as the 'People’s President'?",
        options: [],
        answer: "Because he remained humble, made the presidency accessible, and actively engaged with and inspired thousands of students across the country.",
        explanation: "Paragraph three notes that Kalam opened Rashtrapati Bhavan to the public, answered students' letters, and connected directly with youth."
      },
      {
        id: 3,
        type: "trueFalse",
        question: "Dr. Kalam worked as a newspaper delivery boy in Rameswaram during his childhood to help support his schooling.",
        options: [],
        answer: "True",
        explanation: "Paragraph one describes how young Kalam delivered newspapers collected from trains to help fund his primary education."
      }
    ]
  }
];

// Fallback selector that avoids previous titles
export function selectDiverseFallback(topic: string, excludeTitles: string[] = []): any {
  const lowerExcludes = excludeTitles.map(t => t.toLowerCase());
  
  // Try to find matching topic in diverse bank
  let matches = COMPREVO_DIVERSE_FALLBACKS.filter(item => 
    item.topic.toLowerCase() === (topic || "").toLowerCase()
  );

  if (matches.length === 0) {
    matches = COMPREVO_DIVERSE_FALLBACKS;
  }

  // Filter out any fallback whose title has been seen
  const freshMatches = matches.filter(m => !lowerExcludes.includes(m.title.toLowerCase()));
  const pool = freshMatches.length > 0 ? freshMatches : COMPREVO_DIVERSE_FALLBACKS;

  return pool[Math.floor(Math.random() * pool.length)];
}
