const chatBox = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const langFlags = document.querySelectorAll('.language-selector span');
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

function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'user-message');
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

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

function showTyping() {
  typingIndicator.style.display = 'block';
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  typingIndicator.style.display = 'none';
}

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

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

function toggleHelp() {
  helpScreen.style.display = (helpScreen.style.display === 'block') ? 'none' : 'block';
}
