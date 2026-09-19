const feedbackList = document.getElementById("feedbackList");
const loading = document.querySelector(".loading");

async function getFeedback() {
    try {
        const response = await fetch("/feedback");
        const feedbacks = await response.json();

        loading.style.display = "none";

        feedbacks.forEach((feedback) => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${feedback.name}</h3>
                <p>Rating: ${feedback.rating}/5</p>
                <p>${feedback.comment}</p>
            `;

            feedbackList.appendChild(card);
        });

    } catch (error) {
        loading.textContent = "Failed to load feedback";
        console.log(error);
    }
}

getFeedback();