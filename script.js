document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------
    // 1. MENU MOBILE (Hambúrguer)
    // ------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Abrir/Fechar menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // Alternar ícone (hambúrguer <-> X)
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ------------------------------------
    // 2. SCROLL ANIMATION (Fade In)
    // ------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Elemento aparece quando 15% dele estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target); // Para de observar depois que animou
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => scrollObserver.observe(el));

    // ------------------------------------
    // 3. SCROLL SUAVE & NAVBAR ATIVA (Mantido do original)
    // ------------------------------------
    const sections = document.querySelectorAll('section[id], header[id]');
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection){
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight menu ativo
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});
