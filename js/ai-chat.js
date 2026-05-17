/**
 * AI Chat Widget Manager
 * Handles the UI interactions for the floating AI assistant, including 
 * window toggling, message processing, and simulated AI responses.
 */
class AiChatWidget {
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

        this.init();
    }

    /**
     * Initializes event listeners and sets the initial UI state.
     */
    init() {
        if (!this.widget) return;

        // Toggle chat window visibility
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat(false));

        // Handle message sending
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });
    }

    /**
     * Toggles the chat window open/closed state.
     * @param {boolean|null} forceState - Optional specific state to set.
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
     * Processes the user input and appends the message to the view.
     * Triggers a simulated AI response.
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
     * Appends a message bubble to the chat container.
     * Escapes user content with textContent to block XSS, while utilizing our safe 
     * client-side Markdown parser to render formatted elements (bold, italic, links) for AI messages.
     * @param {string} text - The content of the message.
     * @param {boolean} isUser - True if the message is from the user; false if from the AI.
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
     * Parses standard markdown syntax (bold **, italic *, and links [text](url)) 
     * into clean, compliant HTML tags, while ensuring complete XSS security.
     * @param {string} text - The raw markdown text.
     * @returns {string} The parsed HTML string.
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
     * Triggers the simulated AI reply using our local, typo-tolerant search engine.
     * @param {string} userQuery - The question or search term entered by the user.
     */
    simulateAiResponse(userQuery) {
        this.isTyping = true;
        
        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'message ai-message';
        typingDiv.textContent = '...';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();

        // 1200ms delay to make it feel natural and deliberate
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();

            // Synthesize the smart local intelligence reply
            const response = this.generateLocalResponse(userQuery);
            this.addMessage(response, false);
            
            this.isTyping = false;
        }, 1200);
    }

    /**
     * Calculates the Levenshtein edit distance between two strings.
     * Used to correct spelling typos (e.g. eppstein -> epstein).
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
     * Cleans a string to allow exact spaceless matches for spacing typos (e.g. epsteinfiles -> epstein files).
     * @param {string} str - The target string to normalize.
     * @returns {string} The lowercase string with all spaces and non-alphanumeric chars removed.
     */
    cleanString(str) {
        return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    /**
     * Analyzes the user query and matches it semantically against title, keywords, 
     * category, and summary fields in DOSSIER_DATA, returning a rich HTML response.
     * Integrates advanced typo-tolerance and spacing correction for robust search.
     * @param {string} userQuery - The query entered by the user.
     * @returns {string} The rich synthesized HTML response message with direct navigation links.
     */
    generateLocalResponse(userQuery) {
        const query = userQuery.toLowerCase().trim();
        const cleanQuery = this.cleanString(query);

        // 1. Check for standard greetings
        const greetings = ['hello', 'hi', 'hey', 'greetings', 'welcome', 'yo', 'good morning', 'good afternoon'];
        if (greetings.some(g => query === g || query.startsWith(g + ' '))) {
            return `Greetings, researcher. I am your local Archive Assistant. I have indexed the entire repository of **${DOSSIER_DATA.length} active intelligence dossiers**.<br><br>` +
                   `Ask me about monetary institutions (like the *Federal Reserve* or *Jekyll Island* Meeting), clandestine projects (*MK-Ultra*, *Operation Mockingbird*), societal mandates (*15-Minute Cities*, *Local Climate Mandates*), or leaked elite files (*Epstein Files*, *Panama Papers*).<br><br>` +
                   `What subject shall we examine first?`;
        }

        // 2. Check for sitemap or index lists
        const listTriggers = ['list', 'dossiers', 'dossier', 'all dossiers', 'index', 'show all', 'categories'];
        if (listTriggers.some(t => query.includes(t))) {
            const categories = {};
            DOSSIER_DATA.forEach(d => {
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
            listHtml += `<br>You can view the full interactive repository on the main <a href="#dossiers" class="chat-link-inline">Dossiers Portal</a>.`;
            return listHtml;
        }

        // 3. Search dossier objects for match scores
        let bestMatch = null;
        let highestScore = 0;

        DOSSIER_DATA.forEach(dossier => {
            let score = 0;
            const titleLower = dossier.title.toLowerCase();
            const summaryLower = dossier.summary.toLowerCase();
            
            const cleanTitle = this.cleanString(dossier.title);
            const cleanId = this.cleanString(dossier.id);

            // A. Spaceless title or ID match (corrects spacing typos like "epsteinfiles" or "mkultra")
            if (cleanQuery.includes(cleanTitle) || cleanTitle.includes(cleanQuery) ||
                cleanQuery.includes(cleanId) || cleanId.includes(cleanQuery)) {
                score += 22; // Huge boost for accurate keyword match!
            }

            // B. Matches specific dossier keywords (both normal and spaceless)
            dossier.keywords.forEach(keyword => {
                const kwLower = keyword.toLowerCase();
                const cleanKw = this.cleanString(keyword);
                
                if (query.includes(kwLower) || cleanQuery.includes(cleanKw)) {
                    score += 12;
                }
            });

            // C. Matches dossier category
            if (query.includes(dossier.category.toLowerCase())) {
                score += 6;
            }

            // D. Fuzzy word-level spelling typo matches (using Levenshtein distance)
            const queryWords = query.split(/\s+/);
            const titleWords = titleLower.split(/\s+/);
            const kwWords = dossier.keywords.flatMap(kw => kw.toLowerCase().split(/\s+/));

            queryWords.forEach(qWord => {
                if (qWord.length > 3) {
                    // Check exact word matches
                    if (titleLower.includes(qWord)) score += 4;
                    if (summaryLower.includes(qWord)) score += 1.5;

                    // Typo tolerance: check Levenshtein distance against title words
                    titleWords.forEach(tWord => {
                        if (tWord.length > 3) {
                            const distance = this.levenshteinDistance(qWord, tWord);
                            // If distance is 1 (or 2 for long words), it's a spelling typo!
                            if (distance === 1 || (qWord.length >= 6 && distance <= 2)) {
                                score += 8; // spelling match boost!
                            }
                        }
                    });

                    // Typo tolerance: check Levenshtein distance against keywords words
                    kwWords.forEach(kWord => {
                        if (kWord.length > 3) {
                            const distance = this.levenshteinDistance(qWord, kWord);
                            if (distance === 1 || (qWord.length >= 6 && distance <= 2)) {
                                score += 6;
                            }
                        }
                    });
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = dossier;
            }
        });

        // 4. Generate contextual local response
        if (bestMatch && highestScore > 4) {
            // Find related dossiers in the same category
            const related = DOSSIER_DATA.filter(d => d.id !== bestMatch.id && d.category === bestMatch.category).slice(0, 2);
            let relatedText = "";
            if (related.length > 0) {
                relatedText = `<br><br>**Related Dossiers:**<br>` + 
                              related.map(r => `• <a href="#dossier/${r.id}" class="chat-link-inline">${r.title}</a>`).join('<br>');
            }

            return `📄 **Dossier: <a href="#dossier/${bestMatch.id}" class="chat-link-inline">${bestMatch.title}</a>**<br><br>` +
                   `**Category**: *${bestMatch.category}*<br>` +
                   `**Summary**: ${bestMatch.summary}<br><br>` +
                   `**Keywords**: ${bestMatch.keywords.slice(0, 5).join(', ')}.` +
                   relatedText;
        }

        // 5. Help / Navigation assistance
        const helpTriggers = ['help', 'how', 'what', 'support', 'info', 'archivist'];
        if (helpTriggers.some(t => query.includes(t))) {
            return `I am here to assist your local archive retrieval. I run entirely client-side using a client-side keyword indexing engine, requiring zero API keys or external server requests.<br><br>` +
                   `**Try querying for:**<br>` +
                   `• *Federal Reserve* or *Jekyll Island*<br>` +
                   `• *WEF*, *Davos*, or *The Great Reset*<br>` +
                   `• *MK-Ultra* or *Operation Mockingbird*<br>` +
                   `• *15-Minute Cities* or *Climate Mandates*<br>` +
                   `• *Epstein Files* or *Panama Papers*<br><br>` +
                   `Enter **"list"** to display all indexed archive categories.`;
        }

        // 6. Generic high-quality themed fallback
        return `My local database does not find a direct record matching *"${userQuery}"*.<br><br>` +
               `However, the archive holds extensive files on related central banking architectures, military Operations, elite private networks, and transhumanist technologies.<br><br>` +
               `Try searching for **"Federal Reserve"**, **"WEF"**, **"MK-Ultra"**, or **"Epstein Files"**, or enter **"list"** to see all categories.`;
    }

    /**
     * Ensures the chat history container stays scrolled to the latest message.
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the widget once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AiChatWidget();
});
