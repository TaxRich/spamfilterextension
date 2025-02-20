document.addEventListener("DOMContentLoaded", function () {
    const checkSpamBtn = document.getElementById("checkSpam");
    const messageInput = document.getElementById("message");
    const resultText = document.getElementById("result");

    let vocabulary = {};

    // Load vectorizer.json
    fetch(chrome.runtime.getURL("vectorizer.json"))
        .then(response => response.json())
        .then(data => {
            vocabulary = data.vocabulary;
        })
        .catch(error => console.error("Error loading vectorizer:", error));

    checkSpamBtn.addEventListener("click", function () {
        const message = messageInput.value.trim().toLowerCase();
        if (!message) {
            resultText.innerText = "Please enter a message!";
            return;
        }

        let score = 0;
        const words = message.split(/\s+/);

        words.forEach(word => {
            if (word in vocabulary) {
                score += vocabulary[word];  // Simple spam score
            }
        });

        if (score > 50) {
            resultText.innerText = "🚨 This message looks like spam!";
            resultText.style.color = "red";
        } else {
            resultText.innerText = "✅ This message seems safe!";
            resultText.style.color = "green";
        }
    });
});
