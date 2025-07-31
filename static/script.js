let currentLanguage = "en";

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

document.getElementById("en-btn").addEventListener("click", () => switchLanguage("en"));
document.getElementById("fr-btn").addEventListener("click", () => switchLanguage("fr"));

function switchLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll(".lang").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`${lang}-btn`).classList.add("active");
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  showTypingIndicator(true);

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language: currentLanguage }),
  })
    .then(res => res.json())
    .then(data => {
      showTypingIndicator(false);
      appendMessage("ava", data.response);
    })
    .catch(() => {
      showTypingIndicator(false);
      appendMessage("ava", "Sorry, an error occurred.");
    });
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  document.getElementById("chat-box").appendChild(msg);
  msg.scrollIntoView({ behavior: "smooth" });
}

function showTypingIndicator(show) {
  document.getElementById("typing-indicator").style.display = show ? "block" : "none";
}
