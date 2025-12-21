const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        function initAnimations() {
            const footerLogo = document.getElementById('footer-logo');
            const timelineItems = document.querySelectorAll('.timeline-item');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if(entry.target.id === 'footer-logo') {
                            entry.target.classList.add('animate-now');
                        }
                        if(entry.target.classList.contains('timeline-item')) {
                            entry.target.classList.add('show');
                        }
                    } else {
                        if(entry.target.id === 'footer-logo') {
                            entry.target.classList.remove('animate-now');
                        }
                        if(entry.target.classList.contains('timeline-item')) {
                            entry.target.classList.remove('show');
                        }
                    }
                });
            }, { threshold: 0.2 });

            if (footerLogo) observer.observe(footerLogo);
            timelineItems.forEach(item => observer.observe(item));
        }

        window.onload = function() {
            initAnimations();
        };