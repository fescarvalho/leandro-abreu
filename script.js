// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Menu Mobile (Burger)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }
}
navSlide();

// 2. Swiper (Carrossel do Topo)
// Verifica se o Swiper existe antes de iniciar para evitar erros
if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper(".mySwiper", {
        effect: "fade",
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

// 3. Animações GSAP (Hero)
gsap.from(".gsap-hero", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out"
});

// 4. CORREÇÃO DOS CARDS (Use fromTo para evitar bugs de sumiço)
// Seleciona todos os cards
const cards = document.querySelectorAll(".service-card");

if (cards.length > 0) {
    gsap.fromTo(cards, 
        { 
            y: 50,    // Começa 50px para baixo
            opacity: 0 // Começa invisível
        },
        {
            y: 0,      // Vai para a posição original
            opacity: 1, // Fica 100% visível
            duration: 0.8,
            stagger: 0.2, // Um de cada vez
            scrollTrigger: {
                trigger: ".services-grid", // Dispara quando o GRID inteiro aparecer
                start: "top 85%", // Inicia quando o topo da seção estiver a 85% da tela
            }
        }
    );
}

// Animação Links Úteis
gsap.from(".link-card", {
    scrollTrigger: {
        trigger: ".useful-links",
        start: "top 80%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// Animação da Barra de Estatísticas
// Animação Stats (Correção de Alinhamento)
gsap.fromTo(".stat-card", 
    { y: 50, opacity: 0 },
    {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".stats-section",
            start: "top 90%",
        },
        onComplete: function() {
            // Garante que, ao terminar, o JS limpe qualquer estilo que possa causar desalinhamento
            this.targets().forEach(target => target.style.transform = "none");
        }
    }
);