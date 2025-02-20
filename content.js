async function loadVectorizer() {
    const response = await fetch(chrome.runtime.getURL("vectorizer.json"));
    return response.json();
}

async function detectSpamEmails() {
    let vectorizer = await loadVectorizer();

    let emails = document.querySelectorAll(".zA");  // Gmail email list

    emails.forEach(email => {
        let subject = email.querySelector(".bog").innerText.toLowerCase();
        let sender = email.querySelector(".yX .yW span").innerText.toLowerCase();
        let emailText = subject + " " + sender;

        let score = 0;
        let words = emailText.split(/\s+/);

        words.forEach(word => {
            if (word in vectorizer.vocabulary) {
                score += vectorizer.vocabulary[word];
            }
        });

        if (score > 50) {
            email.style.backgroundColor = "#ffcccc";  // Highlight spam emails
            console.log("Spam detected:", subject);
        }
    });
}

// Run spam detection when the page loads
window.onload = () => {
    setTimeout(detectSpamEmails, 3000);
};
