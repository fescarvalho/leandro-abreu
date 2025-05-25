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

/* ------------------ */
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

/* ------------------ */
function animarContador(elemento, duracao = 2000) {
  const alvo = +elemento.getAttribute("data-target");
  const inicio = 0;
  const inicioTempo = performance.now();

  function atualizar(tempoAtual) {
    const tempoPassado = tempoAtual - inicioTempo;
    const progresso = Math.min(tempoPassado / duracao, 1);
    const valorAtual = Math.floor(progresso * (alvo - inicio) + inicio);

    elemento.textContent = valorAtual;

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      elemento.textContent = alvo;
    }
  }

  requestAnimationFrame(atualizar);
}

const contadores = document.querySelectorAll(".numero");

const observer = new IntersectionObserver(
  (entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        obs.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

contadores.forEach((el) => observer.observe(el));

/* Numeros */

document.addEventListener("DOMContentLoaded", function () {
  const clientes = document.querySelectorAll(".clientes");
  const anos = document.querySelectorAll(".anos");
  const informatizado = document.querySelectorAll(".informatizado");
  const satisfacao = document.querySelectorAll(".satisfacao");

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

  clientes.forEach((clientes) => observer.observe(clientes));
  anos.forEach((anos) => observer.observe(anos));
  informatizado.forEach((informatizado) => observer.observe(informatizado));
  satisfacao.forEach((satisfacao) => observer.observe(satisfacao));
});

/* Depoimentos */
const wrapper = document.querySelector(".carrossel-wrapper");
const cadsDp = document.querySelectorAll(".card");
const totalSlides = cadsDp.length;
const slidesPerView = 3;
const totalGroups = Math.ceil(totalSlides / slidesPerView);
const dotsContainer = document.querySelector(".carrossel-dots");
let index = 0;

function moveCarousel() {
  const percentage = (100 / slidesPerView) * slidesPerView * index;
  wrapper.style.transform = `translateX(-${percentage}%)`;
  updateDots();
}

function createDots() {
  for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement("button");
    dot.addEventListener("click", () => {
      index = i;
      moveCarousel();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll(".carrossel-dots button");
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

// Inicializar
createDots();
moveCarousel();
