document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("input-box");
  const sendBtn = document.getElementById("send-btn");
  const chatWindow = document.getElementById("chat-window");
  const enBtn = document.getElementById("en-btn");
  const frBtn = document.getElementById("fr-btn");

  let selectedLang = "en";

  enBtn.onclick = () => {
    selectedLang = "en";
    enBtn.classList.add("selected");
    frBtn.classList.remove("selected");
  };

  frBtn.onclick = () => {
    selectedLang = "fr";
    frBtn.classList.add("selected");
    enBtn.classList.remove("selected");
  };

  sendBtn.onclick = async () => {
    const message = inputBox.value.trim();
    if (!message) return;

    appendMessage("user", message);
    inputBox.value = "";

    appendMessage("ava", "<span class='typing'>AVA is typing...</span>");

    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language: selectedLang }),
    });

    const data = await res.json();
    removeTyping();
    appendMessage("ava", data.response);
  };

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeTyping() {
    const typingDiv = document.querySelector(".typing");
    if (typingDiv) typingDiv.parentElement.remove();
  }
});
