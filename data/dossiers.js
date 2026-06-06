/**
 * Dossier Data Store
 * Centralized source for all research dossiers, equipped with creation and modification tracking timestamps.
 * 
 * Schema:
 * {
 *   id: string (unique identifier)
 *   title: string (display title)
 *   summary: string (abstract text)
 *   keywords: string[] (search index tags)
 *   category: string (grouping category)
 *   dateCreated: string (ISO YYYY-MM-DD creation date)
 *   lastModified: string (ISO YYYY-MM-DD last modified date)
 * }
 */
const DOSSIER_DATA = [
  {
    "id": "15-minute-cities",
    "title": "15-Minute Cities",
    "summary": "Article-style review of the 15-minute city model, covering its planning origins, climate-policy framing, implementation tools, and the surveillance and mobility-control fears attached to local enforcement.",
    "keywords": ["Carlos Moreno", "C40 Cities", "Oxford", "Movement Restriction", "Digital Zoning", "Climate Lockdown", "Urban Planning"],
    "category": "Societal Transformation",
    "dateCreated": "2024-03-15",
    "lastModified": "2026-02-10"
  },
  {
    "id": "oxford-15-minute-city",
    "title": "Oxford 15 Minute Cities",
    "summary": "Detailed review of the Oxford traffic filters trial, analyzing camera enforcement, the digital permit system, resident day-quotas, implementation delays, and the controversy over urban mobility zoning.",
    "keywords": ["Oxford", "Traffic Filters", "ANPR", "Permit System", "Botley Road", "Oxfordshire County Council", "15-Minute Cities", "Digital Zoning"],
    "category": "Societal Transformation",
    "dateCreated": "2026-05-28",
    "lastModified": "2026-05-28"
  },
  {
    "id": "algorithmic-enshittification",
    "title": "Algorithmic Enshittification",
    "summary": "Long-form analysis of how dominant digital platforms degrade through lock-in, ranking control, and two-sided market extraction, linking user frustration to competition and governance failures.",
    "keywords": ["Platform Decay", "Cory Doctorow", "Shadowbanning", "Monetization", "Big Tech", "Digital Gulag"],
    "category": "Societal Transformation",
    "dateCreated": "2024-04-10",
    "lastModified": "2025-11-15"
  },
  {
    "id": "agenda-2030",
    "title": "Agenda 2030 (UN)",
    "summary": "Analysis of the 17 Sustainable Development Goals (SDGs), their massive implementation costs, and their role as a global framework for centralized societal and environmental governance.",
    "keywords": ["Sustainable Development Goals", "SDGs", "Resolution 70/1", "UN Agenda", "2030", "Global Goals"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-04-16",
    "lastModified": "2026-04-16"
  },
  {
    "id": "bill-gates",
    "title": "Bill Gates & Global Engineering",
    "summary": "Analyzing multi-sector influence via the Gates Foundation and Breakthrough Energy, focusing on food systems and geoengineering. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Bill Gates", "Gates Foundation", "Breakthrough Energy", "Fabricated Meat", "Lab Meat", "SCoPEx", "Geoengineering", "Solar Dimming", "Farmland", "GAVI"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-04-21",
    "lastModified": "2026-04-21"
  },
  {
    "id": "bis",
    "title": "Bank for International Settlements (BIS)",
    "summary": "The 'Bank for Central Banks' and its role in coordinating global monetary policy.",
    "keywords": ["Basel", "Central Banking", "Monetary Cooperation", "Global Finance", "Sovereignty", "Apex Bank"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2024-01-05",
    "lastModified": "2025-08-20"
  },
  {
    "id": "bilderberg",
    "title": "Bilderberg Group",
    "summary": "Documentation on the annual private conference of the North American and European elite. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Annual Meeting", "Private Policy", "Elite Conference", "Global Governance", "Secret Meetings", "Political Influence"],
    "category": "Elite Discussion Groups",
    "dateCreated": "2024-02-18",
    "lastModified": "2025-09-12"
  },
  {
    "id": "blackrock-vanguard",
    "title": "BlackRock & Vanguard",
    "summary": "The 'Big Three' investment groups and their influence on global corporate policy.",
    "keywords": ["Larry Fink", "ESG", "Monopoly", "Asset Management", "State Street", "Corporate Governance", "Institutional Shareholders"],
    "category": "Corporate Monopoly & ESG",
    "dateCreated": "2024-03-22",
    "lastModified": "2025-10-05"
  },
  {
    "id": "bohemian-grove",
    "title": "Bohemian Grove",
    "summary": "Archive-based dossier on Bohemian Grove as a private elite retreat, focusing on institutional continuity, ritual culture, and its role in sustaining off-record social networks among influential actors.",
    "keywords": ["California", "Cremation of Care", "Secret Societies", "Elite Retreat", "Occult Rituals", "Owl Shrine", "Power Brokerage"],
    "category": "Secret Societies & Encampments",
    "dateCreated": "2024-05-14",
    "lastModified": "2025-07-22"
  },
  {
    "id": "cbdc",
    "title": "CBDC (Central Bank Digital Currency)",
    "summary": "Analysis of programmable digital currencies and the end of financial privacy. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Digital Euro", "Central Bank", "Programmable Money", "Cashless Society", "ECB", "Federal Reserve", "Financial Control"],
    "category": "Biometric & Social Control",
    "dateCreated": "2024-06-01",
    "lastModified": "2026-01-18"
  },
  {
    "id": "club-of-rome",
    "title": "Club of Rome",
    "summary": "Expanded review of the Club of Rome as a systems-thinking policy network, tracing how its reports on ecological limits shaped later sustainability and technocratic governance debates.",
    "keywords": ["Aurelio Peccei", "Alexander King", "Limits to Growth", "Common Enemy of Humanity", "The First Global Revolution", "Population Control", "1968"],
    "category": "Societal Transformation",
    "dateCreated": "2024-07-10",
    "lastModified": "2025-12-05"
  },
  {
    "id": "cfr",
    "title": "Council on Foreign Relations (CFR)",
    "summary": "US think tank's influence on foreign policy and cabinet appointments. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Foreign Policy", "Think Tank", "The Establishment", "David Rockefeller", "Deep State", "Geopolitical Strategy", "Cabinet Members"],
    "category": "Elite Discussion Groups",
    "dateCreated": "2024-08-15",
    "lastModified": "2025-06-30"
  },
  {
    "id": "digital-id",
    "title": "Digital ID (eIDAS)",
    "summary": "Investigation into the transition towards eIDAS and centralized biometric systems. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["eIDAS", "European Union", "Biometrics", "Digital Wallet", "Identity Framework", "Social Credit", "Surveillance"],
    "category": "Biometric & Social Control",
    "dateCreated": "2024-09-02",
    "lastModified": "2026-02-15"
  },
  {
    "id": "esg-scores",
    "title": "ESG Scores",
    "summary": "Analysis of Environmental, Social, and Governance ratings and their influence on corporate behavior. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["ESG", "Social Credit", "BlackRock", "Larry Fink", "Greenwashing", "Stakeholder Capitalism"],
    "category": "Corporate Monopoly & ESG",
    "dateCreated": "2024-10-20",
    "lastModified": "2025-08-12"
  },
  {
    "id": "event-201",
    "title": "Event 201",
    "summary": "Factual summary of the 2019 pandemic simulation and its key participants. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Johns Hopkins", "Gates Foundation", "Pandemic Exercise", "Coronavirus", "October 2019", "Global Preparedness"],
    "category": "Global Governance Agendas",
    "dateCreated": "2024-11-12",
    "lastModified": "2025-09-25"
  },
  {
    "id": "federal-reserve",
    "title": "Federal Reserve System",
    "summary": "Investigation into the 1913 creation of the US central bank and its role in debt-based monetary policy. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Federal Reserve", "1913", "Inflation", "Fiat Money", "Central Banking", "Fractional Reserve"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2024-12-05",
    "lastModified": "2026-01-05"
  },
  {
    "id": "gulf-of-tonkin",
    "title": "Gulf of Tonkin Incident",
    "summary": "Declassified analysis of the 1964 events used to justify the escalation of the Vietnam War. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["USS Maddox", "LBJ", "False Flag", "Vietnam War", "Declassified 2005", "Naval Skirmish"],
    "category": "Military & False Flags",
    "dateCreated": "2025-01-20",
    "lastModified": "2025-05-18"
  },
  {
    "id": "haarp",
    "title": "HAARP",
    "summary": "Investigation into the High-frequency Active Auroral Research Program and atmospheric science. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Ionosphere", "Radio Waves", "Weather Modification", "Plasma", "Tesla", "Atmospheric Research"],
    "category": "Experimental technology",
    "dateCreated": "2025-02-15",
    "lastModified": "2025-06-20"
  },
  {
    "id": "project-blue-beam",
    "title": "Project Blue Beam",
    "summary": "Analyzing the theory of holographic global deception and psychological management. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Serge Monast", "Holography", "Global Deception", "Psychological Operations", "NASA", "Mind Control"],
    "category": "Experimental technology",
    "dateCreated": "2025-03-10",
    "lastModified": "2025-07-02"
  },
  {
    "id": "id2020",
    "title": "ID2020 Alliance",
    "summary": "Public-private partnership for universal biometric identification from birth. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Microsoft", "Gavi", "Rockefeller Foundation", "Accenture", "Biometric ID", "Digital Health Pass", "Immunity Passport"],
    "category": "Biometric & Social Control",
    "dateCreated": "2025-04-05",
    "lastModified": "2025-08-15"
  },
  {
    "id": "imf-world-bank",
    "title": "IMF & World Bank",
    "summary": "Analyzing the Bretton Woods institutions and their impact on sovereign debt and global development. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["IMF", "World Bank", "Structural Adjustment", "Debt Trap", "Global Finance", "Development"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2025-05-12",
    "lastModified": "2025-09-10"
  },
  {
    "id": "epstein-files",
    "title": "Epstein Files",
    "summary": "3.5M+ pages of unsealed DOJ archives, 2,000+ videos, and 180,000 image files released under the 2026 Transparency Act. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Transparency Act 2026", "DOJ Archive", "Lolita Express", "Little St. James", "Blackmail", "Intelligence Agencies", "Kompromat", "3 Million Pages", "Prince Andrew"],
    "category": "Elite Exposure & Corruption",
    "dateCreated": "2026-01-15",
    "lastModified": "2026-03-20"
  },
  {
    "id": "neuralink",
    "title": "Neuralink & BCIs",
    "summary": "Exploring brain-computer interface technology and its implications for human-AI integration. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Elon Musk", "Brain-Computer Interface", "BCI", "Transhumanism", "Surveillance", "Neurotech"],
    "category": "Biometric & Social Control",
    "dateCreated": "2025-06-25",
    "lastModified": "2025-10-18"
  },
  {
    "id": "operation-gladio",
    "title": "Operation Gladio",
    "summary": "Structured review of European stay-behind network disclosures, distinguishing confirmed clandestine structures from contested allegations about domestic interference.",
    "keywords": ["NATO", "Stay-Behind", "Cold War", "Italy", "Years of Lead", "Psychological Warfare", "Secret Armies"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-07-08",
    "lastModified": "2025-11-22"
  },
  {
    "id": "operation-mockingbird",
    "title": "Operation Mockingbird",
    "summary": "Evidence-led analysis of CIA media influence records, combining Family Jewels disclosures with Church Committee oversight findings and timeline-anchored documentation.",
    "keywords": ["Media Manipulation", "CIA", "Propaganda", "Journalists", "Cold War", "Mainstream Media", "Influence"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-08-12",
    "lastModified": "2025-12-10"
  },
  {
    "id": "uap-disclosure",
    "title": "UAP Disclosure",
    "summary": "Tracking the formal U.S. UAP reporting architecture across ODNI, DoD/AARO, and NASA, with timeline-based analysis of disclosure procedures and data-quality constraints.",
    "keywords": ["UFO", "UAP", "AARO", "Pentagon", "ODNI", "Transparency", "Space"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-09-18",
    "lastModified": "2026-02-28"
  },
  {
    "id": "operation-northwoods",
    "title": "Operation Northwoods",
    "summary": "The 1962 DoD plan for false flag attacks on US soil to justify war with Cuba. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["False Flag", "Lyman Lemnitzer", "JFK", "Department of Defense", "Cuba", "Declassified 1997", "Intelligence Ops"],
    "category": "Military & False Flags",
    "dateCreated": "2025-10-05",
    "lastModified": "2026-01-12"
  },
  {
    "id": "operation-paperclip",
    "title": "Operation Paperclip",
    "summary": "Declassified records of Nazi scientist recruitment to the United States after WWII. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Wernher von Braun", "NASA", "OSS", "Cold War", "Scientific Recruitment", "Post-WWII", "Germany"],
    "category": "Military & False Flags",
    "dateCreated": "2025-11-12",
    "lastModified": "2026-02-20"
  },
  {
    "id": "panama-papers",
    "title": "Panama Papers",
    "summary": "The 2016 leak of millions of documents revealing offshore financial structures used by the global elite. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Mossack Fonseca", "Shell Companies", "Tax Evasion", "Money Laundering", "Offshore", "Global Elite"],
    "category": "Leaks & Exposure",
    "dateCreated": "2025-12-08",
    "lastModified": "2026-03-05"
  },
  {
    "id": "mk-ultra",
    "title": "Project MK-Ultra",
    "summary": "Expanded dossier on MK-Ultra as a Cold War behavioral program, covering its origins, subproject structure, records destruction, and the oversight failures exposed by Senate investigations.",
    "keywords": ["CIA", "Mind Control", "LSD", "Sidney Gottlieb", "Church Committee", "Behavioral Engineering", "Human Experimentation"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-01-05",
    "lastModified": "2025-04-20"
  },
  {
    "id": "mk-delta",
    "title": "Project MK-Delta",
    "summary": "Evidence-constrained reconstruction of MK-DELTA, emphasizing its fragmentary archive, its connection to the wider MK program family, and the documented link to operational use of special materials abroad.",
    "keywords": ["CIA", "Biochemicals", "Covert Ops", "TSD", "Mind Control", "International Ops"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-02-12",
    "lastModified": "2025-06-15"
  },
  {
    "id": "tuskegee",
    "title": "Tuskegee Syphilis Study",
    "summary": "Documentation on the 40-year unethical medical study conducted by the US Public Health Service. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Medical Ethics", "Untreated Syphilis", "Whistleblower", "Public Health", "CDC", "USPHS"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2025-03-22",
    "lastModified": "2025-07-10"
  },
  {
    "id": "social-credit",
    "title": "Social Credit Systems",
    "summary": "Investigation into algorithmic behavioral scoring systems and societal control. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["China", "Trust Score", "Sesame Credit", "Behavioral Engineering", "Dystopian Technology", "Algorithm", "Compliance"],
    "category": "Biometric & Social Control",
    "dateCreated": "2025-04-30",
    "lastModified": "2025-09-18"
  },
  {
    "id": "pegasus-spyware",
    "title": "Pegasus Spyware",
    "summary": "Analysis of the NSO Group's advanced surveillance software and its use against global targets. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["NSO Group", "Spyware", "Surveillance", "Zero-Click", "Cyber-Intelligence", "Mobile Security"],
    "category": "Biometric & Social Control",
    "dateCreated": "2025-05-15",
    "lastModified": "2025-10-25"
  },
  {
    "id": "davos-manifesto",
    "title": "The Davos Manifesto",
    "summary": "The WEF's 2020 ethical guide for companies in the age of Stakeholder Capitalism. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Davos", "WEF", "Stakeholder Capitalism", "Corporate Ethics", "Global Governance"],
    "category": "Global Governance Agendas",
    "dateCreated": "2025-06-08",
    "lastModified": "2025-11-12"
  },
  {
    "id": "the-great-reset",
    "title": "The Great Reset (WEF)",
    "summary": "Analyzing the World Economic Forum's strategic initiative to restructure the global economic and social contract through technological integration and stakeholder capitalism.",
    "keywords": ["Klaus Schwab", "Davos", "World Economic Forum", "WEF", "Stakeholder Capitalism", "ESG", "Fourth Industrial Revolution", "Building Back Better", "Prince Charles"],
    "category": "Global Governance Agendas",
    "dateCreated": "2025-07-12",
    "lastModified": "2025-12-20"
  },
  {
    "id": "wef",
    "title": "World Economic Forum (WEF)",
    "summary": "Institutional overview of the WEF, analyzing its history, its structure as a platform for public-private cooperation, and its role as the central networking hub for global governance.",
    "keywords": ["Davos", "Klaus Schwab", "Public-Private Cooperation", "Global Governance", "Stakeholder Capitalism"],
    "category": "Global Governance Agendas",
    "dateCreated": "2025-08-20",
    "lastModified": "2026-01-15"
  },
  {
    "id": "trilateral-commission",
    "title": "Trilateral Commission",
    "summary": "Strategic discussion group focused on global cooperation between North America, Europe, and Asia. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["David Rockefeller", "Zbigniew Brzezinski", "Technocracy", "Globalism", "Policy Planning"],
    "category": "Elite Discussion Groups",
    "dateCreated": "2025-09-25",
    "lastModified": "2026-02-10"
  },
  {
    "id": "you-will-own-nothing",
    "title": "You Will Own Nothing",
    "summary": "Research into the 'sharing economy' narrative and the predicted end of personal property by 2030. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Sharing Economy", "2030", "Private Property", "Circular Economy", "WEF", "Ida Auken"],
    "category": "Societal Transformation",
    "dateCreated": "2025-10-18",
    "lastModified": "2026-03-02"
  },
  {
    "id": "uss-liberty",
    "title": "USS Liberty Incident",
    "summary": "Documentation on the 1967 attack on the USS Liberty and the subsequent investigation. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["1967", "Six-Day War", "Naval Attack", "Israel", "False Flag", "Mediterranean", "Intelligence"],
    "category": "Military & False Flags",
    "dateCreated": "2025-11-30",
    "lastModified": "2026-01-25"
  },
  {
    "id": "cyber-polygon",
    "title": "Cyber Polygon (WEF)",
    "summary": "Analysis of the WEF cyber pandemic simulations and anticipatory digital architectures. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Cyber Pandemic", "WEF", "BI.ZONE", "Interpol", "Supply Chain", "Digital Reset", "Simulation"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-04-21",
    "lastModified": "2026-04-21"
  },
  {
    "id": "who-pandemic-treaty",
    "title": "WHO Pandemic Agreement (CA+)",
    "summary": "Documenting the creation of the global pandemic treaty, One Health, and the PABS system. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["WHO", "Pandemic Emergency", "CA+", "One Health", "PABS System", "Lockdowns", "Medical Sovereignty", "IHR"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-04-21",
    "lastModified": "2026-04-21"
  },
  {
    "id": "vault-7",
    "title": "Vault 7 (CIA)",
    "summary": "WikiLeaks disclosure of the CIA's domestic surveillance tools, zero-day exploits, and encryption bypass methods. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["WikiLeaks", "Julian Assange", "Year Zero", "CIA", "CCI", "Weeping Angel", "Hacking", "Zero-day", "Surveillance"],
    "category": "Leaks & Exposure",
    "dateCreated": "2026-04-21",
    "lastModified": "2026-04-21"
  },
  {
    "id": "georgia-guidestones",
    "title": "The Georgia Guidestones",
    "summary": "Analysis of the granite monument's guidelines for a post-collapse society and its 2022 destruction. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["R.C. Christian", "Population Control", "500 Million", "2022 Bombing", "Elberton", "New World Order"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-04-19",
    "lastModified": "2026-04-19"
  },
  {
    "id": "jekyll-island",
    "title": "Jekyll Island Meeting (1910)",
    "summary": "The secret 1910 meeting of elite bankers where the plan for the Federal Reserve System was conceived. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Federal Reserve", "1910", "Nelson Aldrich", "Paul Warburg", "Frank Vanderlip", "Secret Meeting", "Central Banking", "Jekyll Island Club"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2026-04-22",
    "lastModified": "2026-04-22"
  },
  {
    "id": "operation-sea-spray",
    "title": "Operation Sea-Spray",
    "summary": "Evidence-first review of the 1950 San Francisco aerosol test, combining Senate oversight disclosures, litigation history, and uncertainty-aware health impact assessment.",
    "keywords": ["San Francisco", "Biological Warfare", "1950", "Serratia marcescens", "Declassified", "US Navy"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2026-04-19",
    "lastModified": "2026-04-19"
  },
  {
    "id": "my-carbon-wef",
    "title": "WEF: 'My Carbon' & COVID Test",
    "summary": "Analyzing the WEF proposal for individual carbon tracking and the perspective on pandemic social compliance. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["My Carbon", "WEF", "Kunal Kumar", "Social Responsibility", "Carbon Footprint", "Compliance", "COVID Test"],
    "category": "Global Governance Agendas",
    "dateCreated": "2025-12-15",
    "lastModified": "2026-02-18"
  },
  {
    "id": "iea-10-point-plan",
    "title": "IEA: 10-Point Plan to Cut Oil Use",
    "summary": "Emergency measures proposed by the IEA to manage energy crises through societal behavioral changes. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["IEA", "Oil Demand", "10-Point Plan", "Demand Restraint", "Energy Crisis", "Car-Free Sundays"],
    "category": "Societal Transformation",
    "dateCreated": "2025-12-20",
    "lastModified": "2026-02-22"
  },
  {
    "id": "local-climate-mandates",
    "title": "Local Climate Mandates & Enforcement",
    "summary": "Tracking municipal restrictions on energy use, mobility, and private consumption across Europe. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["ULEZ", "London", "Brussels", "LEZ", "Zero-Emission", "EnSikuMaV", "Germany", "Climate Mandate"],
    "category": "Societal Transformation",
    "dateCreated": "2026-01-08",
    "lastModified": "2026-03-10"
  },
  {
    "id": "google-dietary-bias",
    "title": "Google Search & Institutional Bias: Seed Oils vs. Red Meat",
    "summary": "Investigating how search engines and AI Overviews promote industrial seed oils as healthy while warning against red meat, contrasting mainstream guidelines with the controversial Tufts Food Compass rankings.",
    "keywords": ["Google Search", "AI Overview", "Seed Oils", "Red Meat", "Saturated Fat", "Tufts Food Compass", "Lucky Charms", "Dietary Guidelines", "Linoleic Acid"],
    "category": "Societal Transformation",
    "dateCreated": "2026-05-27",
    "lastModified": "2026-05-27"
  },
  {
    "id": "alpha-gal-syndrome",
    "title": "Alpha-gal Syndrome: The Tick-Induced Meat Allergy",
    "summary": "Exploring Alpha-gal Syndrome (AGS), a tick-induced mammalian red meat allergy transmitted by the lone star tick, and analyzing its implications as a biological vector of dietary restriction.",
    "keywords": ["Lone Star Tick", "Alpha-gal Syndrome", "Red Meat Allergy", "Amblyomma americanum", "CDC", "Biological Vector", "Dietary Restriction", "Bill Gates", "Lone Star", "Tick"],
    "category": "Societal Transformation",
    "dateCreated": "2026-05-27",
    "lastModified": "2026-05-27"
  },
  {
    "id": "anti-tech-extremism",
    "title": "Anti-Tech Extremism: Government Surveillance of Anti-AI Activists",
    "summary": "Analyzing the FBI and DHS domestic threat classification 'anti-tech violent extremism' used to monitor anti-AI activists and data center protesters, as exposed by a May 2026 WIRED investigation.",
    "keywords": ["FBI", "DHS", "Anti-Tech Extremism", "AI Protests", "Data Centers", "Surveillance", "Civil Liberties", "Daniel Boguslaw", "Fusion Centers"],
    "category": "Intelligence & PsyOps",
    "dateCreated": "2026-05-27",
    "lastModified": "2026-05-27"
  },
  {
    "id": "un-pact-for-the-future",
    "title": "UN Pact for the Future",
    "summary": "Documenting the September 2024 United Nations resolution establishing the Global Digital Compact and the emergency platform framework for global crises.",
    "keywords": ["UN", "United Nations", "General Assembly", "Pact for the Future", "Global Digital Compact", "Emergency Platform", "Governance", "Global Summit"],
    "category": "Global Governance Agendas",
    "dateCreated": "2024-09-24",
    "lastModified": "2025-01-15"
  },
  {
    "id": "eu-ai-act",
    "title": "EU AI Act",
    "summary": "An analysis of the European Union's 2024 Artificial Intelligence Act, tracing its phased implementation, prohibited systems, and biometric profiling bans.",
    "keywords": ["AI Act", "European Union", "EU", "Artificial Intelligence", "Biometric Categorization", "Social Scoring", "Regulation", "Compliance"],
    "category": "Biometric & Social Control",
    "dateCreated": "2024-05-15",
    "lastModified": "2024-12-10"
  },
  {
    "id": "crowdstrike-outage",
    "title": "2024 CrowdStrike IT Outage",
    "summary": "Investigating the July 19, 2024 global IT crash triggered by a faulty kernel-level CrowdStrike update, demonstrating infrastructure vulnerability and supply chain dependency.",
    "keywords": ["CrowdStrike", "Outage", "Falcon Sensor", "Microsoft", "Windows", "Blue Screen", "BSOD", "Single Point of Failure", "Cyber Polygon"],
    "category": "Societal Transformation",
    "dateCreated": "2024-07-20",
    "lastModified": "2024-08-05"
  },
  {
    "id": "project-agora",
    "title": "Project Agorá (BIS Tokenization)",
    "summary": "Reviewing the BIS-led public-private initiative launched in April 2024 to tokenize cross-border wholesale banking and CBDC systems.",
    "keywords": ["Project Agora", "Agora", "BIS", "Bank for International Settlements", "Tokenization", "CBDC", "Unified Ledger", "Commercial Banks"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2024-04-15",
    "lastModified": "2024-09-10"
  },
  {
    "id": "us-ai-executive-order",
    "title": "US AI Executive Order 14110",
    "summary": "Analyzing the White House Executive Order 14110 signed in late 2023 and enforced through 2024-2025, coordinating AI safety standards and synthetic content watermarking.",
    "keywords": ["Executive Order 14110", "AI Executive Order", "Biden", "Defense Production Act", "NIST", "Watermarking", "Provenance", "Synthetic Media"],
    "category": "Biometric & Social Control",
    "dateCreated": "2023-11-01",
    "lastModified": "2024-06-15"
  },
  {
    "id": "fisa-702-reauthorization",
    "title": "FISA Section 702 Reauthorization",
    "summary": "Documenting the legislative debate, reauthorization, and expansion of warrantless surveillance powers under Section 702 in April 2024.",
    "keywords": ["FISA", "Section 702", "Surveillance", "Warrantless", "NSA", "Intelligence Agencies", "Privacy", "Reauthorization"],
    "category": "Biometric & Social Control",
    "dateCreated": "2024-04-25",
    "lastModified": "2024-05-10"
  },
  {
    "id": "wef-global-risks-2026",
    "title": "WEF Global Risks (2024-2026)",
    "summary": "Tracing the World Economic Forum's risk analyses from 2024 to 2026, focusing on AI-driven disinformation, cyber warfare, and critical infrastructure resilience.",
    "keywords": ["WEF", "World Economic Forum", "Global Risks", "Davos", "Disinformation", "Cyber Pandemic", "Rebuilding Trust"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-01-10",
    "lastModified": "2026-02-12"
  },
  {
    "id": "worldcoin-world-id",
    "title": "Worldcoin & World ID",
    "summary": "Investigating Sam Altman's biometric proof-of-personhood project, its orb-based iris scanning network, and privacy investigations globally.",
    "keywords": ["Worldcoin", "World ID", "Sam Altman", "Orb", "Iris Scan", "Biometrics", "Proof of Personhood", "Privacy Commissioner"],
    "category": "Biometric & Social Control",
    "dateCreated": "2023-07-25",
    "lastModified": "2024-03-18"
  },
  {
    "id": "project-mariana",
    "title": "Project Mariana (BIS AMM)",
    "summary": "Exploring the 2023-2024 BIS experiment testing Automated Market Makers (AMMs) in foreign exchange markets using wholesale CBDCs.",
    "keywords": ["Project Mariana", "Mariana", "BIS", "AMM", "Automated Market Maker", "CBDC", "DeFi", "Central Banking"],
    "category": "Monetary & Financial Apex",
    "dateCreated": "2023-09-28",
    "lastModified": "2024-02-15"
  },
  {
    "id": "carbon-cbam",
    "title": "Carbon Border Adjustment Mechanism (CBAM)",
    "summary": "Analyzing the implementation of the European Union's CBAM carbon tariff beginning in 2024 and its impact on global trade and emissions reporting.",
    "keywords": ["CBAM", "Carbon Border Adjustment", "Carbon Tariff", "EU", "Green Deal", "Emissions Tracking", "Global Trade"],
    "category": "Societal Transformation",
    "dateCreated": "2023-10-05",
    "lastModified": "2024-04-12"
  },
  {
    "id": "kalergi-plan",
    "title": "Kalergi Plan Conspiracy Theory",
    "summary": "Historical analysis of the 'Kalergi Plan' conspiracy theory, tracing its origins to neo-Nazi Gerd Honsik's misrepresentation of Richard von Coudenhove-Kalergi's 1925 book Praktischer Idealismus.",
    "keywords": ["Richard von Coudenhove-Kalergi", "Paneuropean Union", "Praktischer Idealismus", "Gerd Honsik", "Great Replacement", "White Genocide", "Conspiracy Theory", "Adios Europa"],
    "category": "Global Governance Agendas",
    "dateCreated": "2026-06-03",
    "lastModified": "2026-06-03"
  }
];

