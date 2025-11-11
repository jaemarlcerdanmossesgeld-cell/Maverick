const cards = document.querySelectorAll(".card");
const allOptions = document.querySelectorAll(".options-set");
const container = document.querySelector(".container");
let filtered = false;

if (container) {
  const cardStyles = window.getComputedStyle(cards[0]);
  const cardWidth = cardStyles.width;
  const cardPadding = cardStyles.padding;
  const cardBorder = cardStyles.borderWidth;

  const containerStyles = window.getComputedStyle(container);
  const containerGap = containerStyles.gap;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const brand = card.dataset.brand;
      const optionsToShow = document.getElementById(brand + "-options");

      if (!filtered) {
        container.classList.add("is-filtered");
        container.style.gap = "30px"; 

        cards.forEach((c) => {
          c.style.transition = "all 0.6s ease"; 

          if (c !== card) {
            c.style.opacity = "0";
            c.style.width = "0px";
            c.style.padding = "0px";
            c.style.borderWidth = "0px";
            c.style.margin = "0px";
          } else {
            c.style.opacity = "1";
          }
        });

        if (optionsToShow) {
          optionsToShow.style.display = "flex";
        }
        
        filtered = true;

      } else {
        container.classList.remove("is-filtered");
        container.style.gap = containerGap;
        
        cards.forEach((c) => {
          c.style.transition = "all 0.6s ease";
          c.style.transform = "translateX(0)"; 
          c.style.opacity = "1";
          c.style.width = cardWidth;
          c.style.padding = cardPadding;
          c.style.borderWidth = cardBorder;
          c.style.margin = "";
        });

        allOptions.forEach((opt) => {
          opt.style.display = "none";
        });
        
        filtered = false;
      }
    });
  });
} 
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); 
      const destinationURL = link.href;
      document.body.classList.add("page-fade-out");
      setTimeout(() => {
        window.location.href = destinationURL;
      }, 500); 
    });
  });
});
