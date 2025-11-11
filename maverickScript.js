const cards = document.querySelectorAll(".card");
const allOptions = document.querySelectorAll(".options-set");
// --- NEW: Get the container ---
const container = document.querySelector(".container");
let filtered = false;

// Get the original styles from the CSS
const cardStyles = window.getComputedStyle(cards[0]);
const cardWidth = cardStyles.width;
const cardPadding = cardStyles.padding;
const cardBorder = cardStyles.borderWidth;
// --- NEW: Get the original gap ---
const containerStyles = window.getComputedStyle(container);
const containerGap = containerStyles.gap;


cards.forEach((card) => {
  card.addEventListener("click", () => {
    const brand = card.dataset.brand;
    const optionsToShow = document.getElementById(brand + "-options");

    if (!filtered) {
      // --- FIRST CLICK LOGIC (MUCH SIMPLER) ---
      
      // 1. Tell the container to "snap" to the left
      container.classList.add("is-filtered");
      // 2. Set the container's gap to 0
      container.style.gap = "40px";

      // 3. Loop the cards to collapse the others
      cards.forEach((c) => {
        c.style.transition = "all 0.6s ease"; 

        if (c !== card) {
          // Collapse the non-clicked cards
          c.style.opacity = "0";
          c.style.width = "0px";
          c.style.padding = "0px";
          c.style.borderWidth = "0px";
          c.style.margin = "0px";
        } else {
          // Ensure the clicked card is visible
          c.style.opacity = "1";
        }
      });
      // --- END OF NEW LOGIC ---

      if (optionsToShow) {
        optionsToShow.style.display = "flex";
      }
      
      filtered = true;

    } else {
      // --- RESET LOGIC ---
      
      // 1. Remove the class to re-center the container
      container.classList.remove("is-filtered");
      // 2. Restore the container's gap
      container.style.gap = containerGap;
      
      cards.forEach((c) => {
        c.style.transition = "all 0.6s ease";
        // REMOVED all transform code
        c.style.transform = "translateX(0)"; 
        c.style.opacity = "1";
        
        // Restore the card's original size
        c.style.width = cardWidth;
        c.style.padding = cardPadding;
        c.style.borderWidth = cardBorder;
        c.style.margin = ""; // Reset margin
      });

      allOptions.forEach((opt) => {
        opt.style.display = "none";
      });
      
      filtered = false;
    }
  });
});
