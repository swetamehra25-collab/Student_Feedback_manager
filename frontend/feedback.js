const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    const response = await fetch("https://student-feedback-manager-3-om5c.onrender.com/feedback", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            rating,
            comment
        })
    });

    const data = await response.json();

    message.textContent = data.message;
});