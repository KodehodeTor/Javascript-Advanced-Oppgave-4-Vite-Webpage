import "./style.css";
import { renderCard } from "mtg-crucible";

// This reusable function handles fetching, building, and rendering the card image
async function processAndRenderCard() {
  const container = document.getElementById("card-container");
  const inputTextArea = document.getElementById("card-input-text");
  // Grab our new image URL input element reference
  const inputImageUrl = document.getElementById("card-image-url");

  // Show a loading text state inside our display zone while processing
  container.innerHTML =
    '<p style="color: #aaa; font-style: italic;">Assembling spell circles...</p>';

  try {
    // Grab the current raw plain-text content from the textarea box
    let userTypedData = inputTextArea.value;
    const imageUrl = inputImageUrl ? inputImageUrl.value.trim() : "";

    // 1. FIX: Use the exact 'Art URL:' syntax string recognized by mtg-crucible
    if (imageUrl) {
      userTypedData += `\nArt URL: ${imageUrl}`;
    }

    console.log("Compiling custom payload text layout...");

    // 2. FIX: Pass the 'allowUnsafeArtUrls: true' flag to permit external fetching in-browser
    const result = await renderCard(userTypedData, {
      allowUnsafeArtUrls: true,
    });

    // Process the resulting byte arrays into an object URL route safely
    const cardBlob = new Blob([result.frontFace], { type: "image/png" });
    const cardObjectURL = URL.createObjectURL(cardBlob);

    // Mount the brand new graphical card image into the preview portal
    const imgElement = document.createElement("img");
    imgElement.src = cardObjectURL;
    imgElement.alt = "Dynamically Rendered Custom MTG Card";
    imgElement.style.maxWidth = "420px";
    imgElement.style.borderRadius = "18px";
    imgElement.style.boxShadow = "0px 10px 30px rgba(0,0,0,0.6)";

    // Clear loading placeholder text and push the image layer on display
    container.innerHTML = "";
    container.appendChild(imgElement);
    console.log("Card state synced cleanly!");
  } catch (error) {
    console.error("Layout processing collapsed:", error);
    container.innerHTML = `
      <div style="color: #ff4d4d; padding: 20px; text-align: left; font-family: monospace;">
        <h4>Syntax/Render Error:</h4>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// --- DOM REGISTRATION HANDLERS ---
// Grab our UI trigger button
const actionButton = document.getElementById("generate-btn");

// Fire the rendering sequence whenever the user clicks the button
actionButton.addEventListener("click", processAndRenderCard);

// Run it once immediately when the page loads so it doesn't open completely blank
processAndRenderCard();
