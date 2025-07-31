const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const languageSelector = document.getElementById("language-selector");

function appendMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = async () => {
  const message = userInput.value.trim();
  if (!message) return;

  const language = languageSelector.value;
  appendMessage(message, "user");
  userInput.value = "";

  appendMessage("Typing...", "bot");

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, language }),
  });

  const data = await response.json();

  // Remove typing animation
  const typingDivs = document.querySelectorAll(".bot");
  typingDivs[typingDivs.length - 1].remove();

  appendMessage(data.answer, "bot");
};

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendBtn.click();
});
