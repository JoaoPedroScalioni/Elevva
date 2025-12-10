// O código JavaScript (script.js) permanece o mesmo da versão anterior, 
// pois ele é funcional e trata da interatividade (scroll suave e menu ativo).

document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os links de navegação para as seções (href começando com #)
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    
    // Seleciona todas as seções que têm um ID para serem observadas
    const sections = document.querySelectorAll('section[id]');
    
    // ------------------------------------
    // 1. SCROLL SUAVE
    // ------------------------------------
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Adiciona um pequeno offset para que a barra de navegação fixa não cubra o título da seção
                const headerOffset = 85; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------
    // 2. SCROLL SPY (Destaca o menu ativo)
    // ------------------------------------
    const options = {
        // Define a margem superior para que o ponto de ativação esteja logo abaixo do menu fixo
        rootMargin: '-100px 0px 0px 0px', 
        threshold: 0.5 // 50% da seção visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Adiciona a classe 'active' ao link que corresponde ao ID da seção visível
                const activeLink = document.querySelector(`.main-nav ul li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
});