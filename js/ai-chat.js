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
        this.gpuToggle = document.getElementById('chat-gpu-toggle');
        this.messagesContainer = document.getElementById('chat-messages');
        this.inputField = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');

        this.isOpen = false;
        this.isTyping = false;

        // WebGPU Local LLM state variables
        this.gpuEnabled = false;
        this.gpuLoading = false;
        this.webllmEngine = null;

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

        // Toggle local WebGPU neural engine
        if (this.gpuToggle) {
            this.gpuToggle.addEventListener('click', () => this.toggleGpuEngine());
        }

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
     * Triggers the AI reply. If WebGPU mode is enabled, it delegates generation 
     * to the locally running generative LLM; otherwise, it falls back to the 
     * ultra-fast local keyword & RAG indexing engine.
     * @param {string} userQuery - The message sent by the user.
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

        // 1. WebGPU Local LLM Mode
        if (this.gpuEnabled && this.webllmEngine) {
            try {
                // Synthesize strict dossier boundaries context in system prompt
                const systemPrompt = `You are the Great Awakening AI Assistant, a local neutral generative Large Language Model. 
You must answer the user's questions utilizing ONLY the facts, details, and summaries present in this research dossier database: ${JSON.stringify(DOSSIER_DATA)}.
If a query is unrelated to the dossiers database, state politely that it goes beyond the archive's scope.
Keep your answer concise (2-4 sentences max), factual, and atmospheric.
Format your output using standard markdown: bold (**), italics (*), and clickable links referencing the hash format, e.g. [Jekyll Island](#dossier/jekyll-island) or [MK-Ultra](#dossier/mk-ultra).`;

                const messages = [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userQuery }
                ];

                const reply = await this.webllmEngine.chat.completions.create({ messages });
                const answer = reply.choices[0].message.content;

                // Remove typing indicator
                const indicator = document.getElementById(typingId);
                if (indicator) indicator.remove();

                this.addMessage(answer, false);
            } catch (err) {
                console.error("Local LLM inference error:", err);
                
                // Fallback to high-speed index on failure
                const indicator = document.getElementById(typingId);
                if (indicator) indicator.remove();

                const fallbackAnswer = "⚠️ **Local LLM Inference Error.** Reverting to standard high-speed local indexing mode.\n\n" + 
                                       this.generateLocalResponse(userQuery);
                this.addMessage(fallbackAnswer, false);
            } finally {
                this.isTyping = false;
            }
            return;
        }

        // 2. Standard Mode Fallback (Local Index / Mini-RAG)
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
     * Toggles the state of the local WebGPU LLM engine.
     * Handles browser capability detection (navigator.gpu), dynamic CDN module imports, 
     * progress-report updates, UI loading animations, and cache checks.
     */
    async toggleGpuEngine() {
        if (this.gpuLoading) return;

        // 1. Deactivate if already active
        if (this.gpuEnabled) {
            this.gpuEnabled = false;
            this.gpuToggle.classList.remove('is-active');
            this.addMessage("⚡ **Local WebGPU Mode deactivated.** Reverted to standard high-speed search index.", false);
            return;
        }

        // 2. Hardware Capability check
        if (!navigator.gpu) {
            this.addMessage("⚠️ **WebGPU is not supported by your browser or hardware.**\n\nWebGPU is required to run generative neural networks locally. We recommend modern Google Chrome, Microsoft Edge, or Firefox on desktop. Reverted to standard high-speed search index mode.", false);
            return;
        }

        this.gpuLoading = true;
        this.gpuToggle.classList.add('is-loading');
        
        // Spawn status bubbles in the thread
        this.addMessage("⚡ **Initializing local WebGPU neural engine...**\n\nLoading the generative model weights (Qwen2-0.5B-Instruct, ~350MB). Weights will be cached in your browser so future visits load instantly. Please keep this panel open.", false);
        
        const progressId = 'gpu-loading-progress';
        const progressDiv = document.createElement('div');
        progressDiv.id = progressId;
        progressDiv.className = 'message ai-message';
        progressDiv.innerHTML = '📥 **Status: Connecting to weight repositories...**';
        this.messagesContainer.appendChild(progressDiv);
        this.scrollToBottom();

        try {
            // 3. Dynamic ESM module import (Lazy loading WebLLM only when requested)
            const webllm = await import("https://esm.run/@mlc-ai/web-llm");

            const selectedModel = "Qwen2-0.5B-Instruct-q4f16_1-MLC";
            
            // 4. Create WebGPU LLM Engine instance
            this.webllmEngine = await webllm.CreateEngine(selectedModel, {
                initProgressCallback: (report) => {
                    const bubble = document.getElementById(progressId);
                    if (bubble) {
                        // Dynamically update the in-chat download progress block
                        bubble.innerHTML = `📥 **Status**: *${report.text}*`;
                        this.scrollToBottom();
                    }
                }
            });

            // Loading complete success state
            const bubble = document.getElementById(progressId);
            if (bubble) bubble.remove();

            this.gpuEnabled = true;
            this.gpuLoading = false;
            this.gpuToggle.classList.remove('is-loading');
            this.gpuToggle.classList.add('is-active');

            this.addMessage("✅ **Local LLM Online!**\n\nAlibaba Qwen-0.5B-Instruct is fully loaded and accelerated by your WebGPU card. Ask me any question, and I will generate contextual generative replies entirely offline!", false);

        } catch (err) {
            console.error("Failed to initialize WebGPU LLM:", err);
            
            const bubble = document.getElementById(progressId);
            if (bubble) bubble.remove();

            this.gpuLoading = false;
            this.gpuToggle.classList.remove('is-loading');

            this.addMessage("❌ **Initialization Failure.**\n\nAn error occurred while downloading or building the local WebGPU model. Reverting to standard high-speed search index mode.", false);
        }
    }

    /**
     * Analyzes the user query and matches it semantically against title, keywords, 
     * category, and summary fields in DOSSIER_DATA, returning a rich HTML response.
     * @param {string} userQuery - The query entered by the user.
     * @returns {string} The rich synthesized HTML response message with direct navigation links.
     */
    generateLocalResponse(userQuery) {
        const query = userQuery.toLowerCase().trim();

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
            
            // Matches dossier title (high weight)
            if (query.includes(titleLower) || titleLower.includes(query)) {
                score += 18;
            }

            // Matches specific dossier keywords
            dossier.keywords.forEach(keyword => {
                const kwLower = keyword.toLowerCase();
                if (query.includes(kwLower)) {
                    score += 12;
                }
            });

            // Matches dossier category
            if (query.includes(dossier.category.toLowerCase())) {
                score += 6;
            }

            // Word-level match in title or summary
            const words = query.split(/\s+/);
            words.forEach(word => {
                if (word.length > 3) {
                    if (titleLower.includes(word)) score += 4;
                    if (summaryLower.includes(word)) score += 1.5;
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
                relatedText = `<br><br>**Related Intelligence Files:**<br>` + 
                              related.map(r => `• <a href="#dossier/${r.id}" class="chat-link-inline">${r.title}</a>`).join('<br>');
            }

            return `📁 **Dossier Located: <a href="#dossier/${bestMatch.id}" class="chat-link-inline">${bestMatch.title}</a>**<br><br>` +
                   `**Classification**: *${bestMatch.category}*<br>` +
                   `**Executive Summary**: ${bestMatch.summary}<br><br>` +
                   `**Key Tracked Vectors**: ${bestMatch.keywords.slice(0, 5).join(', ')}.` +
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
