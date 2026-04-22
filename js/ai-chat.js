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
     * @param {string} text - The content of the message.
     * @param {boolean} isUser - Whether the message is from the user or AI.
     */
    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = text;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * Simulates an AI assistant thinking and replying.
     * @param {string} userQuery - The message sent by the user.
     */
    simulateAiResponse(userQuery) {
        this.isTyping = true;
        
        // Show typing indicator (simulated with a temporary message)
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'message ai-message';
        typingDiv.textContent = '...';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();

        // Delayed response to mimic processing time
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();

            // Generic response for now
            const response = "Thank you for your question! I'm currently in 'UI mode', so I can't analyze the dossiers yet, but I'll be fully integrated soon to help you uncover the truth.";
            this.addMessage(response, false);
            
            this.isTyping = false;
        }, 1500);
    }

    /**
     * Ensures the chat history stays scrolled to the latest message.
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the widget once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AiChatWidget();
});
