        let isVoiceEnabled = false; 
        const synthesis = window.speechSynthesis;

        const knowledgeBase = {
            greetings: {
                keywords: ["merhaba", "selam", "hi", "hello", "naber", "nasılsın", "günaydın", "iyi akşamlar"],
                answers: [
                    "Merhaba! Ben İsa'nın dijital asistanıyım. Web geliştirme, projeler veya İsa hakkında sorularını cevaplayabilirim. 👋",
                    "Selamlar! İsa'nın portfolyosuna hoş geldin. Sana nasıl yardımcı olabilirim? 😊",
                    "Merhaba! Kod dünyasına hoş geldin. Ne sormak istersin?"
                ]
            },
            selam: {
                keywords: ["sa", "selamun aleyküm", "selamunaleyküm"],
                answers: [
                    "Aleyküm Selam  Ben İsa'nın dijital asistanıyım. Sana nasıl yardımcı olabilirim?",
                    "Aleyküm Selam  Kod dünyasına hoş geldin. Ne sormak istersin?"
                ]
            },
            not: {
                keywords: ["Not", "Not Hesaplayıcı", "not","not hesaplayıcı","nothesap"],
                answers: [
                    "Not Hesaplama Asistanına Buradan Ulaşabilirsiniz: <a href='nothasaplayici/index.html' class='text-[var(--accent1)] underline font-bold' '>Not Heaplayıcı</a>",
                ]
            },
            who: {
                keywords: ["kimsin", "isa kim", "isa ertem", "hakkında", "biyografi", "kendini tanıt", "özgeçmiş"],
                answers: [
                    "İsa Ertem, Sinop Üniversitesi'nde İnternet ve Ağ Teknolojileri okuyan, reklam ajansı deneyimine sahip bir Web Geliştirici ve UI/UX Tasarımcısıdır. Kodlamayı tasarım vizyonuyla birleştirir. Sinop/Ayancık'ta yaşamaktadır."
                ]
            },
            skills: {
                keywords: ["yetenek", "dil", "biliyor", "teknoloji", "kullandığı", "html", "css", "react", "js", "program", "photoshop", "figma", "yazılım"],
                answers: [
                    "İsa şu teknolojilerde yetkindir: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Bootstrap, PHP, Python, Java, C#, C++, Git ve Figma. Ayrıca Adobe Photoshop, Illustrator ve Premiere Pro kullanabiliyor."
                ]
            },
            projects: {
                keywords: ["proje", "yaptığı", "çalışma", "örnek", "portfolio", "referans", "neler yaptın"],
                answers: [
                    "İsa'nın öne çıkan projeleri: 1.<a href='nothasaplayici/index.html' class='text-[var(--accent1)] underline font-bold' '>Not Hesaplama Asistanı</a>  (JS & Tailwind). 2. Kurumsal Web Sitesi (SEO uyumlu). 3. Sosyal Medya Uygulaması (Firebase & Realtime). <br> Daha fazlası için <a href='#projects' class='text-[var(--accent1)] underline font-bold' onclick='document.getElementById(\"close-chat\").click()'>Projeler</a> bölümüne bakabilirsin."
                ]
            },
            contact: {
                keywords: ["iletişim", "mail", "email", "telefon", "ulaş", "adres", "nerede", "konum"],
                answers: [
                    "İsa'ya şu adresten ulaşabilirsin:<a href='mailto:isaertem27@gmail.com' target='_blank' class='text-[var(--accent1)] underline font-bold' '>isaertem27@gmail.com.</a>  Ayrıca <a href='https://www.linkedin.com/in/isaertem/' target='_blank' class='text-[var(--accent1)] underline font-bold' '>LinkedIn</a> ve <a href='https://www.instagram.com/isa_ertem1283/' target='_blank' class='text-[var(--accent1)] underline font-bold' '>Instagram</a>  üzerinden de iletişime geçebilirsin."
                ]
            },
            education: {
                keywords: ["okul", "eğitim", "üniversite", "lise", "mezun", "bölüm"],
                answers: [
                    "Üniversite: Sinop Üniversitesi - İnternet ve Ağ Teknolojileri (2020-2024). Lise: Hacı Sevim Yıldız-1 MTAL - Yazılım Geliştirme Bölüm."
                ]
            },
            serves: {
                keywords: ["hizmet", "iş", "freelance", "ne yapar", "neler yapıyorsun"],
                answers: [
                    "İsa, modern web siteleri, UI/UX tasarımı, frontend geliştirme, mobil uyumlu tasarımlar ve kurumsal kimlik çalışmaları yapmaktadır."
                ]
            },
            social: {
                keywords: ["github", "linkedin", "instagram", "sosyal", "hesap", "youtube"],
                answers: [
                    "Sosyal medya hesaplarına sitenin en altından (footer) veya İletişim sayfasından ulaşabilirsin. Sosyal Media <a href='https://github.com/isaertem' target='_blank' class='text-[var(--accent1)] underline font-bold' onclick='document.getElementById(\"close-chat\").click()'>GitHub</a>"
                ]
            },
            cv: {
                keywords: ["CV", "Download CV","cv"],
                answers: [
                 "CV'me buradan ulaşabilirsin :<a href='isa_ertem_cv.pdf' target='_blank' class='text-[var(--accent1)] underline font-bold' '>Download CV</a>"
        ]
    }
        };

        const chatBtn = document.getElementById('chat-btn');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatOptions = document.getElementById('chat-options');
        const settingsBtn = document.getElementById('chat-settings-btn');
        const settingsMenu = document.getElementById('chat-settings');
        const voiceToggle = document.getElementById('voice-toggle');

        chatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('scale-0', 'opacity-0');
            chatBtn.classList.add('scale-0', 'opacity-0'); 
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('scale-0', 'opacity-0');
            setTimeout(() => chatBtn.classList.remove('scale-0', 'opacity-0'), 300); 
            settingsMenu.classList.add('hidden'); 
            synthesis.cancel(); 
        });

        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.toggle('hidden');
        });

        voiceToggle.addEventListener('change', (e) => {
            isVoiceEnabled = e.target.checked;
            if(!isVoiceEnabled) synthesis.cancel();
        });

        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsMenu.classList.add('hidden');
            }
        });

        function handleChatSubmit(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';
                processBotResponse(message);
            }
        }

        function sendOption(option) {
            addMessage(option, 'user');
            processBotResponse(option);
        }

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.className = `chat-message chat-${sender}`;
            div.innerHTML = text;
            chatMessages.insertBefore(div, chatOptions);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function speakText(text) {
            if (!isVoiceEnabled) return;
            synthesis.cancel(); 
            const cleanText = text.replace(/<[^>]*>?/gm, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'tr-TR'; 
            utterance.rate = 1; 
            utterance.pitch = 1; 
            synthesis.speak(utterance);
        }

         function processBotResponse(input) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message chat-bot typing';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.insertBefore(typingDiv, chatOptions);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                typingDiv.remove();
                let response = null;
                const lowerInput = input.toLocaleLowerCase('tr-TR');

                for (const category in knowledgeBase) {
                    const data = knowledgeBase[category];
                    const match = data.keywords.some(keyword => lowerInput.includes(keyword));
                    if (match) {
                        const randomIndex = Math.floor(Math.random() * data.answers.length);
                        response = data.answers[randomIndex];
                        break;
                    }
                }

                if (!response) {
                    response = "Bunu tam anlayamadım. 🤖 İstersen bana 'projelerin neler?', 'iletişim bilgileri' veya 'hangi dilleri biliyorsun?' gibi sorular sorabilirsin.";
                }

                addMessage(response, 'bot');
                speakText(response); 
            }, 1000); 
        }