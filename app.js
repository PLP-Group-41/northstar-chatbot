const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let currentFlow = null;

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserInput() {
    const text = userInput.value.trim();
if (!text) {
    userInput.style.border = "2px solid red";
    setTimeout(() => {
        userInput.style.border = "";
    }, 1000);
    return;
}

addMessage(text, 'user');
userInput.value = '';

const typingMessage = document.createElement('div');
typingMessage.className = 'message bot-message';
typingMessage.textContent = '...';
chatMessages.appendChild(typingMessage);
chatMessages.scrollTop = chatMessages.scrollHeight;

setTimeout(() => {
    typingMessage.remove();

    if (currentFlow) {
        currentFlow = currentFlow.next(text);
    } else {
        const intent = detectIntent(text);

        if (intent === 'order_status') {
            currentFlow = startOrderStatusFlow(addMessage);
        } else if (intent === 'returns') {
            currentFlow = startReturnsFlow(addMessage);
        } else {
            addMessage(
                "I can help with order status, returns, or stock availability. What do you need?",
                'bot'
            );
        }
    }
}, 800);
}
=======

    if (!text) {
        userInput.style.border = "2px solid red";
        setTimeout(() => {
            userInput.style.border = "";
        }, 1000);
        return;
    }

    addMessage(text, 'user');   // ✅ only here
    userInput.value = '';        // ✅ only here

    const typingMessage = document.createElement('div');
    typingMessage.className = 'message bot-message';
    typingMessage.textContent = '...';
    chatMessages.appendChild(typingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typingMessage.remove();
        if (currentFlow) {
            currentFlow = currentFlow.next(text);
        } else {
            const intent = detectIntent(text);
            if (intent === 'order_status') {
                currentFlow = startOrderStatusFlow(addMessage);
            } else if (intent === 'returns') {
                currentFlow = startReturnsFlow(addMessage);
            } else {
                addMessage("I can help with order status, returns, or stock availability. What do you need?", 'bot');
            }
        }
    }, 800);
}

// ✅ Attach listeners at the top level, not inside the handler
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
});

// ✅ Welcome message runs on load
setTimeout(() => {
    addMessage("Hi! I'm your Northstar support assistant. How can I help you today?", 'bot');
}, 300);