        let isVoiceEnabled = false; 
        const synthesis = window.speechSynthesis;
        const knowledgeBase = {
    greetings: {
        keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "how are you", "what's up"],
        answers: [
            "Hello! I'm Isa's digital assistant. I can answer questions about web development, projects, or Isa. 👋",
            "Greetings! Welcome to Isa's portfolio. How can I help you? 😊",
            "Hello! Welcome to the world of code. What would you like to ask?"
        ]
    },
    who: {
        keywords: ["who are you", "who is isa", "isa ertem", "about", "biography", "intro", "resume"],
        answers: [
            "Isa Ertem is a Web Developer and UI/UX Designer studying Internet and Network Technologies at Sinop University, with advertising agency experience. He combines coding with design vision. He lives in Ayancık/Sinop."
        ]
    },
    not: {
        keywords: ["notes", "Grade Calculator", "notes","grade calculator","notaccount"],
        answers: [
             "You can access the Grade Calculation Assistant here: <a href='nothasaplayici/index.html' class='text-[var(--accent1)] underline font-bold' '>Grade Calculator</a>",
        ]
    },
    skills: {
        keywords: ["skills", "languages", "knows", "technology", "stack", "html", "css", "react", "js", "program", "photoshop", "figma", "software"],
        answers: [
            "Isa is proficient in the following technologies: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Bootstrap, PHP, Python, Java, C#, C++, Git, and Figma. He can also use Adobe Photoshop, Illustrator, and Premiere Pro."
        ]
    },
    projects: {
        keywords: ["projects", "works", "portfolio", "examples", "references", "what did you do"],
        answers: [
            "Isa's featured projects: 1. Grade Calculation Assistant (JS & Tailwind). 2. Corporate Website (SEO compatible). 3. Social Media App (Firebase & Realtime). <br> For more, you can check the <a href='index-en.html#projects' class='text-[var(--accent1)] underline font-bold' onclick='document.getElementById(\"close-chat\").click()'>Projects</a> section."
        ]
    },
    contact: {
        keywords: ["contact", "mail", "email", "phone", "reach", "address", "location", "where"],
        answers: [
            "You can reach Isa at: isaertem27@gmail.com.You can also contact him via  <a href='https://www.linkedin.com/in/isaertem/' target='_blank' class='text-[var(--accent1)] underline font-bold' '>LinkedIn</a> and <a href='https://www.instagram.com/isa_ertem1283/' target='_blank' class='text-[var(--accent1)] underline font-bold' '>Instagram</a>"
        ]
    },
    education: {
        keywords: ["school", "education", "university", "high school", "graduate", "department", "college"],
        answers: [
            "University: Sinop University - Internet and Network Technologies (2020-2024). High School: Hacı Sevim Yıldız-1 MTAL - Science Department."
        ]
    },
    services: {
        keywords: ["services", "job", "freelance", "what does he do", "offer"],
        answers: [
            "Isa provides modern website creation, UI/UX design, frontend development, mobile-compatible designs, and corporate identity works."
        ]
    },
    social: {
        keywords: ["github", "linkedin", "instagram", "social", "media", "account", "youtube"],
        answers: [
            "You can find his social media accounts at the bottom of the site (footer) or on the Contact page. Social Media: <a href='https://github.com/isaertem' target='_blank' class='text-[var(--accent1)] underline font-bold' onclick='document.getElementById(\"close-chat\").click()'>GitHub</a>"
        ]
    },
    cv: {
        keywords: ["CV", "Download CV","cv"],
        answers: [
            "You can access my CV here: <a href='isa_ertem_cv-en.pdf' target='_blank' class='text-[var(--accent1)] underline font-bold' '>Download CV</a>"
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
            utterance.lang = 'en-EN'; 
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
                const lowerInput = input.toLowerCase();

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