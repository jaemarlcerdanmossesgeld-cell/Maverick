const cards = document.querySelectorAll(".card");
let filtered = false;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!filtered) {
      // First click → hide others
      cards.forEach((c) => {
        if (c !== card) {
          c.style.transition = "all 0.6s ease";
          c.style.transform = "translateX(-200%)";
          c.style.opacity = "0";
        }
      });
      card.style.transition = "all 0.6s ease";
      card.style.transform = "scale(1.1)";
      filtered = true;
    } else {
      // Second click anywhere → reset
      cards.forEach((c) => {
        c.style.transition = "all 0.6s ease";
        c.style.transform = "translateX(0)";
        c.style.opacity = "1";
      });
      filtered = false;
    }
  });
});
