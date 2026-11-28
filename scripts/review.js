const parameters = new URLSearchParams(window.location.search);
const productId = parameters.get("product");
const rating = parameters.get("rating");
const installationDate = parameters.get("installationDate");
const selectedProduct = products.find((product) => product.id === productId);
const parsedInstallationDate = new Date(`${installationDate}T00:00:00`);
const confirmationMessage = document.querySelector("#confirmation-message");
const submissionError = document.querySelector("#submission-error");
const reviewSummary = document.querySelector("#review-summary");
const reviewCount = document.querySelector("#review-count");

function showSubmissionError(message) {
    document.querySelector("#confirmation-heading").textContent = "Review not received";
    confirmationMessage.textContent = "Please return to the form and submit a complete review.";
    submissionError.textContent = message;
    submissionError.hidden = false;
    document.querySelector(".confirmation-icon").hidden = true;
}

function addSummaryRow(label, value) {
    if (!value) {
        return;
    }

    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    reviewSummary.append(term, description);
}

if (!selectedProduct || !["1", "2", "3", "4", "5"].includes(rating) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(installationDate ?? "") ||
    Number.isNaN(parsedInstallationDate.getTime())) {
    showSubmissionError("The submitted review details are missing or invalid.");
} else {
    confirmationMessage.textContent = "Your product review has been submitted successfully.";
    addSummaryRow("Product", selectedProduct.name);
    addSummaryRow("Rating", `${rating} out of 5 stars`);
    addSummaryRow("Installed", parsedInstallationDate.toLocaleDateString());
    addSummaryRow("Useful features", parameters.getAll("features").join(", "));
    addSummaryRow("Written review", parameters.get("writtenReview"));
    addSummaryRow("Your name", parameters.get("userName"));
    reviewSummary.hidden = false;

    try {
        const storedCount = Number.parseInt(localStorage.getItem("reviewCount") ?? "0", 10);
        const previousCount = Number.isInteger(storedCount) && storedCount >= 0 ? storedCount : 0;
        const newCount = previousCount + 1;
        localStorage.setItem("reviewCount", String(newCount));
        reviewCount.textContent = String(newCount);
    } catch (error) {
        console.error("Unable to save the review count in local storage.", error);
        submissionError.textContent = "Your review was received, but this browser could not save the review count.";
        submissionError.hidden = false;
    }
}
