/**
 * AI Chat Widget Manager
 * Handles UI interactions, local Natural Language Processing (NLP), dynamic 
 * routing context matching, spelling typo-tolerance, and structured 
 * intelligence briefs for the offline Archive Assistant.
 */
class AiChatWidget {
    /**
     * Initializes structural element references, sets up conversational state,
     * and compiles the offline stop-word and thematic synonym dictionary.
     */
    constructor() {
        // DOM Elements
        this.widget = document.getElementById('ai-chat-widget');
        this.toggleBtn = document.getElementById('chat-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.closeBtn = document.getElementById('chat-close');
        this.messagesContainer = document.getElementById('chat-messages');
        this.inputField = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');

        this.isOpen = false;
        this.isTyping = false;

        /**
         * A comprehensive list of standard English stop words and query filler tokens.
         * Stripping these prevents grammatical noise from diluting RAG keyword scoring.
         * @type {string[]}
         */
        this.stopWords = [
            'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 
            'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 
            'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 
            'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 
            'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 
            'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 
            'in', 'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 
            'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 
            'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shant', 'she', 'shed', 
            'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats', 
            'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 
            'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 
            'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 
            'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 
            'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 
            'youll', 'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves', 'please', 'show', 
            'tell', 'explain', 'search', 'find', 'dossier', 'dossiers', 'information', 'info', 
            'file', 'files', 'record', 'records', 'archive', 'archives', 'document', 'documents', 
            'regarding', 'about'
        ];

        /**
         * Thematic Synonym & Concept mapping dictionary. Maps general high-probability terms
         * and historical entities to specific dossier IDs to ensure extremely high search accuracy
         * when users search using general descriptive topics.
         * @type {Object[]}
         */
        this.thematicMatrix = [
            {
                ids: ['jekyll-island', 'federal-reserve', 'bis', 'imf-world-bank', 'project-agora', 'project-mariana'],
                keywords: ['monetary', 'banking', 'inflation', 'money', 'central bank', 'interest rate', 'currency', 'federal reserve', 'jekyll island', 'reserve', 'banker', 'bankers', 'gold standard', 'fractional', 'fiat', 'warburg', 'aldrich', 'vanderlip', 'agora', 'tokenization', 'mariana', 'amm', 'automated market maker']
            },
            {
                ids: ['15-minute-cities', 'my-carbon-wef', 'iea-10-point-plan', 'local-climate-mandates', 'agenda-2030', 'carbon-cbam', 'crowdstrike-outage'],
                keywords: ['climate', 'carbon', 'mandate', 'ulez', 'energy', 'lockdown', 'car-free', '15-minute', 'environmental', 'sustainable', 'sdgs', 'greenhouse', 'pollution', 'warming', 'mobility', 'restrictions', 'net zero', 'cbam', 'carbon border', 'carbon tariff', 'emissions tracking', 'crowdstrike', 'outage', 'blue screen', 'bsod', 'cyber-polygon']
            },
            {
                ids: ['wef', 'the-great-reset', 'davos-manifesto', 'bilderberg', 'trilateral-commission', 'un-pact-for-the-future', 'wef-global-risks-2026', 'kalergi-plan'],
                keywords: ['schwab', 'davos', 'world economic forum', 'bilderberg', 'trilateral', 'stakeholder capitalism', 'globalist', 'globalists', 'elite', 'elites', 'great reset', 'manifesto', 'private policy', 'young global leaders', 'fourth industrial', 'pact for the future', 'digital compact', 'un pact', 'global risks', 'disinformation', 'emergency platform', 'kalergi', 'kalergi plan', 'coudenhove-kalergi', 'practical idealism', 'praktischer idealismus', 'replacement', 'great replacement', 'white genocide']
            },
            {
                ids: ['mk-ultra', 'mk-delta', 'operation-mockingbird', 'operation-gladio', 'operation-sea-spray'],
                keywords: ['mind control', 'lsd', 'drugs', 'propaganda', 'media control', 'brainwash', 'gottlieb', 'cia', 'clandestine', 'psyop', 'psyops', 'intelligence', 'mockingbird', 'gladio', 'sea-spray', 'biological warfare', 'subprojects', 'church committee', 'stay-behind']
            },
            {
                ids: ['operation-northwoods', 'gulf-of-tonkin', 'uss-liberty'],
                keywords: ['false flag', 'northwoods', 'tonkin', 'maddox', 'liberty', 'naval skirmish', 'war escalation', 'cuba', 'cuba attack', 'declassified flag', 'military provocation']
            },
            {
                ids: ['epstein-files', 'panama-papers', 'vault-7', 'pegasus-spyware'],
                keywords: ['leak', 'leaks', 'panama', 'epstein', 'unsealed', 'court files', 'kompromat', 'blackmail', 'assange', 'wikileaks', 'vault 7', 'hacking', 'zero-day', 'surveillance', 'pegasus', 'nso group', 'spyware', 'cyber-intelligence', 'wiretap']
            },
            {
                ids: ['social-credit', 'digital-id', 'id2020', 'neuralink', 'eu-ai-act', 'us-ai-executive-order', 'fisa-702-reauthorization', 'worldcoin-world-id', 'palantir', 'flock-safety', 'ring-surveillance'],
                keywords: ['social credit', 'sesame', 'digital id', 'eidas', 'biometrics', 'biometric', 'id2020', 'neuralink', 'bci', 'musk', 'brain chip', 'surveillance state', 'digital wallet', 'identity framework', 'universal id', 'ai act', 'artificial intelligence', 'fisa', 'section 702', 'warrantless', 'worldcoin', 'world id', 'orb', 'iris scan', 'sam altman', 'proof of personhood', 'executive order 14110', 'ai safety', 'watermarking', 'content provenance', 'c2pa', 'palantir', 'gotham', 'foundry', 'aip', 'falcon', 'immigrationos', 'maven', 'titan', 'in-q-tel', 'predictive policing', 'thiel', 'karp', 'google cloud', 'bigquery', 'gemini', 'nhs', 'federated data platform', 'thomson reuters', 'clear', 'lexisnexis', 'data broker', 'gchq', 'nsa', 'nato', 'battlefield ai', 'prism', 'xkeyscore', 'flock', 'flock safety', 'alpr', 'anpr', 'license plate', 'cameras', 'ring', 'doorbell', 'amazon', 'warrantless sharing', 'police access', 'familiar faces']
            }
        ];

        this.init();
    }

    /**
     * Initializes event listeners, hooks keyboard inputs, and implements dynamic
     * click delegation for fuzzy spell-checking suggestions in chat logs.
     * @returns {void}
     */
    init() {
        if (!this.widget) return;

        // Toggle chat window visibility on button clicks
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat(false));

        // Submit user queries on button press or pressing Enter key
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });

        // Dynamic delegated click listener for "Did you mean?" suggestion triggers
        this.messagesContainer.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('did-you-mean-btn')) {
                const queryText = e.target.getAttribute('data-query');
                if (queryText) {
                    this.inputField.value = queryText;
                    this.handleSend();
                }
            }
        });
    }

    /**
     * Parses the current window hash route to see if the user is actively viewing
     * a dossier detail page.
     * @returns {string|null} The active dossier slug/ID, or null if not on a dossier page.
     */
    getActiveDossierId() {
        const hash = window.location.hash || '';
        const parts = hash.replace(/^#/, '').split('/');
        if (parts[0] === 'dossier' && parts[1]) {
            return parts[1];
        }
        return null;
    }

    /**
     * Checks if the user query is referencing the currently open dossier page
     * (e.g., using terms like "this", "it", "here").
     * @param {string} query - The lowercase trimmed user query.
     * @returns {boolean} True if the query is referential to the active screen.
     */
    isContextualQuery(query) {
        const genericTerms = [
            'this', 'it', 'here', 'current', 'active', 'dossier', 'page', 'document', 'subject', 'topic',
            'summarize', 'summary', 'keywords', 'actors', 'timeline', 'sources', 'brief', 'tell me more'
        ];
        return query.length < 35 && genericTerms.some(term => query.includes(term));
    }

    /**
     * Strips all English stop words and helper verbs from the user input to isolate
     * core content-heavy search keywords.
     * @param {string} text - The raw query entered by the user.
     * @returns {string[]} An array of filtered lowercase content words.
     */
    removeStopWords(text) {
        // Remove common punctuation and convert to lowercase
        const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ');
        const words = cleanText.split(/\s+/);
        return words.filter(word => word && !this.stopWords.includes(word));
    }

    /**
     * Toggles the open/closed visibility state of the sliding widget window.
     * @param {boolean|null} forceState - Optional flag to force open or closed state.
     * @returns {void}
     */
    toggleChat(forceState = null) {
        this.isOpen = forceState !== null ? forceState : !this.isOpen;
        this.chatWindow.classList.toggle('is-open', this.isOpen);
        
        if (this.isOpen) {
            this.inputField.focus();
            this.scrollToBottom();
        }
    }

    /**
     * Grabs user input text, appends it to the terminal screen, clears the prompt,
     * and triggers a natural simulated response delay.
     * @returns {void}
     */
    handleSend() {
        const text = this.inputField.value.trim();
        if (!text || this.isTyping) return;

        // Clear input immediately for better UX
        this.inputField.value = '';

        // Add user message to UI
        this.addMessage(text, true);

        // Simulate AI thinking and response
        this.simulateAiResponse(text);
    }

    /**
     * Appends a styled message bubble to the messages log container. Escapes user
     * content to block XSS injections, and uses a client-side Markdown engine for AI responses.
     * @param {string} text - The raw text message to display.
     * @param {boolean} isUser - True if the message represents user input.
     * @returns {void}
     */
    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        if (isUser) {
            messageDiv.textContent = text;
        } else {
            messageDiv.innerHTML = this.parseMarkdown(text);
        }
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * Standard client-side Markdown parser mapping asterisks and inline brackets
     * to italicized, bolded, or hyperlinked anchor HTML nodes.
     * @param {string} text - The raw markdown text input.
     * @returns {string} Safe rendered HTML string.
     */
    parseMarkdown(text) {
        if (!text) return '';
        
        let html = text;
        
        // 1. Escape HTML special characters to prevent XSS before parsing markdown
        html = html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        // 2. Restore trusted HTML tags that we intentionally generate in our local responses
        html = html
            .replace(/&lt;a\s+href=&quot;([^&]+)&quot;\s+class=&quot;([^&]+)&quot;&gt;([\s\S]+?)&lt;\/a&gt;/gi, '<a href="$1" class="$2">$3</a>')
            .replace(/&lt;button\s+class=&quot;([^&]+)&quot;\s+data-query=&quot;([^&]+)&quot;\s+style=&quot;([^&]+)&quot;&gt;([\s\S]+?)&lt;\/button&gt;/gi, '<button class="$1" data-query="$2" style="$3">$4</button>')
            .replace(/&lt;br&gt;/gi, '<br>')
            .replace(/&lt;br\s*\/&gt;/gi, '<br>');

        // 3. Parse bold (**text**) -> <strong>text</strong>
        html = html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');

        // 4. Parse italic (*text*) -> <em>text</em>
        html = html.replace(/\*([\s\S]+?)\*/g, '<em>$1</em>');

        // 5. Parse standard markdown links [text](url) -> <a href="url" class="chat-link-inline">text</a>
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="chat-link-inline">$1</a>');

        return html;
    }

    /**
     * Synthesizes a natural wait-delay (1200ms) with typing indicators
     * to emulate remote processing before outputting the local search result.
     * @param {string} userQuery - The search query sent by the user.
     * @returns {void}
     */
    /**
     * Synthesizes a natural wait-delay (1200ms) with typing indicators
     * to emulate remote processing before outputting the local search result.
     * Fetches dynamic dossier data before responding.
     * @param {string} userQuery - The search query sent by the user.
     * @returns {Promise<void>}
     */
    async simulateAiResponse(userQuery) {
        this.isTyping = true;
        
        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'message ai-message';
        typingDiv.textContent = '...';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();

        try {
            const dossiers = await DossierManager.loadData();
            
            // 1200ms delay to make it feel natural and deliberate
            setTimeout(() => {
                // Remove typing indicator
                const indicator = document.getElementById(typingId);
                if (indicator) indicator.remove();

                // Synthesize the smart local intelligence reply
                const response = this.generateLocalResponse(userQuery, dossiers);
                this.addMessage(response, false);
                
                this.isTyping = false;
            }, 1200);
        } catch (error) {
            console.error("AI response simulation failed:", error);
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();
            this.addMessage("Sorry, I encountered an error accessing the database archive.", false);
            this.isTyping = false;
        }
    }

    /**
     * Calculates the Levenshtein edit distance between two strings to support
     * spelling typo corrections.
     * @param {string} a - First string.
     * @param {string} b - Second string.
     * @returns {number} The Levenshtein distance.
     */
    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    /**
     * Cleans a string to lowercase and removes non-alphanumeric chars to support
     * spaceless spacing comparisons (e.g. jekyllisland -> jekyll island).
     * @param {string} str - The target string to normalize.
     * @returns {string} The normalized lowercase string.
     */
    cleanString(str) {
        return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    /**
     * Analyzes the query using stop-word filtering, thematic concept matrices, 
     * bi-gram multi-word phrase matching, active page context awareness, and fuzzy 
     * Levenshtein distances. Matches against loadable dossiers and returns structured HTML.
     * @param {string} userQuery - The search input entered by the user.
     * @param {Array} dossiers - The active array of dossier objects.
     * @returns {string} The rich synthesized HTML response message with quick links.
     */
    generateLocalResponse(userQuery, dossiers = []) {
        const query = userQuery.toLowerCase().trim();
        const cleanQuery = this.cleanString(query);

        // 1. Check for standard greetings
        const greetings = ['hello', 'hi', 'hey', 'greetings', 'welcome', 'yo', 'good morning', 'good afternoon'];
        if (greetings.some(g => query === g || query.startsWith(g + ' '))) {
            return `Welcome. I am the TGA digital Archive Assistant. I have indexed all **${dossiers.length} active intelligence dossiers** in the database.<br><br>` +
                   `You can query monetary systems (such as the *Federal Reserve* or *Jekyll Island*), public policy initiatives (*15-Minute Cities*, *Local Climate Mandates*), declassified operations (*MK-Ultra*, *Operation Mockingbird*), or unsealed public records (*Epstein Files*, *Panama Papers*).<br><br>` +
                   `How can I assist your research?`;
        }

        // 2. Check for sitemap or index lists
        const listTriggers = ['list', 'dossiers', 'dossier', 'all dossiers', 'index', 'show all', 'categories'];
        if (listTriggers.some(t => query === t || query.startsWith(t + ' ') || (query.length < 15 && query.includes(t)))) {
            const categories = {};
            dossiers.forEach(d => {
                if (!categories[d.category]) {
                    categories[d.category] = [];
                }
                categories[d.category].push(d);
            });

            let listHtml = "Here is a breakdown of our active intelligence database categories:<br>";
            for (const [cat, items] of Object.entries(categories)) {
                listHtml += `<br>📁 **${cat}**:<br>`;
                items.slice(0, 3).forEach(item => {
                    listHtml += `• <a href="#dossier/${item.id}" class="chat-link-inline">${item.title}</a><br>`;
                });
                if (items.length > 3) {
                    listHtml += `• *...and ${items.length - 3} more*<br>`;
                }
            }
            listHtml += `<br>You can view the full interactive repository on the main <a href="#dossiers" class="chat-link-inline">Dossier Index</a>.`;
            return listHtml;
        }

        // 3. Page Context / Referral Awareness
        const activeDossierId = this.getActiveDossierId();
        if (activeDossierId && this.isContextualQuery(query)) {
            const activeDossier = dossiers.find(d => d.id === activeDossierId);
            if (activeDossier) {
                // If they asked specifically for "keywords"
                if (query.includes('keyword')) {
                    return `🔑 **Keywords for <a href="#dossier/${activeDossier.id}" class="chat-link-inline">${activeDossier.title}</a>**:<br><br>` +
                           activeDossier.keywords.map(kw => `• ${kw}`).join('<br>');
                }
                // Default: summarize the active dossier
                return `📄 **Active Dossier: <a href="#dossier/${activeDossier.id}" class="chat-link-inline">${activeDossier.title}</a>** (Contextual Match)<br><br>` +
                       `**Category**: *${activeDossier.category}*<br>` +
                       `**Summary**: ${activeDossier.summary}<br><br>` +
                       `**Keywords**: ${activeDossier.keywords.slice(0, 5).join(', ')}.<br><br>` +
                       `*Since you are currently viewing this file, I have pulled this brief directly from your active screen.*`;
            }
        }

        // 4. Score dossier objects using a refined ranking hierarchy
        const scoredDossiers = dossiers.map(dossier => {
            let score = 0;
            const titleLower = dossier.title.toLowerCase();
            const summaryLower = dossier.summary.toLowerCase();
            const cleanTitle = this.cleanString(dossier.title);
            const cleanId = this.cleanString(dossier.id);

            // A. Exact Alphanumeric Title or ID match (+35 points)
            if (cleanQuery === cleanTitle || cleanQuery === cleanId) {
                score += 35;
            }

            // B. Thematic Semantic Synonym Matrix Match (+15 points)
            this.thematicMatrix.forEach(entry => {
                const matchesTheme = entry.keywords.some(keyword => {
                    const regex = new RegExp('\\b' + keyword + '\\b', 'i');
                    return regex.test(query) || query.includes(keyword);
                });
                
                if (matchesTheme && entry.ids.includes(dossier.id)) {
                    score += 15;
                }
            });

            // C. Multi-word Phrase & Exact Keyword Matching (+12 points for phrases, +6 for single words)
            dossier.keywords.forEach(keyword => {
                const kwLower = keyword.toLowerCase();
                const cleanKw = this.cleanString(keyword);
                if (kwLower.includes(' ')) {
                    if (query.includes(kwLower) || cleanQuery.includes(cleanKw)) {
                        score += 12;
                    }
                } else {
                    if (query.includes(kwLower) || cleanQuery.includes(cleanKw)) {
                        score += 6;
                    }
                }
            });

            // D. Matches dossier category (+6 points)
            if (query.includes(dossier.category.toLowerCase())) {
                score += 6;
            }

            // E. Word-level partial matching and spelling typo toleration
            const contentWords = this.removeStopWords(query);
            const titleWords = titleLower.split(/\s+/);
            const kwWords = dossier.keywords.flatMap(kw => kw.toLowerCase().split(/\s+/));

            contentWords.forEach(qWord => {
                if (qWord.length > 2) {
                    // Substring in Title (+6 points)
                    if (titleLower.includes(qWord)) {
                        score += 6;
                    }

                    // Substring in Summary (+2 points)
                    if (summaryLower.includes(qWord)) {
                        score += 2;
                    }

                    // Substring in Keywords (+4 points)
                    dossier.keywords.forEach(keyword => {
                        if (keyword.toLowerCase().includes(qWord)) {
                            score += 4;
                        }
                    });

                    // Typo tolerance: Levenshtein distance on title words (+4 points)
                    titleWords.forEach(tWord => {
                        if (tWord.length > 3) {
                            const distance = this.levenshteinDistance(qWord, tWord);
                            if (distance === 1 || (qWord.length >= 6 && distance <= 2)) {
                                score += 4;
                            }
                        }
                    });

                    // Typo tolerance: Levenshtein distance on keyword words (+3 points)
                    kwWords.forEach(kWord => {
                        if (kWord.length > 3) {
                            const distance = this.levenshteinDistance(qWord, kWord);
                            if (distance === 1 || (qWord.length >= 6 && distance <= 2)) {
                                score += 3;
                            }
                        }
                    });
                }
            });

            return { dossier, score };
        });

        // Filter and sort scored dossiers
        const matches = scoredDossiers
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        const bestMatch = matches[0];

        // 5. Generate Response based on matching results
        if (bestMatch && bestMatch.score >= 5) {
            const related = dossiers.filter(d => d.id !== bestMatch.dossier.id && d.category === bestMatch.dossier.category).slice(0, 2);
            let relatedText = "";
            if (related.length > 0) {
                relatedText = `<br><br>**Related Dossiers:**<br>` + 
                              related.map(r => `• <a href="#dossier/${r.id}" class="chat-link-inline">${r.title}</a>`).join('<br>');
            }

            return `📄 **Dossier: <a href="#dossier/${bestMatch.dossier.id}" class="chat-link-inline">${bestMatch.dossier.title}</a>** (Match Score: ${bestMatch.score})<br><br>` +
                   `**Category**: *${bestMatch.dossier.category}*<br>` +
                   `**Summary**: ${bestMatch.dossier.summary}<br><br>` +
                   `**Keywords**: ${bestMatch.dossier.keywords.slice(0, 5).join(', ')}.` +
                   relatedText;
        }

        // 6. Fuzzy Spelling did-you-mean suggestions fallback
        if (matches.length > 0) {
            const suggestions = matches.slice(0, 3).map(m => m.dossier);
            let suggestionsHtml = `No matching dossiers were found for *"${userQuery}"*.<br><br>`;
            suggestionsHtml += `**Suggested matches:**<br>`;
            suggestions.forEach(item => {
                suggestionsHtml += `• <button class="did-you-mean-btn chat-link-inline" data-query="${item.title}" style="background:none;border:none;padding:0;font:inherit;cursor:pointer;text-decoration:underline;color:var(--accent-blue);">${item.title}</button><br>`;
            });
            suggestionsHtml += `<br>Or enter **"list"** to view all categories.`;
            return suggestionsHtml;
        }

        // 7. General Archivist Help fallback if nothing matches
        const helpTriggers = ['help', 'how', 'what', 'support', 'info', 'archivist'];
        if (helpTriggers.some(t => query.includes(t))) {
            return `I am the TGA digital Archive Assistant, designed to help you search and retrieve institutional dossiers. This search is performed locally within the active repository database.<br><br>` +
                   `**Common search queries:**<br>` +
                   `• *Federal Reserve* or *Jekyll Island*<br>` +
                   `• *WEF*, *Davos*, or *The Great Reset*<br>` +
                   `• *MK-Ultra* or *Operation Mockingbird*<br>` +
                   `• *15-Minute Cities* or *Climate Mandates*<br>` +
                   `• *Epstein Files* or *Panama Papers*<br><br>` +
                   `Enter **"list"** to display all categories.`;
        }

        // 8. Default generic fallback
        return `No matching records were found for *"${userQuery}"*.<br><br>` +
               `The archive contains indexed files covering central banking, public policy, historical intelligence operations, and regulatory frameworks.<br><br>` +
               `Try searching for **"Federal Reserve"**, **"WEF"**, **"MK-Ultra"**, or **"Epstein Files"**, or enter **"list"** to display all categories.`;
    }

    /**
     * Ensures the chat history logs scroll to the bottom after message appends.
     * @returns {void}
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the widget once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AiChatWidget();
});
