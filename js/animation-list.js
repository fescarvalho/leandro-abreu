document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".qualificacoes li");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("ativo");
            }, index * 150);
          });

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  const target = document.querySelector(".qualificacoes");
  if (target) {
    observer.observe(target);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ativo");
          observer.unobserve(entry.target); // Anima só uma vez
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  cards.forEach((card) => observer.observe(card));
});
