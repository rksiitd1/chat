document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", function() {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            // Display user message
            appendMessage("user", userMessage);
            
            // Send message to backend
            fetch('/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                // Display bot response
                appendMessage("bot", data.response);
            })
            .catch(error => console.error('Error:', error));
            
            // Clear user input
            userInput.value = "";
        }
    });

    function appendMessage(role, content) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(role);
        messageElement.innerText = content;
        chatContainer.appendChild(messageElement);
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
