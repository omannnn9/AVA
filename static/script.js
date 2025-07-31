const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const languageSelector = document.getElementById('language-selector');

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.innerText = text;

    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'ava', 'typing');
    typingDiv.setAttribute('id', 'typing-indicator');
    typingDiv.innerHTML = '<div class="content">AVA is typing<span class="dots"><span>.</span><span>.</span><span>.</span></span></div>';
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
        chatBox.removeChild(typingDiv);
    }
}

document.getElementById('send-btn').addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.value = '';

    showTypingIndicator();

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            language: languageSelector.value
        })
    })
        .then(response => response.json())
        .then(data => {
            removeTypingIndicator();
            appendMessage('ava', data.answer);
        })
        .catch(error => {
            removeTypingIndicator();
            appendMessage('ava', "Oops, there was a problem!");
            console.error('Error:', error);
        });
}
