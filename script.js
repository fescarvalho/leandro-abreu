// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Menu Mobile Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

// 2. Animações GSAP

// Hero Section (Carrega ao abrir a página)
const tl = gsap.timeline();

tl.from(".gsap-hero", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out"
});

// Animação dos Serviços (Ao rolar a página)
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".services",
        start: "top 80%", // Começa quando o topo da seção atinge 80% da viewport
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Animação dos Links Úteis
gsap.from(".link-card", {
    scrollTrigger: {
        trigger: ".useful-links",
        start: "top 75%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// Animação Contato
gsap.from(".contact-container", {
    scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1
});

// 1. Inicialização do Swiper (Carrossel)
const swiper = new Swiper(".mySwiper", {
    effect: "fade", // Efeito de 'fade' é mais elegante que 'slide' para escritório
    loop: true,
    speed: 1500, // Velocidade da transição (1.5s)
    autoplay: {
        delay: 1000, // Troca a cada 5 segundos
        disableOnInteraction: false,
    },
    allowTouchMove: false, // Opcional: Impede o usuário de arrastar (deixa automático como um vídeo)
});

// ... (Mantenha o resto do seu código GSAP e Menu Mobile abaixo) ...