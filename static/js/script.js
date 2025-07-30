const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const languageSelect = document.getElementById('language-select');

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Welcome message
function greetUser() {
  const lang = languageSelect.value;
  if (lang === 'fr') {
    addMessage("Bonjour! Je suis AVA, votre guide local à Maurice. Pose-moi une question!", 'ava');
  } else {
    addMessage("Hello! I'm AVA, your local Mauritius guide. Ask me anything!", 'ava');
  }
}

greetUser();

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  const lang = languageSelect.value;

  // Add user message to chat
  addMessage(message, 'user');
  userInput.value = '';

  // Show AVA typing...
  addMessage('...', 'ava');

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message, language: lang }),
    });

    const data = await response.json();

    // Remove the typing indicator
    const typingMsg = chatWindow.querySelector('.message.ava:last-child');
    if (typingMsg && typingMsg.textContent === '...') {
      typingMsg.remove();
    }

    // Show AVA reply
    addMessage(data.reply, 'ava');
  } catch (err) {
    console.error('Error:', err);
    const typingMsg = chatWindow.querySelector('.message.ava:last-child');
    if (typingMsg && typingMsg.textContent === '...') {
      typingMsg.remove();
    }
    addMessage(lang === 'fr' ? "Désolé, une erreur s'est produite." : "Sorry, an error occurred.", 'ava');
  }
});
