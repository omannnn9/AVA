let currentLanguage = 'en';

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = "";

  // Show typing
  document.getElementById("typing-indicator").style.display = "block";

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language: currentLanguage })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("typing-indicator").style.display = "none";
    addAvaMessage(data.reply);
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

function setLanguage(lang) {
  currentLanguage = lang;
}
