// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Akatsuki-themed Background
    initAkatsukiBackground();
    createAkatsukiClouds();
    
    // Loader Animation with Akatsuki Emblem
    const loader = document.getElementById('loader');
    const logoMask = document.getElementById('logo-mask');
    const loadingPercentage = document.querySelector('.loading-percentage');

    if (loader && logoMask && loadingPercentage) {
        let progress = 0;
        
        // Simulate loading progress
        const interval = setInterval(() => {
            progress += Math.random() * 2; // Random increment for more natural loading
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show intro screen with quote
                setTimeout(() => {
                    loader.style.transition = 'opacity 0.8s ease';
                    loader.style.opacity = '0';
                    
                    setTimeout(() => {
                        loader.style.display = 'none';
                        
                        // Show the quote
                        const intro = document.getElementById('intro');
                        const quoteContainer = document.querySelector('.quote-container');
                        
                        if (intro && quoteContainer) {
                            quoteContainer.classList.add('show');
                            
                            // After showing the quote, fade it out
                            setTimeout(() => {
                                intro.style.transition = 'opacity 1s ease';
                                intro.style.opacity = '0';
                                
                                setTimeout(() => {
                                    intro.style.display = 'none';
                                    document.body.style.overflow = 'visible'; // Enable scrolling
                                }, 1000);
                            }, 4000); // Show quote for 4 seconds
                        }
                    }, 800);
                }, 500); // Small delay after reaching 100%
            }
            
            // Update the progress by revealing the image from bottom to top
            logoMask.style.height = `${100 - progress}%`;
            loadingPercentage.textContent = `${Math.round(progress)}%`;
        }, 50);
    }

    // Mobile Menu Toggle with advanced animation
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Reset and apply animation delays to list items
            const navItems = navLinks.querySelectorAll('li');
            navItems.forEach((item, index) => {
                item.style.setProperty('--i', index);
                if (navLinks.classList.contains('active')) {
                    item.style.transitionDelay = `${0.1 * index}s`;
                } else {
                    item.style.transitionDelay = `${0.1 * (navItems.length - index - 1)}s`;
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') &&
            !e.target.closest('.nav-links') &&
            !e.target.closest('.menu-btn')) {
            navLinks.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('active');
        }
    });

    // Header scroll effect with glow
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

    // Skills Tab Functionality with Akatsuki red indicator
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

    // Animate skill bars on scroll with Akatsuki effect
    const skillSection = document.querySelector('#skills');
    const skillLevels = document.querySelectorAll('.skill-level');

    if (skillSection && skillLevels.length) {
        const animateSkills = () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos) {
                skillLevels.forEach(level => {
                    const targetWidth = level.parentElement.dataset.level || '0%';
                    level.style.width = targetWidth;
                    level.style.boxShadow = '0 0 10px rgba(220, 20, 60, 0.6), 0 0 20px rgba(220, 20, 60, 0.3)';
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };

        window.addEventListener('scroll', animateSkills);
        animateSkills(); // Run once on load
    }

    // Role Word Animation with typewriter effect
    const words = ['Software Developer', 'UI/UX Designer', 'Problem Solver', 'Elite Shinobi'];
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
                    setTimeout(typeWriter, 50);
                } else {
                    currentWordTyping = false;
                    setTimeout(typeWriter, 1500); // Pause at the end of word
                }
            } else {
                // Erasing the word
                if (letterIndex > 0) {
                    roleElement.textContent = currentWord.substring(0, letterIndex - 1);
                    letterIndex--;
                    setTimeout(typeWriter, 30);
                } else {
                    currentWordTyping = true;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(typeWriter, 500); // Pause before typing next word
                }
            }
        };
    
        setTimeout(typeWriter, 1000); // Start after a delay
    }

    // Create floating Akatsuki clouds
    function createAkatsukiClouds() {
        const cloudCount = 10;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'akatsuki-cloud';
            
            // Random size between 50px and 150px
            const size = Math.random() * 100 + 50;
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size}px`;
            
            // Random position
            cloud.style.left = `${Math.random() * 100}vw`;
            cloud.style.top = `${Math.random() * 100}vh`;
            
            // Random animation duration between 20 and 40 seconds
            const duration = Math.random() * 20 + 20;
            cloud.style.animation = `float ${duration}s infinite linear`;
            
            // Random delay
            cloud.style.animationDelay = `${Math.random() * 20}s`;
            
            document.body.appendChild(cloud);
        }
    }

    // Initialize the Akatsuki-themed background
    function initAkatsukiBackground() {
        const canvas = document.getElementById('background-canvas');
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 20;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xff0000, 0.1);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xff0000, 0.5);
        directionalLight.position.set(0, 10, 5);
        scene.add(directionalLight);

        // Create particles for background
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            color: 0xff0000
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        // Add floating Akatsuki rings
        const ringGeometry = new THREE.TorusGeometry(5, 0.2, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        scene.add(ring);
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Rotate rings
            ring.rotation.x += 0.01;
            ring.rotation.y += 0.01;
            
            // Slightly move particles
            particleSystem.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        };
        
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});