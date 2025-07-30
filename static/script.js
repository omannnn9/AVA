const chatBox = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const langFlags = document.querySelectorAll('.language-selector span'); // Fixed: changed to span
const helpScreen = document.getElementById('help-screen');

let currentLanguage = 'en';

// Language switcher
langFlags.forEach(flag => {
  flag.addEventListener('click', () => {
    langFlags.forEach(f => f.classList.remove('selected'));
    flag.classList.add('selected');
    currentLanguage = flag.id;
  });
});

// Append user message (right side)
function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'user-message');
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Append AVA message (left side with avatar)
function appendAvaMessage(text) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'bot-message');

  const avatar = document.createElement('img');
  avatar.src = '/static/ava.png';
  avatar.alt = 'AVA';

  msg.appendChild(avatar);
  const bubble = document.createElement('span');
  bubble.textContent = text;
  msg.appendChild(bubble);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing animation
function showTyping() {
  typingIndicator.style.display = 'block';
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Hide typing animation
function hideTyping() {
  typingIndicator.style.display = 'none';
}

// Send message to backend
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendUserMessage(text);
  userInput.value = '';
  showTyping();

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: text, language: currentLanguage})
    });
    const data = await response.json();
    hideTyping();
    appendAvaMessage(data.response);
  } catch (err) {
    hideTyping();
    appendAvaMessage("Sorry, I'm having trouble connecting.");
  }
}

// Send on button click
sendBtn.addEventListener('click', sendMessage);

// Send on Enter key
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Toggle Help Screen
function toggleHelp() {
  if (helpScreen.style.display === 'block') {
    helpScreen.style.display = 'none';
  } else {
    helpScreen.style.display = 'block';
  }
}
