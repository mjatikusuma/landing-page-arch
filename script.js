document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // STICKY NAVBAR
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileToggle.querySelector('.menu-icon');
    const closeIcon = mobileToggle.querySelector('.close-icon');
    
    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        
        if (isActive) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = ''; // Resume scrolling
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // PORTFOLIO FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    // Show item
                    card.style.display = 'flex';
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                } else {
                    // Hide item
                    card.classList.remove('fade-in');
                    card.classList.add('fade-out');
                    // Wait for fade-out animation to complete, then hide
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly to feel more organic
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // CONTACT FORM INQUIRY SUBMISSION (SIMULATED)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set loading state
            const currentLang = localStorage.getItem('lang') || 'en';
            formSubmitBtn.disabled = true;
            const loadingText = currentLang === 'id' ? 'Mengirim...' : 'Sending...';
            formSubmitBtn.innerHTML = `${loadingText} <i data-lucide="loader-2" class="btn-icon animate-spin"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;

            // FormSubmit JSON Payload
            const payload = {
                name: name,
                email: email,
                "Project Type": projectType,
                message: message,
                _subject: "New Portfolio Inquiry from " + name
            };

            fetch("https://formsubmit.co/ajax/muhammmadjatikusuma.work@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                // Success feedback
                formFeedback.classList.remove('hidden', 'success', 'error');
                formFeedback.classList.add('success');
                
                if (currentLang === 'id') {
                    formFeedback.innerHTML = `<strong>Terima kasih, ${name}!</strong> Pesan Anda telah berhasil dikirim. Saya akan meninjau detailnya dan menghubungi Anda kembali dalam waktu 24 jam.`;
                } else {
                    formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been sent successfully. I will review your brief and contact you within 24 hours.`;
                }
                
                // Reset submit button and form
                formSubmitBtn.disabled = false;
                const buttonText = currentLang === 'id' ? 'Kirim Pesan' : 'Send Inquiry';
                formSubmitBtn.innerHTML = `${buttonText} <i data-lucide="send" class="btn-icon"></i>`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                
                contactForm.reset();

                // Reset floating labels (by making inputs look placeholder empty)
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.blur();
                });

                // Auto hide feedback after 8 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 8000);
            })
            .catch(err => {
                console.error(err);
                // Error feedback
                formFeedback.classList.remove('hidden', 'success', 'error');
                formFeedback.classList.add('error');
                
                if (currentLang === 'id') {
                    formFeedback.innerHTML = `<strong>Oops!</strong> Gagal mengirim pesan. Silakan coba lagi atau kirim email langsung ke muhammmadjatikusuma.work@gmail.com.`;
                } else {
                    formFeedback.innerHTML = `<strong>Oops!</strong> Failed to send. Please try again or email me directly at muhammmadjatikusuma.work@gmail.com.`;
                }
                
                // Reset submit button
                formSubmitBtn.disabled = false;
                const buttonText = currentLang === 'id' ? 'Kirim Pesan' : 'Send Inquiry';
                formSubmitBtn.innerHTML = `${buttonText} <i data-lucide="send" class="btn-icon"></i>`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });
    }

    // ==========================================================================
    // NEWSLETTER FORM SUBMISSION (SIMULATED)
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const email = input.value;

            // Success feedback
            alert(`Successfully subscribed: ${email}. Thank you for joining our architectural newsletter!`);
            
            newsletterForm.reset();
        });
    }

    // ==========================================================================
    // HERO & NEXT PROJECT SLIDESHOWS (SYNCHRONIZED & ALTERNATED)
    // ==========================================================================
    const heroSlideshow = document.getElementById('hero-slideshow');
    const projectSlideshow = document.getElementById('next-project-slideshow');
    
    if (heroSlideshow && projectSlideshow) {
        const heroSlides = heroSlideshow.querySelectorAll('.hero-slide');
        const projectSlides = projectSlideshow.querySelectorAll('.slide');
        
        let currentSlide = 0; // Index of active hero slide

        setInterval(() => {
            // Deactivate current active slides
            heroSlides[currentSlide].classList.remove('active');
            
            // Next project is always (currentSlide + 1) % length
            const nextSlide = (currentSlide + 1) % heroSlides.length;
            projectSlides[nextSlide].classList.remove('active');

            // Move to next slide index for hero
            currentSlide = nextSlide;
            
            // Activate new slides
            heroSlides[currentSlide].classList.add('active');
            
            const nextActiveSlide = (currentSlide + 1) % heroSlides.length;
            projectSlides[nextActiveSlide].classList.add('active');
        }, 5000); // Transition every 5 seconds
    }

    // Add extra spin class to loader icon dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);

    // ==========================================================================
    // MULTI-LANGUAGE SYSTEM (ENGLISH / INDONESIAN)
    // ==========================================================================
    const translations = {
        en: {
            "nav-about": "About",
            "nav-experience": "Experience",
            "nav-education": "Education",
            "nav-projects": "Projects",
            "nav-btn-chat": "Let's Chat",
            "hero-description": "I am a passionate architectural and interior designer dedicated to crafting minimalist, functional, and enduring spatial experiences.",
            "hero-btn-explore": "Explore Projects",
            "hero-btn-about": "About Me",
            "hero-next-proj": "Next Project",
            "about-hdr": "About",
            "about-bio-text": "I am an Architecture graduate from Universitas Sriwijaya with professional experience in architectural design, spatial planning, and interior detailing. My work spans public infrastructure, healthcare clinics, and educational spaces.",
            "about-services-hdr": "Services",
            "about-service-1": "Architectural Design",
            "about-service-2": "Interior Design",
            "about-service-3": "3D Modeling & Visualization",
            "about-service-4": "DED (Detail Engineering Design) Drafting",
            "about-location-hdr": "Location",
            "about-location-text": "Indonesia but travel everywhere.",
            "exp-sub-hdr": "Timeline",
            "exp-title-hdr": "Experience",
            "exp-date-1": "May 2026 – Present",
            "exp-role-1": "Junior Architect",
            "exp-desc-1": "Developing conceptual designs, creating 3D models and rendering visualizations, and drafting interior DED (Detail Engineering Design) drawings.",
            "exp-role-2": "Junior Architect",
            "exp-company-2": "Independent Consultant Architect",
            "exp-desc-2": "Conducted surveys, site analyses, developed DED drawings, and processed technical administrations for PBG and SLF building permits.",
            "exp-role-3": "Junior Architect",
            "exp-desc-3": "Developed conceptual designs, created 3D models, rendering, and animations for client presentations, and drafted DED construction drawings.",
            "exp-role-4": "Architectural Technical Staff",
            "exp-desc-4": "Developed initial design layouts, created moodboards, produced 3D visualization renders, and coordinated with structural and MEP teams to ensure design integrity.",
            "edu-sub-hdr": "Qualifications",
            "edu-title-hdr": "Education & Credentials",
            "edu-degree-1": "Bachelor's Degree in Architecture Engineering",
            "edu-degree-2": "Ahli Muda Desain Interior",
            "edu-degree-3": "Ahli Muda Teknik Bangunan Gedung",
            "edu-degree-4": "Building Information Modeling (BIM) Arsitektur",
            "proj-sub-hdr": "Portfolio",
            "proj-title-hdr": "Selected Projects",
            "proj-filter-all": "All Projects",
            "proj-filter-infra": "Infrastructure",
            "proj-filter-interior": "Interior",
            "proj-cat-interior": "Interior",
            "proj-cat-infra": "Infrastructure",
            "proj-loc-1": "Palembang, Indonesia — 2026",
            "proj-loc-2": "Bogor, Indonesia — 2026",
            "contact-sub-hdr": "Let's Connect",
            "contact-title-hdr": "Ready to build your masterpiece?",
            "contact-desc": "Whether you want to commission a residential project, discuss a commercial masterplan, or ask a simple question, we'd love to hear from you.",
            "contact-lbl-name": "Your Name",
            "contact-lbl-email": "Email Address",
            "contact-lbl-brief": "Project Brief & Details",
            "contact-opt-default": "Project Type",
            "contact-opt-res": "Residential Design",
            "contact-opt-com": "Commercial / Public",
            "contact-opt-int": "Interior Styling",
            "contact-opt-other": "Other Inquiry",
            "contact-btn-send": "Send Inquiry",
            "footer-copyright": "All content Copyright © 2026 Muhammad Jati Kusuma"
        },
        id: {
            "nav-about": "About",
            "nav-experience": "Experience",
            "nav-education": "Education",
            "nav-projects": "Projects",
            "nav-btn-chat": "Let's Chat",
            "hero-description": "Saya adalah perancang arsitektur dan interior yang berdedikasi untuk menciptakan pengalaman spasial yang minimalis, fungsional, dan abadi.",
            "hero-btn-explore": "Explore Projects",
            "hero-btn-about": "About Me",
            "hero-next-proj": "Next Project",
            "about-hdr": "About",
            "about-bio-text": "Saya adalah lulusan Teknik Arsitektur dari Universitas Sriwijaya dengan pengalaman profesional dalam desain arsitektur, perencanaan tata ruang, dan detail interior. Karya saya mencakup infrastruktur publik, klinik kesehatan, dan ruang pendidikan.",
            "about-services-hdr": "Services",
            "about-service-1": "Desain Arsitektur",
            "about-service-2": "Desain Interior",
            "about-service-3": "Pemodelan 3D & Visualisasi",
            "about-service-4": "Penyusunan Gambar Kerja (DED)",
            "about-location-hdr": "Location",
            "about-location-text": "Indonesia, bersedia bekerja di mana saja.",
            "exp-sub-hdr": "Timeline",
            "exp-title-hdr": "Experience",
            "exp-date-1": "Mei 2026 – Sekarang",
            "exp-role-1": "Junior Architect",
            "exp-desc-1": "Mengembangkan desain konseptual, membuat model 3D dan rendering visualisasi, serta menyusun gambar kerja detail (DED) interior.",
            "exp-role-2": "Junior Architect",
            "exp-company-2": "Arsitek Konsultan Independen",
            "exp-desc-2": "Melakukan survei, analisis tapak, menyusun gambar kerja DED, dan mengurus administrasi teknis untuk perizinan bangunan gedung PBG dan SLF.",
            "exp-role-3": "Junior Architect",
            "exp-desc-3": "Mengembangkan desain konseptual, membuat model 3D, rendering, dan animasi untuk presentasi klien, serta menyusun gambar konstruksi DED.",
            "exp-role-4": "Architectural Technical Staff",
            "exp-desc-4": "Mengembangkan tata letak desain awal, membuat moodboard, memproduksi rendering visualisasi 3D, dan berkoordinasi dengan tim struktur serta MEP untuk memastikan integritas desain.",
            "edu-sub-hdr": "Qualifications",
            "edu-title-hdr": "Education & Credentials",
            "edu-degree-1": "Sarjana Teknik Arsitektur",
            "edu-degree-2": "Ahli Muda Desain Interior",
            "edu-degree-3": "Ahli Muda Teknik Bangunan Gedung",
            "edu-degree-4": "BIM (Building Information Modeling) Arsitektur",
            "proj-sub-hdr": "Portfolio",
            "proj-title-hdr": "Selected Projects",
            "proj-filter-all": "All Projects",
            "proj-filter-infra": "Infrastructure",
            "proj-filter-interior": "Interior",
            "proj-cat-interior": "Interior",
            "proj-cat-infra": "Infrastructure",
            "proj-loc-1": "Palembang, Indonesia — 2026",
            "proj-loc-2": "Bogor, Indonesia — 2026",
            "contact-sub-hdr": "Let's Connect",
            "contact-title-hdr": "Ready to build your masterpiece?",
            "contact-desc": "Apakah Anda ingin memesan desain rumah tinggal, mendiskusikan masterplan komersial, atau mengajukan pertanyaan sederhana, kami akan dengan senang hati mendengarnya.",
            "contact-lbl-name": "Your Name",
            "contact-lbl-email": "Email Address",
            "contact-lbl-brief": "Project Brief & Details",
            "contact-opt-default": "Project Type",
            "contact-opt-res": "Residential Design",
            "contact-opt-com": "Commercial / Public",
            "contact-opt-int": "Interior Styling",
            "contact-opt-other": "Other Inquiry",
            "contact-btn-send": "Send Inquiry",
            "footer-copyright": "Semua konten Hak Cipta © 2026 Muhammad Jati Kusuma"
        }
    };

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'OPTION') {
                    el.textContent = translations[lang][key];
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        // Update language label
        const langLabel = document.getElementById('lang-label');
        if (langLabel) {
            langLabel.textContent = lang.toUpperCase();
        }

        // Save selection
        localStorage.setItem('lang', lang);
        
        // Trigger inline typing scripts if defined
        if (typeof window.changeTypingLanguage === 'function') {
            window.changeTypingLanguage(lang);
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'en';
            const nextLang = currentLang === 'en' ? 'id' : 'en';
            updateLanguage(nextLang);
        });
    }

    // Initialize Language on load
    const savedLang = localStorage.getItem('lang') || 'en';
    updateLanguage(savedLang);


    // ==========================================================================
    // THEME SWITCHER SYSTEM (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-light');
    const moonIcon = document.querySelector('.theme-icon-dark');

    const updateTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (sunIcon && moonIcon) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        } else {
            document.documentElement.classList.remove('light-theme');
            if (sunIcon && moonIcon) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            updateTheme(nextTheme);
        });
    }

    // Initialize Theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    updateTheme(savedTheme);

});
