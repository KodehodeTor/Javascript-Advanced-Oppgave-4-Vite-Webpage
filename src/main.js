// Clean, native package import - let Vite automatically choose the browser target
import { renderCard } from "mtg-crucible";

async function displayCard() {
  const container = document.getElementById("card-container");
  console.log("Card rendering module loaded via standard Vite pipeline!");

  try {
    const cardData = `
      Black Lotus {0}
      Artifact
      {T}, Sacrifice Black Lotus: Add three mana of any one color.
      Flavor Text: "The lotus blooms, an ephemeral beauty harboring infinite power."
      Rarity: Mythic Rare
    `;

    console.log("Generating card layers...");
    const result = await renderCard(cardData);

    // Convert the library's output format into a browser-readable URL string
    const cardBlob = new Blob([result.frontFace], { type: "image/png" });
    const cardObjectURL = URL.createObjectURL(cardBlob);

    // Create the image element and append it to the page
    const imgElement = document.createElement("img");
    imgElement.src = cardObjectURL;
    imgElement.alt = "Custom MTG Card Layout";
    imgElement.style.maxWidth = "420px";
    imgElement.style.borderRadius = "18px";
    imgElement.style.boxShadow = "0px 10px 30px rgba(0,0,0,0.4)";

    container.innerHTML = "";
    container.appendChild(imgElement);
    console.log("Card successfully drawn!");
  } catch (error) {
    console.error("Rendering failed:", error);
    container.innerHTML = `
      <div style="color: #ff4d4d; padding: 20px; border: 2px dashed #ff4d4d; border-radius: 8px;">
        <h3>Execution Blocked:</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

displayCard();
