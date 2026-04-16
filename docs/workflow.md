# AI Workflow: Dossier Creatie

Volg deze instructies strikt bij het toevoegen van nieuwe onderzoeksonderwerpen aan het **Great Awakening Research Project**.

## 🎯 Doel
Het creëren van een individuele onderzoekspagina in `/pages/` die de grens bewaakt tussen gedocumenteerde feiten en vigerende theorieën.

## 🛠️ Stap-voor-Stap Instructies

### 1. Pagina Initialisatie
- Maak een nieuw bestand aan: `/pages/[onderwerp].html`.
- Kopieer de basisstructuur en navigatie van `index.html`.
- Zorg dat de CSS correct wordt ingeladen (`../css/style.css`).

### 2. Onderzoekfase (De "Fact-Check")
Zoek naar bewijsmateriaal in deze volgorde van betrouwbaarheid:
1.  **Primaire Bronnen**: Officiële documenten van organisaties (UN, WEF), overheidsarchieven, wetsteksten.
2.  **Financiële Data**: SEC-filings, jaarverslagen, aandeelhoudersdata.
3.  **Historische Feiten**: Gedecertificeerde dossiers (CIA.gov FOIA-reading room).
4.  **De Theorie**: Beschrijf de context van de "Great Awakening Map" (wat wordt er beweerd?).

### 3. Pagina Opbouw (HTML Content)
Elke pagina MOET de volgende secties bevatten:

- **Header**: De naam van het onderwerp en een status-tag (`tag-fact`, `tag-investigation` of `tag-declassified`).
- **Sectie: Bewijsvoering**: Een `<ul>` lijst met puntsgewijze feiten + bronvermelding.
- **Sectie: Het Narratief**: Beschrijving van hoe dit item past in de "rabbit hole". Gebruik neutrale taal ("Wordt geassocieerd met...", "Supporters beweren...").
- **Sectie: Geldstromen**: Indien van toepassing, wie financiert dit of wie profiteert ervan?

### 4. Integratie
- Update de `stats-grid` op de `index.html` (verhoog de teller).
- Voeg een `dossier-card` toe aan de `card-grid` op `index.html` die linkt naar de nieuwe pagina.

---

## ⚠️ Belangrijke Richtlijnen voor de AI
- **GEEN Speculatie als feit presenteren**: Gebruik woorden als "Gedocumenteerd", "Gerapporteerd", versus "Beweerd", "Gesuggereerd".
- **Design Integrity**: Gebruik alleen CSS classes uit `css/style.css`.
- **Interlinking**: Link naar andere relevante dossiers binnen het project (bv. `[[Agenda 2030]]` linkt naar `agenda-2030.html`).
- **User Rule**: Gebruik NOOIT `translate` in de CSS voor hover-effecten.
