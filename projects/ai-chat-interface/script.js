const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const messagesContainer = document.getElementById('messagesContainer');
const historyList = document.getElementById('historyList');
const newChatBtn = document.getElementById('newChatBtn');

// Auto resize textarea
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = chatInput.scrollHeight + 'px';
});

// Pre-defined conversational responses for mock stream
const botResponses = [
  {
    keywords: ['api', 'rest', 'route'],
    text: `Here is a clean Node.js / Express routing setup for your project. This follows production best practices with modular routers:

\`\`\`javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
\`\`\`

Let me know if you would like me to write the full authentication controllers! 🚀`
  },
  {
    keywords: ['react', 'perform', 'optim'],
    text: `To optimize React performance, focus on these three core strategies:
1. **Prevent Unnecessary Re-renders**: Wrap heavy child components in \`React.memo()\` and cache callbacks/computations using \`useCallback()\` and \`useMemo()\`.
2. **State Colocation**: Keep state as close to where it's used as possible. Moving local state out of a global provider stops the entire tree from re-rendering.
3. **Lazy Loading**: Use \`React.lazy()\` and \`Suspense\` to split your bundles, loading pages only when users navigate to them.`
  },
  {
    keywords: ['tailwind', 'component'],
    text: `Here's a premium card component designed with Tailwind CSS, utilizing modern gradients and hover micro-animations:

\`\`\`html
<div class="max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10">
  <span class="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">Featured</span>
  <h3 class="mt-4 text-lg font-bold text-slate-100">Modern SaaS Dashboard</h3>
  <p class="mt-2 text-sm text-slate-400">Track and analyze conversion funnels with premium data visualizations.</p>
</div>
\`\`\`

You can copy and drop this straight into your UI workspace! 🚀`
  }
];

// Handle new chat click
newChatBtn.addEventListener('click', () => {
  messagesContainer.innerHTML = `
    <div class="message ai-message">
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <p>Hello Arnold! This is a fresh chat window. What would you like to build or explore next?</p>
      </div>
    </div>
  `;
  const activeHistory = historyList.querySelector('.active');
  if (activeHistory) activeHistory.classList.remove('active');
});

// Trigger chips input
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('chip')) {
    chatInput.value = e.target.textContent;
    chatForm.dispatchEvent(new Event('submit'));
  }
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = chatInput.value.trim();
  if (!query) return;

  // Add User Message
  appendMessage(query, 'user');
  chatInput.value = '';
  chatInput.style.height = 'auto';

  // Add bot thinking state
  const thinkingId = appendThinkingMessage();

  // Scroll to bottom
  scrollToBottom();

  // Match keyword responses
  let matchedResponse = `I received your request: "${query}". I am currently connected via mock API stream. Arnold has configured me to display customized full-stack templates. Try clicking the suggestion chips below to see code examples!`;
  
  const lowerQuery = query.toLowerCase();
  for (const res of botResponses) {
    if (res.keywords.some(kw => lowerQuery.includes(kw))) {
      matchedResponse = res.text;
      break;
    }
  }

  // Simulate streaming response
  setTimeout(() => {
    removeThinkingMessage(thinkingId);
    streamBotMessage(matchedResponse);
  }, 1200);
});

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
  
  const avatar = sender === 'user' ? 'A' : '🤖';
  
  msgDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">${formatMarkdown(text)}</div>
  `;
  messagesContainer.appendChild(msgDiv);
  scrollToBottom();
}

function appendThinkingMessage() {
  const id = 'think-' + Date.now();
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ai-message';
  msgDiv.id = id;
  msgDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <p class="thinking-text" style="color: var(--text-secondary); font-style: italic;">thinking...</p>
    </div>
  `;
  messagesContainer.appendChild(msgDiv);
  return id;
}

function removeThinkingMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function streamBotMessage(fullText) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ai-message';
  
  msgDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content"></div>
  `;
  messagesContainer.appendChild(msgDiv);
  
  const contentDiv = msgDiv.querySelector('.message-content');
  let currentIdx = 0;
  
  const interval = setInterval(() => {
    // Quick and dirty stream simulation (adds chunks of characters for codeblock safety)
    const chunkSize = fullText.charAt(currentIdx) === '`' ? 3 : 1; 
    currentIdx += chunkSize;
    
    contentDiv.innerHTML = formatMarkdown(fullText.slice(0, currentIdx));
    scrollToBottom();

    if (currentIdx >= fullText.length) {
      clearInterval(interval);
    }
  }, 10);
}

function formatMarkdown(text) {
  // Simple custom parser to render pre/code codeblocks safely
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Code blocks
  formatted = formatted.replace(/```javascript([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  formatted = formatted.replace(/```html([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  formatted = formatted.replace(/```css([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Inline code
  formatted = formatted.replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; color: #38bdf8;">$1</code>');

  // Newlines to paragraph/breaks
  return formatted.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
