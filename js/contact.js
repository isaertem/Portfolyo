
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        function initFooterAnimation() {
            const footerLogo = document.getElementById('footer-logo');
            if (!footerLogo) return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footerLogo.classList.add('animate-now');
                    } else {
                        footerLogo.classList.remove('animate-now');
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(footerLogo);
        }
        window.onload = function() {
            initFooterAnimation();
        };