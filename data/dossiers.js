/**
 * Dossier Data Store
 * Centralized source for all research dossiers.
 */
const DOSSIER_DATA = [
  {
    "id": "agenda-2030",
    "title": "Agenda 2030 (UN)",
    "summary": "Analysis of the 17 Sustainable Development Goals and their implementation within national governments.",
    "keywords": ["Sustainable Development Goals", "SDGs", "Resolution 70/1", "UN Agenda", "2030", "Global Goals"],
    "category": "Global Agendas & Transnational Organizations"
  },
  {
    "id": "the-great-reset",
    "title": "The Great Reset (WEF)",
    "summary": "Mapping lobby influences and government links through international think tanks and the World Economic Forum.",
    "keywords": ["Klaus Schwab", "Davos", "World Economic Forum", "WEF", "Stakeholder Capitalism", "ESG", "Fourth Industrial Revolution", "Building Back Better", "Prince Charles"],
    "category": "Global Agendas & Transnational Organizations"
  },
  {
    "id": "event-201",
    "title": "Event 201",
    "summary": "Factual summary of the 2019 pandemic simulation and its key participants.",
    "keywords": ["Johns Hopkins", "Gates Foundation", "Pandemic Exercise", "Coronavirus", "October 2019", "Global Preparedness"],
    "category": "Global Agendas & Transnational Organizations"
  },
  {
    "id": "club-of-rome",
    "title": "Club of Rome",
    "summary": "Analyzing the \"Limits to Growth\" and the foundations of global ecological governance.",
    "keywords": ["Aurelio Peccei", "Alexander King", "Limits to Growth", "Common Enemy of Humanity", "The First Global Revolution", "Population Control", "1968"],
    "category": "Global Agendas & Transnational Organizations"
  },
  {
    "id": "15-minute-cities",
    "title": "15-Minute Cities",
    "summary": "Analyzing urban development policies and their impact on movement freedom.",
    "keywords": ["Carlos Moreno", "C40 Cities", "Oxford", "Movement Restriction", "Digital Zoning", "Climate Lockdown", "Urban Planning"],
    "category": "Global Agendas & Transnational Organizations"
  },
  {
    "id": "digital-id",
    "title": "Digital ID (eIDAS)",
    "summary": "Investigation into the transition towards eIDAS and centralized biometric systems.",
    "keywords": ["eIDAS", "European Union", "Biometrics", "Digital Wallet", "Identity Framework", "Social Credit", "Surveillance"],
    "category": "Technology, ID & Surveillance"
  },
  {
    "id": "cbdc",
    "title": "CBDC (Central Bank Digital Currency)",
    "summary": "Analysis of programmable digital currencies and the end of financial privacy.",
    "keywords": ["Digital Euro", "Central Bank", "Programmable Money", "Cashless Society", "ECB", "Federal Reserve", "Financial Control"],
    "category": "Technology, ID & Surveillance"
  },
  {
    "id": "id2020",
    "title": "ID2020 Alliance",
    "summary": "Public-private partnership for universal biometric identification from birth.",
    "keywords": ["Microsoft", "Gavi", "Rockefeller Foundation", "Accenture", "Biometric ID", "Digital Health Pass", "Immunity Passport"],
    "category": "Technology, ID & Surveillance"
  },
  {
    "id": "social-credit",
    "title": "Social Credit Systems",
    "summary": "Investigation into algorithmic behavioral scoring systems and societal control.",
    "keywords": ["China", "Trust Score", "Sesame Credit", "Behavioral Engineering", "Dystopian Technology", "Algorithm", "Compliance"],
    "category": "Technology, ID & Surveillance"
  },
  {
    "id": "epstein-files",
    "title": "Jeffrey Epstein Files",
    "summary": "Jeffrey Epstein's network, unsealed court documents, and flight logs analysis.",
    "keywords": ["Ghislaine Maxwell", "Lolita Express", "Little St. James", "Blackmail", "Intelligence Agencies", "Kompromat", "2024 Unsealed", "Prince Andrew"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "mk-ultra",
    "title": "Project MK-Ultra",
    "summary": "The CIA's declassified mind control and behavior modification program records.",
    "keywords": ["CIA", "Mind Control", "LSD", "Sidney Gottlieb", "Church Committee", "Behavioral Engineering", "Human Experimentation"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "operation-paperclip",
    "title": "Operation Paperclip",
    "summary": "Declassified records of Nazi scientist recruitment to the United States after WWII.",
    "keywords": ["Wernher von Braun", "NASA", "OSS", "Cold War", "Scientific Recruitment", "Post-WWII", "Germany"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "operation-northwoods",
    "title": "Operation Northwoods",
    "summary": "The 1962 DoD plan for false flag attacks on US soil to justify war with Cuba.",
    "keywords": ["False Flag", "Lyman Lemnitzer", "JFK", "Department of Defense", "Cuba", "Declassified 1997", "Intelligence Ops"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "operation-mockingbird",
    "title": "Operation Mockingbird",
    "summary": "CIA campaign to influence international and domestic media outlets.",
    "keywords": ["Media Manipulation", "CIA", "Propaganda", "Journalists", "Cold War", "Mainstream Media", "Influence"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "operation-gladio",
    "title": "Operation Gladio",
    "summary": "NATO stay-behind clandestine armies and domestic political violence in Europe.",
    "keywords": ["NATO", "Stay-Behind", "Cold War", "Italy", "Years of Lead", "Psychological Warfare", "Secret Armies"],
    "category": "Declassified Operations & Intelligence Dossiers"
  },
  {
    "id": "blackrock-vanguard",
    "title": "BlackRock & Vanguard",
    "summary": "The \"Big Three\" investment groups and their influence on global corporate policy.",
    "keywords": ["Larry Fink", "ESG", "Monopoly", "Asset Management", "State Street", "Corporate Governance", "Institutional Shareholders"],
    "category": "Finance, Investment & Global Control"
  },
  {
    "id": "bis",
    "title": "Bank for International Settlements (BIS)",
    "summary": "The \"Bank for Central Banks\" and its role in coordinating global monetary policy.",
    "keywords": ["Basel", "Central Banking", "Monetary Cooperation", "Global Finance", "Sovereignty", "Apex Bank"],
    "category": "Finance, Investment & Global Control"
  },
  {
    "id": "bilderberg",
    "title": "Bilderberg Group",
    "summary": "Documentation on the annual private conference of the North American and European elite.",
    "keywords": ["Annual Meeting", "Private Policy", "Elite Conference", "Global Governance", "Secret Meetings", "Political Influence"],
    "category": "Elite Networks & Secret Assemblies"
  },
  {
    "id": "cfr",
    "title": "Council on Foreign Relations (CFR)",
    "summary": "US think tank's influence on foreign policy and cabinet appointments.",
    "keywords": ["Foreign Policy", "Think Tank", "The Establishment", "David Rockefeller", "Deep State", "Geopolitical Strategy", "Cabinet Members"],
    "category": "Elite Networks & Secret Assemblies"
  },
  {
    "id": "bohemian-grove",
    "title": "Bohemian Grove",
    "summary": "Private encampment for world leaders and its unofficial policy drafting rituals.",
    "keywords": ["California", "Cremation of Care", "Secret Societies", "Elite Retreat", "Occult Rituals", "Owl Shrine", "Power Brokerage"],
    "category": "Elite Networks & Secret Assemblies"
  }
];
