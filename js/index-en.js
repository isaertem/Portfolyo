        const skillsData = [
            { name: "HTML5", icon: "fab fa-html5", color: "text-orange-500" },
            { name: "CSS3", icon: "fab fa-css3-alt", color: "text-blue-500" },
            { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-400" },
            { name: "React.js", icon: "fab fa-react", color: "text-cyan-400" },
            { 
                name: "Tailwind", 
                svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>`,
                color: "text-cyan-400" 
            },
            { name: "Bootstrap", icon: "fab fa-bootstrap", color: "text-purple-600" },
            { name: "WordPress", icon: "fab fa-wordpress", color: "text-blue-600" },
            { name: "Java", icon: "fab fa-java", color: "text-red-500" },
            { name: "C#", icon: "fas fa-code", color: "text-purple-500" }, 
            { name: "C++", icon: "fas fa-code", color: "text-blue-500" }, 
            { name: "PHP", icon: "fab fa-php", color: "text-indigo-400" },
            { name: "Python", icon: "fab fa-python", color: "text-yellow-300" },
            { name: "Git", icon: "fab fa-git-alt", color: "text-orange-600" },
            { name: "Figma", icon: "fab fa-figma", color: "text-pink-500" },
            { name: "Database", icon: "fas fa-database", color: "text-emerald-400" },
            { name: "Photoshop", icon: "fas fa-image", color: "text-blue-500" },
            { name: "Illustrator", icon: "fas fa-pen-nib", color: "text-orange-600" },
            { name: "Premiere Pro", icon: "fas fa-video", color: "text-purple-600" },
        ];

        const projectsData = [
    { 
        title: "Grade Calculation Assistant", 
        desc: "University GPA Calculation Assistant developed using HTML and JavaScript.", 
        tags: ["HTML","JS", "Tailwind"], 
        img: "nothesaplayıcı.png", 
        link: "nothasaplayici/index.html" 
    },
     { 
        title: "Corporate Website", 
        desc: "Fully responsive and SEO-compatible corporate identity suitable for modern design trends. (Under Development)", 
        tags: ["HTML", "SCSS", "SEO"], 
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "#" 
    },
    { 
        title: "Social Media App", 
        desc: "Real-time messaging and post sharing application with Firebase infrastructure. (Under Development)", 
        tags: ["JS", "Firebase", "Realtime"], 
        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "#" 
    }
];

        window.onload = function() {
            renderSkills();
            renderProjects();
            startTypewriter();
            initScrollListeners();
            initModernAnimation();
            initCounters();
            initFooterAnimation(); 
        };

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
            }, {
                threshold: 0.5 
            });

            observer.observe(footerLogo);
        }

        function forceDownload(e, url, filename) {
            e.preventDefault(); 

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = blobUrl;
                    a.download = filename; 
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                    document.body.removeChild(a);
                })
                .catch((error) => {
                    console.log("İndirme başarısız, dosya açılmaya çalışılıyor...", error);
                    window.open(url, '_blank');
                });
        }


        function renderSkills() {
            const container = document.getElementById('skills-grid');
            
            container.className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6";
            
            let html = '';
            skillsData.forEach(skill => {
                let iconHtml;
                if (skill.svg) {
                    iconHtml = skill.svg;
                } else {
                    iconHtml = `<i class="${skill.icon}"></i>`;
                }

                html += `
                <div class="group relative bg-gray-800/50 hover:bg-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-2 cursor-default">
                    <div class="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110 ${skill.color || 'text-gray-400'} drop-shadow-md">
                        ${iconHtml}
                    </div>
                    <span class="font-medium text-gray-300 group-hover:text-white transition-colors text-center">${skill.name}</span>
                    
                    <!-- Glow Effect -->
                    <div class="absolute inset-0 bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>`;
            });
            container.innerHTML = html;
        }

        function renderProjects() {
            const container = document.getElementById('projects-grid');
            let html = '';
            projectsData.forEach(p => {
                html += `
                <div class="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20">
                    <div class="overflow-hidden relative h-56">
                        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-gray-900/30">
                            <a href="${p.link}" target="_blank" class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-2 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-600 shadow-lg">Detaylar</a>
                        </div>
                    </div>
                    <div class="p-6">
                        <a href="${p.link}" target="_blank" class="block hover:text-cyan-400 transition-colors">
                            <h3 class="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">${p.title}</h3>
                        </a>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${p.desc}</p>
                        <div class="flex flex-wrap gap-2">
                            ${p.tags.map(t => `<span class="text-xs font-medium bg-gray-800 text-cyan-400 border border-gray-700 px-2.5 py-1 rounded-md">#${t}</span>`).join('')}
                        </div>
                    </div>
                </div>`;
            });
            container.innerHTML = html;
        }

        function startTypewriter() {
            const texts = ["Web Developer", "UI/UX Designer", "Freelancer"];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const element = document.getElementById('typewriter');

            function type() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    element.innerText = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    element.innerText = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); 
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, isDeleting ? 50 : 100);
                }
            }
            type();
        }

        function initScrollListeners() {
            const navbar = document.getElementById('navbar');
            const scrollBtn = document.getElementById('scroll-to-top');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-gray-900/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-gray-800');
                    navbar.classList.remove('py-6', 'bg-transparent');
                    navbar.classList.add('py-4');
                } else {
                    navbar.classList.remove('bg-gray-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4', 'border-b', 'border-gray-800');
                    navbar.classList.add('py-6', 'bg-transparent');
                }

                if (window.scrollY > window.innerHeight) {
                    scrollBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                    scrollBtn.classList.add('opacity-100', 'translate-y-0');
                } else {
                    scrollBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    scrollBtn.classList.remove('opacity-100', 'translate-y-0');
                }
            });
        }

        function initModernAnimation() {
            const canvas = document.getElementById('hero-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            let width = window.innerWidth;
            let height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            let mouseX = 0;
            let mouseY = 0;
            window.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX - width / 2) * 0.05;
                mouseY = (e.clientY - height / 2) * 0.05;
            });

            const languages = [
                { 
                    name: 'js', 
                    color: '6, 182, 212', 
                    snippets: ['const', 'let', 'await', 'async', 'function', '=>', 'console.log', 'import', 'return', 'try', 'catch', 'Promise', 'document'] 
                },
                { 
                    name: 'react', 
                    color: '96, 165, 250', 
                    snippets: ['useState', 'useEffect', '<Component />', 'props', 'jsx', 'hook', 'redux', 'context'] 
                },
                { 
                    name: 'html', 
                    color: '244, 114, 182', 
                    snippets: ['<div>', '<span>', '<section>', '<h1>', '<script>', '<body>', '<html>', 'src=""', 'href=""', 'id=""', 'class=""', '<br/>'] 
                },
                { 
                    name: 'css', 
                    color: '167, 139, 250', 
                    snippets: ['display:flex', 'grid', 'margin', 'padding', 'color', 'background', 'border', '!important', '@media', 'hover:', 'rem', 'px'] 
                },
                { 
                    name: 'symbols', 
                    color: '75, 85, 99', 
                    snippets: ['{ }', '[ ]', '( )', '&&', '||', '!=', '===', '+=', '=>', '</>', '/* */', '//', '::', '->'] 
                }
            ];

            const allSnippets = [];
            languages.forEach(lang => {
                lang.snippets.forEach(text => {
                    allSnippets.push({ text, color: lang.color });
                });
            });

            class Particle {
                constructor() {
                    this.reset(true);
                }

                reset(initial = false) {
                    this.x = Math.random() * width;
                    this.y = initial ? Math.random() * height : height + 20; 
                    this.z = Math.random() * 0.8 + 0.2; 
                    
                    const randomSnippet = allSnippets[Math.floor(Math.random() * allSnippets.length)];
                    this.text = randomSnippet.text;
                    this.baseColor = randomSnippet.color;
                    
                    this.size = Math.floor(Math.random() * 14) + 10;
                    this.speedY = (Math.random() * 0.5 + 0.2) * -1; 
                    this.speedX = (Math.random() - 0.5) * 0.2;
                }

                update() {
                    this.x += this.speedX * this.z;
                    this.y += this.speedY * this.z;

                   
                    if (this.y < -50) {
                        this.reset(false);
                        this.y = height + 50; 
                    }
                }

                draw() {
                    const pX = this.x - (mouseX * this.z);
                    const pY = this.y - (mouseY * this.z);

                    ctx.font = `bold ${this.size * this.z}px monospace`;
                    const opacity = this.z * 0.8; 
                    
                    ctx.fillStyle = `rgba(${this.baseColor}, ${opacity})`;
                    ctx.fillText(this.text, pX, pY);
                }
            }

            const particleCount = Math.floor((width * height) / 10000); 
            const particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                requestAnimationFrame(animate);
            }
            animate();

            window.addEventListener('resize', () => {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            });
        }

        function initCounters() {
            const counters = document.querySelectorAll('.counter');
            const options = { threshold: 0.5 }; 

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; 
                        const increment = target / (duration / 16); 

                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current) + "+";
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target + "+";
                            }
                        };
                        updateCounter();
                        observer.unobserve(counter); 
                    }
                });
            }, options);

            counters.forEach(counter => {
                observer.observe(counter);
            });
        }
        
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            toggleMobileMenu();
        });

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('hidden');
        }