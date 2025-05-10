// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D Background
    initThreeJSBackground();

    // Loader Animation
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible'; // Enable scrolling
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') &&
            !e.target.closest('.nav-links') &&
            !e.target.closest('.menu-btn')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Run once on load

    // Project Filtering with Animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Get filter value
                const filter = btn.dataset.filter;

                // Filter projects with animation
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0';

                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.transform = 'scale(1)';
                                card.style.opacity = '1';
                            }, 50);
                        }, 300);
                    } else {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0';

                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Skills Tab Functionality
    const skillCategories = document.querySelectorAll('.category');
    const skillContainers = document.querySelectorAll('.skills-container');

    if (skillCategories.length && skillContainers.length) {
        skillCategories.forEach(category => {
            category.addEventListener('click', () => {
                // Update active category
                skillCategories.forEach(c => c.classList.remove('active'));
                category.classList.add('active');

                // Show relevant skills
                const targetCategory = category.dataset.category;
                skillContainers.forEach(container => {
                    container.classList.remove('active');
                    if (container.classList.contains(`${targetCategory}-skills`)) {
                        container.classList.add('active');
                    }
                });
            });
        });
    }

    // Animate skill bars on scroll
    const skillSection = document.querySelector('#skills');
    const skillLevels = document.querySelectorAll('.skill-level');

    if (skillSection && skillLevels.length) {
        const animateSkills = () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos) {
                skillLevels.forEach(level => {
                    level.style.width = level.parentElement.dataset.level || '0%';
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };

        window.addEventListener('scroll', animateSkills);
        animateSkills(); // Run once on load
    }

    // Contact Form with validation and AJAX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // Basic form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) {
                showFormMessage('Please fill all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Display sending state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate AJAX request (replace with actual API endpoint)
            setTimeout(() => {
                showFormMessage('Your message has been sent successfully!', 'success');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });

        function showFormMessage(message, type) {
            let messageEl = document.querySelector('.form-message');

            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'form-message';
                contactForm.appendChild(messageEl);
            }

            messageEl.textContent = message;
            messageEl.className = `form-message ${type}`;

            setTimeout(() => {
                messageEl.style.opacity = '0';
                setTimeout(() => {
                    messageEl.remove();
                }, 500);
            }, 3000);
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // Neon Intro Screen: fade out after animation
    const intro = document.getElementById('intro');
    if (intro) {
        setTimeout(() => {
            intro.style.transition = 'opacity 1s ease';
            intro.style.opacity = '0';
            setTimeout(() => {
                intro.style.display = 'none';
                document.body.style.overflow = 'visible'; // Enable scrolling
            }, 1000);
        }, 3000);
    }

    // Role Word Animation with typewriter effect
    const words = ['Software Developer', 'UI/UX Designer', 'Problem Solver', 'Student'];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWordTyping = true;
    const roleElement = document.getElementById('role-word');

    if (roleElement) {
        // Only disable scrolling if intro element exists
        const introElement = document.getElementById('intro');
        if (introElement) {
            document.body.style.overflow = 'hidden'; // Disable scrolling during intro
        }
    
        const typeWriter = () => {
            const currentWord = words[wordIndex];
    
            if (currentWordTyping) {
                // Typing out the word
                if (letterIndex < currentWord.length) {
                    roleElement.textContent = currentWord.substring(0, letterIndex + 1);
                    letterIndex++;
                } else {
                    currentWordTyping = false;
                    setTimeout(typeWriter, 1500); // Pause at the end of word
                    return;
                }
            } else {
                // Deleting the word
                if (letterIndex > 0) {
                    roleElement.textContent = currentWord.substring(0, letterIndex - 1);
                    letterIndex--;
                } else {
                    currentWordTyping = true;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
    
            // Add glow effect when word is complete
            if (letterIndex === currentWord.length && roleElement.parentNode) {
                roleElement.parentNode.classList.add('neon-outline');
            } else if (roleElement.parentNode) {
                roleElement.parentNode.classList.remove('neon-outline');
            }
    
            // Adjust speed for typing vs. deleting
            const speed = currentWordTyping ? Math.random() * 100 + 100 : 50;
            setTimeout(typeWriter, speed);
        };
    
        setTimeout(() => {
            typeWriter();
        }, 2000);
    }

    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });

        // Staggered children animations
        const staggerParents = document.querySelectorAll('.stagger-children');
        staggerParents.forEach(parent => {
            const parentPosition = parent.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (parentPosition < windowHeight - 100) {
                parent.classList.add('animated');
            }
        });
    });

    // Initialize project image hover effects
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(image => {
        const overlay = image.querySelector('.project-overlay');
        if (overlay) {
            image.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });

            image.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Add terminal effect to About section
    const aboutText = document.querySelector('.about-text p:first-child');
    if (aboutText) {
        const originalText = aboutText.textContent;
        aboutText.innerHTML = '';
        let i = 0;

        function terminalEffect() {
            if (i < originalText.length) {
                aboutText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(terminalEffect, Math.random() * 20 + 10);
            } else {
                // Add blinking cursor at the end
                aboutText.innerHTML += '<span class="terminal-cursor"></span>';
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    terminalEffect();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutText);
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'all';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });
    }

    // Lazy Load Images
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        // Add active class to first testimonial
        testimonials[0].classList.add('active');
        
        function showNextTestimonial() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
        
        setInterval(showNextTestimonial, 5000);
    }
});

