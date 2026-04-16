# ⚡ AI RESEARCH WORKFLOW: DOSSIER_GEN_V1

```pseudocode
// DO-WHILE: topics_remaining IN items.md
[PROCESS_START]
    TARGET = Select_Next_Topic(items.md)
    STATUS = "Initializing research for: " + TARGET

[STEP_1: RAW_DATA_MINING]
    SEARCH(Primary_Sources ONLY) {
        - UN_Resolution_Database
        - WEF_Official_Publications
        - SEC_EDGAR_Filings (BlackRock/Vanguard)
        - CIA_FOIA_Reading_Room
        - National_Legislative_Archives
    }
    EXTRACT(Data_Points) {
        - Document_ID, Date, Signatories, Funding_Sources
    }

[STEP_2: NARRATIVE_MAPPING]
    SEARCH(Context) {
        - Great_Awakening_Map_Nodes
        - Narrative_Origin_Points
    }
    COMPILE(Claims) {
        - List_Common_Theories(WITHOUT_VERIFYING_AS_FACT)
    }

[STEP_3: SOURCE_VALIDATION]
    ASSERT(Separation == STRICT) // If Fact == Theory -> REJECT
    GENERATE(Citation_List) // All facts must have URL link

[STEP_4: COMPONENT_BUILD]
    CREATE_FILE("/pages/" + TARGET + ".html")
    TEMPLATE(Dashboard_UI) {
        HEADER(Target_Title, Status_Tag)
        BODY_GRID {
            SECTION("Gedocumenteerde Bewijsvoering") -> Inject(Step_1_Data)
            SECTION("Context / Narratief") -> Inject(Step_2_Claims)
            SECTION("Bronnen & Referenties") -> Inject(Step_3_Citations)
        }
    }

[STEP_5: SYSTEM_UPDATE]
    UPDATE("index.html") {
        STATS_COUNTER++
        APPEND_CARD(TARGET, Dossier_Grid)
    }
    GIT_PUSH("Research complete: " + TARGET)

[STEP_6: SEQUENCE_CONTROL]
    IF (Topic_Complete) {
        GOTO [PROCESS_START] // Start next topic ONLY when current is live
    }
```

## ⚠️ Core Directives
- **ATOMIC_WORKFLOW**: Voltooi 1 topic volledig voor je aan de volgende begint.
- **SOURCE_OR_DELETE**: Geen bron? Verwijder het feit.
- **CSS_LOCKED**: Gebruik enkel `css/style.css`.
- **NO_TRANSLATE**: Never use `translate` in UI effects.
