/**
 * Dossier Data Store
 * Centralized source for all research dossiers.
 */
const DOSSIER_DATA = [
  {
    "id": "15-minute-cities",
    "title": "15-Minute Cities",
    "summary": "Analyzing urban development policies and their impact on movement freedom. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Carlos Moreno", "C40 Cities", "Oxford", "Movement Restriction", "Digital Zoning", "Climate Lockdown", "Urban Planning"],
    "category": "Societal Transformation"
  },
  {
    "id": "algorithmic-enshittification",
    "title": "Algorithmic Enshittification",
    "summary": "Analyzing the lifecycle of platform decay and its role in information control. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Platform Decay", "Cory Doctorow", "Shadowbanning", "Monetization", "Big Tech", "Digital Gulag"],
    "category": "Societal Transformation"
  },
  {
    "id": "agenda-2030",
    "title": "Agenda 2030 (UN)",
    "summary": "Analysis of the 17 Sustainable Development Goals and their implementation within national governments. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Sustainable Development Goals", "SDGs", "Resolution 70/1", "UN Agenda", "2030", "Global Goals"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "bill-gates",
    "title": "Bill Gates & Global Engineering",
    "summary": "Analyzing multi-sector influence via the Gates Foundation and Breakthrough Energy, focusing on food systems and geoengineering. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Bill Gates", "Gates Foundation", "Breakthrough Energy", "Fabricated Meat", "Lab Meat", "SCoPEx", "Geoengineering", "Solar Dimming", "Farmland", "GAVI"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "bis",
    "title": "Bank for International Settlements (BIS)",
    "summary": "The \ Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison."Bank for Central Banks\" and its role in coordinating global monetary policy.",
    "keywords": ["Basel", "Central Banking", "Monetary Cooperation", "Global Finance", "Sovereignty", "Apex Bank"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "bilderberg",
    "title": "Bilderberg Group",
    "summary": "Documentation on the annual private conference of the North American and European elite. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Annual Meeting", "Private Policy", "Elite Conference", "Global Governance", "Secret Meetings", "Political Influence"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "blackrock-vanguard",
    "title": "BlackRock & Vanguard",
    "summary": "The \ Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison."Big Three\" investment groups and their influence on global corporate policy.",
    "keywords": ["Larry Fink", "ESG", "Monopoly", "Asset Management", "State Street", "Corporate Governance", "Institutional Shareholders"],
    "category": "Corporate Monopoly & ESG"
  },
  {
    "id": "bohemian-grove",
    "title": "Bohemian Grove",
    "summary": "Private encampment for world leaders and its unofficial policy drafting rituals. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["California", "Cremation of Care", "Secret Societies", "Elite Retreat", "Occult Rituals", "Owl Shrine", "Power Brokerage"],
    "category": "Secret Societies & Encampments"
  },
  {
    "id": "cbdc",
    "title": "CBDC (Central Bank Digital Currency)",
    "summary": "Analysis of programmable digital currencies and the end of financial privacy. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Digital Euro", "Central Bank", "Programmable Money", "Cashless Society", "ECB", "Federal Reserve", "Financial Control"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "club-of-rome",
    "title": "Club of Rome",
    "summary": "Analyzing the \ Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison."Limits to Growth\" and the foundations of global ecological governance.",
    "keywords": ["Aurelio Peccei", "Alexander King", "Limits to Growth", "Common Enemy of Humanity", "The First Global Revolution", "Population Control", "1968"],
    "category": "Societal Transformation"
  },
  {
    "id": "cfr",
    "title": "Council on Foreign Relations (CFR)",
    "summary": "US think tank's influence on foreign policy and cabinet appointments. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Foreign Policy", "Think Tank", "The Establishment", "David Rockefeller", "Deep State", "Geopolitical Strategy", "Cabinet Members"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "digital-id",
    "title": "Digital ID (eIDAS)",
    "summary": "Investigation into the transition towards eIDAS and centralized biometric systems. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["eIDAS", "European Union", "Biometrics", "Digital Wallet", "Identity Framework", "Social Credit", "Surveillance"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "esg-scores",
    "title": "ESG Scores",
    "summary": "Analysis of Environmental, Social, and Governance ratings and their influence on corporate behavior. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["ESG", "Social Credit", "BlackRock", "Larry Fink", "Greenwashing", "Stakeholder Capitalism"],
    "category": "Corporate Monopoly & ESG"
  },
  {
    "id": "event-201",
    "title": "Event 201",
    "summary": "Factual summary of the 2019 pandemic simulation and its key participants. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Johns Hopkins", "Gates Foundation", "Pandemic Exercise", "Coronavirus", "October 2019", "Global Preparedness"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "federal-reserve",
    "title": "Federal Reserve System",
    "summary": "Investigation into the 1913 creation of the US central bank and its role in debt-based monetary policy. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Federal Reserve", "1913", "Inflation", "Fiat Money", "Central Banking", "Fractional Reserve"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "gulf-of-tonkin",
    "title": "Gulf of Tonkin Incident",
    "summary": "Declassified analysis of the 1964 events used to justify the escalation of the Vietnam War. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["USS Maddox", "LBJ", "False Flag", "Vietnam War", "Declassified 2005", "Naval Skirmish"],
    "category": "Military & False Flags"
  },
  {
    "id": "haarp",
    "title": "HAARP",
    "summary": "Investigation into the High-frequency Active Auroral Research Program and atmospheric science. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Ionosphere", "Radio Waves", "Weather Modification", "Plasma", "Tesla", "Atmospheric Research"],
    "category": "Experimental technology"
  },
  {
    "id": "project-blue-beam",
    "title": "Project Blue Beam",
    "summary": "Analyzing the theory of holographic global deception and psychological management. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Serge Monast", "Holography", "Global Deception", "Psychological Operations", "NASA", "Mind Control"],
    "category": "Experimental technology"
  },
  {
    "id": "id2020",
    "title": "ID2020 Alliance",
    "summary": "Public-private partnership for universal biometric identification from birth. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Microsoft", "Gavi", "Rockefeller Foundation", "Accenture", "Biometric ID", "Digital Health Pass", "Immunity Passport"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "imf-world-bank",
    "title": "IMF & World Bank",
    "summary": "Analyzing the Bretton Woods institutions and their impact on sovereign debt and global development. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["IMF", "World Bank", "Structural Adjustment", "Debt Trap", "Global Finance", "Development"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "epstein-files",
    "title": "Epstein Files",
    "summary": "3.5M+ pages of unsealed DOJ archives, 2,000+ videos, and 180,000 image files released under the 2026 Transparency Act. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Transparency Act 2026", "DOJ Archive", "Lolita Express", "Little St. James", "Blackmail", "Intelligence Agencies", "Kompromat", "3 Million Pages", "Prince Andrew"],
    "category": "Elite Exposure & Corruption"
  },
  {
    "id": "neuralink",
    "title": "Neuralink & BCIs",
    "summary": "Exploring brain-computer interface technology and its implications for human-AI integration. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Elon Musk", "Brain-Computer Interface", "BCI", "Transhumanism", "Surveillance", "Neurotech"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "operation-gladio",
    "title": "Operation Gladio",
    "summary": "NATO stay-behind clandestine armies and domestic political violence in Europe. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["NATO", "Stay-Behind", "Cold War", "Italy", "Years of Lead", "Psychological Warfare", "Secret Armies"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "operation-mockingbird",
    "title": "Operation Mockingbird",
    "summary": "CIA campaign to influence international and domestic media outlets. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Media Manipulation", "CIA", "Propaganda", "Journalists", "Cold War", "Mainstream Media", "Influence"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "uap-disclosure",
    "title": "UAP Disclosure",
    "summary": "Tracking the shift in official government policy and reporting regarding Unidentified Anomalous Phenomena. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["UFO", "UAP", "AARO", "Pentagon", "ODNI", "Transparency", "Space"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "operation-northwoods",
    "title": "Operation Northwoods",
    "summary": "The 1962 DoD plan for false flag attacks on US soil to justify war with Cuba. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["False Flag", "Lyman Lemnitzer", "JFK", "Department of Defense", "Cuba", "Declassified 1997", "Intelligence Ops"],
    "category": "Military & False Flags"
  },
  {
    "id": "operation-paperclip",
    "title": "Operation Paperclip",
    "summary": "Declassified records of Nazi scientist recruitment to the United States after WWII. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Wernher von Braun", "NASA", "OSS", "Cold War", "Scientific Recruitment", "Post-WWII", "Germany"],
    "category": "Military & False Flags"
  },
  {
    "id": "panama-papers",
    "title": "Panama Papers",
    "summary": "The 2016 leak of millions of documents revealing offshore financial structures used by the global elite. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Mossack Fonseca", "Shell Companies", "Tax Evasion", "Money Laundering", "Offshore", "Global Elite"],
    "category": "Leaks & Exposure"
  },
  {
    "id": "mk-ultra",
    "title": "Project MK-Ultra",
    "summary": "The CIA's declassified mind control and behavior modification program records. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["CIA", "Mind Control", "LSD", "Sidney Gottlieb", "Church Committee", "Behavioral Engineering", "Human Experimentation"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "mk-delta",
    "title": "Project MK-Delta",
    "summary": "Successor to MK-Ultra focusing on the international application of biochemical covert operations. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["CIA", "Biochemicals", "Covert Ops", "TSD", "Mind Control", "International Ops"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "tuskegee",
    "title": "Tuskegee Syphilis Study",
    "summary": "Documentation on the 40-year unethical medical study conducted by the US Public Health Service. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Medical Ethics", "Untreated Syphilis", "Whistleblower", "Public Health", "CDC", "USPHS"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "social-credit",
    "title": "Social Credit Systems",
    "summary": "Investigation into algorithmic behavioral scoring systems and societal control. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["China", "Trust Score", "Sesame Credit", "Behavioral Engineering", "Dystopian Technology", "Algorithm", "Compliance"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "pegasus-spyware",
    "title": "Pegasus Spyware",
    "summary": "Analysis of the NSO Group's advanced surveillance software and its use against global targets. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["NSO Group", "Spyware", "Surveillance", "Zero-Click", "Cyber-Intelligence", "Mobile Security"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "davos-manifesto",
    "title": "The Davos Manifesto",
    "summary": "The WEF's 2020 ethical guide for companies in the age of Stakeholder Capitalism. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Davos", "WEF", "Stakeholder Capitalism", "Corporate Ethics", "Global Governance"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "the-great-reset",
    "title": "The Great Reset (WEF)",
    "summary": "Mapping lobby influences and government links through international think tanks and the World Economic Forum. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Klaus Schwab", "Davos", "World Economic Forum", "WEF", "Stakeholder Capitalism", "ESG", "Fourth Industrial Revolution", "Building Back Better", "Prince Charles"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "wef",
    "title": "World Economic Forum (WEF)",
    "summary": "Institutional overview of the organization, its leadership, and its role in global policy coordination. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Davos", "Klaus Schwab", "Public-Private Cooperation", "Global Governance", "Stakeholder Capitalism"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "trilateral-commission",
    "title": "Trilateral Commission",
    "summary": "Strategic discussion group focused on global cooperation between North America, Europe, and Asia. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["David Rockefeller", "Zbigniew Brzezinski", "Technocracy", "Globalism", "Policy Planning"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "you-will-own-nothing",
    "title": "You Will Own Nothing",
    "summary": "Research into the 'sharing economy' narrative and the predicted end of personal property by 2030. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Sharing Economy", "2030", "Private Property", "Circular Economy", "WEF", "Ida Auken"],
    "category": "Societal Transformation"
  },
  {
    "id": "uss-liberty",
    "title": "USS Liberty Incident",
    "summary": "Documentation on the 1967 attack on the USS Liberty and the subsequent investigation. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["1967", "Six-Day War", "Naval Attack", "Israel", "False Flag", "Mediterranean", "Intelligence"],
    "category": "Military & False Flags"
  },
  {
    "id": "cyber-polygon",
    "title": "Cyber Polygon (WEF)",
    "summary": "Analysis of the WEF cyber pandemic simulations and anticipatory digital architectures. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Cyber Pandemic", "WEF", "BI.ZONE", "Interpol", "Supply Chain", "Digital Reset", "Simulation"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "who-pandemic-treaty",
    "title": "WHO Pandemic Agreement (CA+)",
    "summary": "Documenting the creation of the global pandemic treaty, One Health, and the PABS system. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["WHO", "Pandemic Emergency", "CA+", "One Health", "PABS System", "Lockdowns", "Medical Sovereignty", "IHR"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "vault-7",
    "title": "Vault 7 (CIA)",
    "summary": "WikiLeaks disclosure of the CIA's domestic surveillance tools, zero-day exploits, and encryption bypass methods. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["WikiLeaks", "Julian Assange", "Year Zero", "CIA", "CCI", "Weeping Angel", "Hacking", "Zero-day", "Surveillance"],
    "category": "Leaks & Exposure"
  },
  {
    "id": "georgia-guidestones",
    "title": "The Georgia Guidestones",
    "summary": "Analysis of the granite monument's guidelines for a post-collapse society and its 2022 destruction. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["R.C. Christian", "Population Control", "500 Million", "2022 Bombing", "Elberton", "New World Order"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "jekyll-island",
    "title": "Jekyll Island Meeting (1910)",
    "summary": "The secret 1910 meeting of elite bankers where the plan for the Federal Reserve System was conceived. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["Federal Reserve", "1910", "Nelson Aldrich", "Paul Warburg", "Frank Vanderlip", "Secret Meeting", "Central Banking", "Jekyll Island Club"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "operation-sea-spray",
    "title": "Operation Sea-Spray",
    "summary": "Declassified 1950 US Navy experiment involving the biological spraying of San Francisco. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["San Francisco", "Biological Warfare", "1950", "Serratia marcescens", "Declassified", "US Navy"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "my-carbon-wef",
    "title": "WEF: 'My Carbon' & COVID Test",
    "summary": "Analyzing the WEF proposal for individual carbon tracking and the perspective on pandemic social compliance. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["My Carbon", "WEF", "Kunal Kumar", "Social Responsibility", "Carbon Footprint", "Compliance", "COVID Test"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "iea-10-point-plan",
    "title": "IEA: 10-Point Plan to Cut Oil Use",
    "summary": "Emergency measures proposed by the IEA to manage energy crises through societal behavioral changes. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["IEA", "Oil Demand", "10-Point Plan", "Demand Restraint", "Energy Crisis", "Car-Free Sundays"],
    "category": "Societal Transformation"
  },
  {
    "id": "local-climate-mandates",
    "title": "Local Climate Mandates & Enforcement",
    "summary": "Tracking municipal restrictions on energy use, mobility, and private consumption across Europe. Includes institutional context, key timeline checkpoints, and source-traceable documentation nodes for cross-dossier comparison.",
    "keywords": ["ULEZ", "London", "Brussels", "LEZ", "Zero-Emission", "EnSikuMaV", "Germany", "Climate Mandate"],
    "category": "Societal Transformation"
  }
];
