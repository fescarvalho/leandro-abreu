// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
// 1. Força o navegador a esquecer a posição do scroll ao recarregar
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}

// 2. Garante que o scroll vá para o topo assim que a página abrir
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


// --- PRELOADER (Animação de Saída) ---
// Espera o site carregar tudo (imagens, scripts, etc)
window.addEventListener("load", () => {
    // GARANTIA EXTRA: Joga para o topo antes de animar
    window.scrollTo(0, 0);

    const tlLoader = gsap.timeline({ delay: 0.5 });

    tlLoader.to("#preloader", {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut"
    })
    .from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");
});

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
// Animação Links Úteis (Blindada)
gsap.fromTo(".link-card", 
    { 
        scale: 0.8, 
        opacity: 0 
    },
    {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1, // Um aparece logo após o outro rapidinho
        scrollTrigger: {
            trigger: ".useful-links",
            start: "top 85%", // Começa quando a seção estiver quase toda na tela
        },
        ease: "back.out(1.7)" // Efeito de "pulo" ao aparecer
    }
);

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

// Animação Depoimentos (Blindada)
gsap.fromTo(".testimonial-card", 
    { 
        y: 50, 
        opacity: 0 
    },
    {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".testimonials",
            start: "top 80%", // Começa quando a seção entra na tela
        }
    }
);

// --- FORMULÁRIO AJAX (Sem redirecionar) ---
var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault(); // Impede o redirecionamento padrão
    
    var status = document.getElementById("my-form-status");
    var btn = document.getElementById("my-form-button");
    var originalBtnText = btn.innerText;

    // Muda texto do botão para dar feedback visual
    btn.innerText = "Enviando...";
    btn.disabled = true;

    var data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // SUCESSO
            status.innerHTML = "✅ Mensagem enviada com sucesso! Em breve retornaremos.";
            status.className = "success-message"; // Aplica estilo verde
            form.reset(); // Limpa os campos
            btn.innerText = "Enviado!";
            
            // Volta o botão ao normal depois de 3 segundos
            setTimeout(() => {
                btn.innerText = originalBtnText;
                btn.disabled = false;
                status.style.display = 'none'; // Esconde a mensagem
                status.className = ""; // Limpa a classe
            }, 5000);

        } else {
            // ERRO (Formspree retornou problemas)
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "❌ Ocorreu um erro ao enviar. Tente novamente.";
                }
                status.className = "error-message"; // Aplica estilo vermelho
                btn.innerText = originalBtnText;
                btn.disabled = false;
            })
        }
    }).catch(error => {
        // ERRO DE REDE
        status.innerHTML = "❌ Erro de conexão. Verifique sua internet.";
        status.className = "error-message";
        btn.innerText = originalBtnText;
        btn.disabled = false;
    });
}

// Ativa a função quando o formulário for enviado
form.addEventListener("submit", handleSubmit);