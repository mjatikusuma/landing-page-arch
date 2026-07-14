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
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = `Sending... <i data-lucide="loader-2" class="btn-icon animate-spin"></i>`;
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
                formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been sent successfully. I will review your brief and contact you within 24 hours.`;
                
                // Reset submit button and form
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = `Send Inquiry <i data-lucide="send" class="btn-icon"></i>`;
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
                formFeedback.innerHTML = `<strong>Oops!</strong> Failed to send. Please try again or email me directly at muhammmadjatikusuma.work@gmail.com.`;
                
                // Reset submit button
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = `Send Inquiry <i data-lucide="send" class="btn-icon"></i>`;
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
});
