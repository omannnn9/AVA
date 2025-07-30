let currentLanguage = 'english';

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = "";

  showTyping();

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language: currentLanguage })
  })
  .then(response => response.json())
  .then(data => {
    hideTyping();
    addAvaMessage(data.response); // FIXED from data.reply to data.response
  })
  .catch(error => {
    hideTyping();
    addAvaMessage("Oops, something went wrong. Please try again.");
    console.error("Error:", error);
  });
}

function addUserMessage(message) {
  const chatBox = document.getElementById("chat-box");

  const messageRow = document.createElement("div");
  messageRow.className = "message-row user";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble user-message";
  bubble.textContent = message;

  messageRow.appendChild(bubble);
  chatBox.appendChild(messageRow);

  scrollToBottom();
}

function addAvaMessage(message) {
  const chatBox = document.getElementById("chat-box");

  const messageRow = document.createElement("div");
  messageRow.className = "message-row ava";

  const avatar = document.createElement("img");
  avatar.className = "message-avatar";
  avatar.src = "/static/ava.png";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble ava-message";
  bubble.textContent = message;

  messageRow.appendChild(avatar);
  messageRow.appendChild(bubble);
  chatBox.appendChild(messageRow);

  scrollToBottom();
}

function scrollToBottom() {
  const chatBox = document.getElementById("chat-box");
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.classList.remove("hidden");
}

function hideTyping() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.classList.add("hidden");
}

function setLanguage(lang) {
  currentLanguage = lang;

  // Update selected button style
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(btn => {
    btn.classList.remove("selected");
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("selected");
    }
  });
}
