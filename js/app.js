// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // — Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  // — Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (pageYOffset >= top) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').substring(1) === current) {
        a.classList.add('active');
      }
    });
  });

  // — Project Filtering
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = filter === 'all' || card.dataset.category === filter
          ? 'block' : 'none';
      });
    });
  });

  // — Contact Form (placeholder)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // integrate your form service here
      alert('Form submitted! (hook up your service endpoint)');
      contactForm.reset();
    });
  }

  // — Neon Intro Screen: fade out after 3 s
  const intro = document.getElementById('intro');
  setTimeout(() => {
    intro.style.transition = 'opacity 1s ease';
    intro.style.opacity = '0';
    setTimeout(() => intro.style.display = 'none', 1000);
  }, 3000);

  // — Role Word Animation: cycle and glow
  const words = ['Software Developer','Student'];
  let idx = 0;
  const roleEl = document.getElementById('role-word');
  setInterval(() => {
    // add glow outline
    const p = roleEl.parentNode;
    p.classList.add('neon-outline');
    setTimeout(() => {
      // switch word and remove glow
      idx = (idx + 1) % words.length;
      roleEl.textContent = words[idx];
      p.classList.remove('neon-outline');
    }, 2000);
  }, 4000);

});
