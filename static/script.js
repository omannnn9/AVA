document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-button");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  sendButton.onclick = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    const selectedLang = document.querySelector('input[name="language"]:checked').value;

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    userInput.value = "";

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: selectedLang })
      });

      const data = await response.json();

      const botMessage = document.createElement("div");
      botMessage.className = "chat-message ava";
      botMessage.textContent = data.response;
      chatBox.appendChild(botMessage);
      chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "chat-message ava";
      errorMessage.textContent = "Oops, something went wrong!";
      chatBox.appendChild(errorMessage);
    }
  };
});