// Three.js 3D Background
function initThreeJSBackground() {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('background-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;

    // Create positions array
    const positions = new Float32Array(particleCount * 3);

    // Fill positions array with random values
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20; // x
        positions[i + 1] = (Math.random() - 0.5) * 20; // y
        positions[i + 2] = (Math.random() - 0.5) * 20; // z
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06,
        color: 0x00ff41, // Neon green
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create lines connecting particles
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff41,
        transparent: true,
        opacity: 0.2
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];

    // Create lines between nearby particles
    for (let i = 0; i < particleCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
            const x2 = positions[j * 3];
            const y2 = positions[j * 3 + 1];
            const z2 = positions[j * 3 + 2];

            const dist = Math.sqrt(
                Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2) +
                Math.pow(z2 - z1, 2)
            );

            // Only create lines between particles that are close to each other
            if (dist < 1.5) {
                linePositions.push(x1, y1, z1);
                linePositions.push(x2, y2, z2);
            }
        }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Create floating geometric objects
    const geometries = [
        new THREE.TetrahedronGeometry(0.7),
        new THREE.OctahedronGeometry(0.7),
        new THREE.IcosahedronGeometry(0.7)
    ];

    const floatingObjects = [];

    for (let i = 0; i < 8; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff41,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const object = new THREE.Mesh(geometry, material);

        // Position objects far from center
        object.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );

        // Random rotation
        object.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        // Store rotation and floating speed
        object.userData = {
            rotationSpeed: {
                x: Math.random() * 0.01 - 0.005,
                y: Math.random() * 0.01 - 0.005,
                z: Math.random() * 0.01 - 0.005
            },
            floatSpeed: Math.random() * 0.005 + 0.002
        };

        floatingObjects.push(object);
        scene.add(object);
    }

    // Create grid for visual effect
    const gridHelper = new THREE.GridHelper(20, 40, 0x00ff41, 0x00ff41);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.1;
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        // Mouse influence on particles
        particles.rotation.x += mouseY * 0.001;
        particles.rotation.y += mouseX * 0.001;

        // Rotate grid
        gridHelper.rotation.y += 0.001;

        // Animate floating objects
        floatingObjects.forEach(obj => {
            obj.rotation.x += obj.userData.rotationSpeed.x;
            obj.rotation.y += obj.userData.rotationSpeed.y;
            obj.rotation.z += obj.userData.rotationSpeed.z;

            // Gentle floating movement based on sine wave
            obj.position.y += Math.sin(Date.now() * obj.userData.floatSpeed) * 0.01;
        });

        // Render scene
        renderer.render(scene, camera);
    }

    animate();
}

