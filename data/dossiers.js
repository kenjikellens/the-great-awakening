/**
 * Dossier Data Store
 * Centralized source for all research dossiers.
 */
const DOSSIER_DATA = [
  {
    "id": "15-minute-cities",
    "title": "15-Minute Cities",
    "summary": "Analyzing urban development policies and their impact on movement freedom.",
    "keywords": ["Carlos Moreno", "C40 Cities", "Oxford", "Movement Restriction", "Digital Zoning", "Climate Lockdown", "Urban Planning"],
    "category": "Societal Transformation"
  },
  {
    "id": "agenda-2030",
    "title": "Agenda 2030 (UN)",
    "summary": "Analysis of the 17 Sustainable Development Goals and their implementation within national governments.",
    "keywords": ["Sustainable Development Goals", "SDGs", "Resolution 70/1", "UN Agenda", "2030", "Global Goals"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "bis",
    "title": "Bank for International Settlements (BIS)",
    "summary": "The \"Bank for Central Banks\" and its role in coordinating global monetary policy.",
    "keywords": ["Basel", "Central Banking", "Monetary Cooperation", "Global Finance", "Sovereignty", "Apex Bank"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "bilderberg",
    "title": "Bilderberg Group",
    "summary": "Documentation on the annual private conference of the North American and European elite.",
    "keywords": ["Annual Meeting", "Private Policy", "Elite Conference", "Global Governance", "Secret Meetings", "Political Influence"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "blackrock-vanguard",
    "title": "BlackRock & Vanguard",
    "summary": "The \"Big Three\" investment groups and their influence on global corporate policy.",
    "keywords": ["Larry Fink", "ESG", "Monopoly", "Asset Management", "State Street", "Corporate Governance", "Institutional Shareholders"],
    "category": "Corporate Monopoly & ESG"
  },
  {
    "id": "bohemian-grove",
    "title": "Bohemian Grove",
    "summary": "Private encampment for world leaders and its unofficial policy drafting rituals.",
    "keywords": ["California", "Cremation of Care", "Secret Societies", "Elite Retreat", "Occult Rituals", "Owl Shrine", "Power Brokerage"],
    "category": "Secret Societies & Encampments"
  },
  {
    "id": "cbdc",
    "title": "CBDC (Central Bank Digital Currency)",
    "summary": "Analysis of programmable digital currencies and the end of financial privacy.",
    "keywords": ["Digital Euro", "Central Bank", "Programmable Money", "Cashless Society", "ECB", "Federal Reserve", "Financial Control"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "club-of-rome",
    "title": "Club of Rome",
    "summary": "Analyzing the \"Limits to Growth\" and the foundations of global ecological governance.",
    "keywords": ["Aurelio Peccei", "Alexander King", "Limits to Growth", "Common Enemy of Humanity", "The First Global Revolution", "Population Control", "1968"],
    "category": "Societal Transformation"
  },
  {
    "id": "cfr",
    "title": "Council on Foreign Relations (CFR)",
    "summary": "US think tank's influence on foreign policy and cabinet appointments.",
    "keywords": ["Foreign Policy", "Think Tank", "The Establishment", "David Rockefeller", "Deep State", "Geopolitical Strategy", "Cabinet Members"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "digital-id",
    "title": "Digital ID (eIDAS)",
    "summary": "Investigation into the transition towards eIDAS and centralized biometric systems.",
    "keywords": ["eIDAS", "European Union", "Biometrics", "Digital Wallet", "Identity Framework", "Social Credit", "Surveillance"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "esg-scores",
    "title": "ESG Scores",
    "summary": "Analysis of Environmental, Social, and Governance ratings and their influence on corporate behavior.",
    "keywords": ["ESG", "Social Credit", "BlackRock", "Larry Fink", "Greenwashing", "Stakeholder Capitalism"],
    "category": "Corporate Monopoly & ESG"
  },
  {
    "id": "event-201",
    "title": "Event 201",
    "summary": "Factual summary of the 2019 pandemic simulation and its key participants.",
    "keywords": ["Johns Hopkins", "Gates Foundation", "Pandemic Exercise", "Coronavirus", "October 2019", "Global Preparedness"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "federal-reserve",
    "title": "Federal Reserve System",
    "summary": "Investigation into the 1913 creation of the US central bank and its role in debt-based monetary policy.",
    "keywords": ["Federal Reserve", "1913", "Inflation", "Fiat Money", "Central Banking", "Fractional Reserve"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "gulf-of-tonkin",
    "title": "Gulf of Tonkin Incident",
    "summary": "Declassified analysis of the 1964 events used to justify the escalation of the Vietnam War.",
    "keywords": ["USS Maddox", "LBJ", "False Flag", "Vietnam War", "Declassified 2005", "Naval Skirmish"],
    "category": "Military & False Flags"
  },
  {
    "id": "haarp",
    "title": "HAARP",
    "summary": "Investigation into the High-frequency Active Auroral Research Program and atmospheric science.",
    "keywords": ["Ionosphere", "Radio Waves", "Weather Modification", "Plasma", "Tesla", "Atmospheric Research"],
    "category": "Experimental technology"
  },
  {
    "id": "id2020",
    "title": "ID2020 Alliance",
    "summary": "Public-private partnership for universal biometric identification from birth.",
    "keywords": ["Microsoft", "Gavi", "Rockefeller Foundation", "Accenture", "Biometric ID", "Digital Health Pass", "Immunity Passport"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "imf-world-bank",
    "title": "IMF & World Bank",
    "summary": "Analyzing the Bretton Woods institutions and their impact on sovereign debt and global development.",
    "keywords": ["IMF", "World Bank", "Structural Adjustment", "Debt Trap", "Global Finance", "Development"],
    "category": "Monetary & Financial Apex"
  },
  {
    "id": "epstein-files",
    "title": "Jeffrey Epstein Files",
    "summary": "Jeffrey Epstein's network, unsealed court documents, and flight logs analysis.",
    "keywords": ["Ghislaine Maxwell", "Lolita Express", "Little St. James", "Blackmail", "Intelligence Agencies", "Kompromat", "2024 Unsealed", "Prince Andrew"],
    "category": "Leaks & Exposure"
  },
  {
    "id": "neuralink",
    "title": "Neuralink & BCIs",
    "summary": "Exploring brain-computer interface technology and its implications for human-AI integration.",
    "keywords": ["Elon Musk", "Brain-Computer Interface", "BCI", "Transhumanism", "Surveillance", "Neurotech"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "operation-gladio",
    "title": "Operation Gladio",
    "summary": "NATO stay-behind clandestine armies and domestic political violence in Europe.",
    "keywords": ["NATO", "Stay-Behind", "Cold War", "Italy", "Years of Lead", "Psychological Warfare", "Secret Armies"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "operation-mockingbird",
    "title": "Operation Mockingbird",
    "summary": "CIA campaign to influence international and domestic media outlets.",
    "keywords": ["Media Manipulation", "CIA", "Propaganda", "Journalists", "Cold War", "Mainstream Media", "Influence"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "operation-northwoods",
    "title": "Operation Northwoods",
    "summary": "The 1962 DoD plan for false flag attacks on US soil to justify war with Cuba.",
    "keywords": ["False Flag", "Lyman Lemnitzer", "JFK", "Department of Defense", "Cuba", "Declassified 1997", "Intelligence Ops"],
    "category": "Military & False Flags"
  },
  {
    "id": "operation-paperclip",
    "title": "Operation Paperclip",
    "summary": "Declassified records of Nazi scientist recruitment to the United States after WWII.",
    "keywords": ["Wernher von Braun", "NASA", "OSS", "Cold War", "Scientific Recruitment", "Post-WWII", "Germany"],
    "category": "Military & False Flags"
  },
  {
    "id": "panama-papers",
    "title": "Panama Papers",
    "summary": "The 2016 leak of millions of documents revealing offshore financial structures used by the global elite.",
    "keywords": ["Mossack Fonseca", "Shell Companies", "Tax Evasion", "Money Laundering", "Offshore", "Global Elite"],
    "category": "Leaks & Exposure"
  },
  {
    "id": "mk-ultra",
    "title": "Project MK-Ultra",
    "summary": "The CIA's declassified mind control and behavior modification program records.",
    "keywords": ["CIA", "Mind Control", "LSD", "Sidney Gottlieb", "Church Committee", "Behavioral Engineering", "Human Experimentation"],
    "category": "Intelligence & PsyOps"
  },
  {
    "id": "social-credit",
    "title": "Social Credit Systems",
    "summary": "Investigation into algorithmic behavioral scoring systems and societal control.",
    "keywords": ["China", "Trust Score", "Sesame Credit", "Behavioral Engineering", "Dystopian Technology", "Algorithm", "Compliance"],
    "category": "Biometric & Social Control"
  },
  {
    "id": "davos-manifesto",
    "title": "The Davos Manifesto",
    "summary": "The WEF's 2020 ethical guide for companies in the age of Stakeholder Capitalism.",
    "keywords": ["Davos", "WEF", "Stakeholder Capitalism", "Corporate Ethics", "Global Governance"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "the-great-reset",
    "title": "The Great Reset (WEF)",
    "summary": "Mapping lobby influences and government links through international think tanks and the World Economic Forum.",
    "keywords": ["Klaus Schwab", "Davos", "World Economic Forum", "WEF", "Stakeholder Capitalism", "ESG", "Fourth Industrial Revolution", "Building Back Better", "Prince Charles"],
    "category": "Global Governance Agendas"
  },
  {
    "id": "trilateral-commission",
    "title": "Trilateral Commission",
    "summary": "Strategic discussion group focused on global cooperation between North America, Europe, and Asia.",
    "keywords": ["David Rockefeller", "Zbigniew Brzezinski", "Technocracy", "Globalism", "Policy Planning"],
    "category": "Elite Discussion Groups"
  },
  {
    "id": "you-will-own-nothing",
    "title": "You Will Own Nothing",
    "summary": "Research into the 'sharing economy' narrative and the predicted end of personal property by 2030.",
    "keywords": ["Sharing Economy", "2030", "Private Property", "Circular Economy", "WEF", "Ida Auken"],
    "category": "Societal Transformation"
  }
];
