  /* ── Navbar scroll state ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconMenu   = document.getElementById('icon-menu');
  const iconClose  = document.getElementById('icon-close');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    iconMenu.style.display  = open ? 'none'  : 'block';
    iconClose.style.display = open ? 'block' : 'none';
  });

  /* Close mobile menu when a link is clicked */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      iconMenu.style.display  = 'block';
      iconClose.style.display = 'none';
    });
  });

  /* ── Scroll-reveal via IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ── Contact form ── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents the page from reloading
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Send the form data using EmailJS
  // Arguments: ('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_TEMPLATE_ID', this)
  emailjs.sendForm('service_udei3cf', 'template_74kx6mq', form)
    .then(() => {
      // Success! Trigger your existing animations
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.classList.add('visible');
      }, 1200);
    }, (error) => {
      // Handle errors smoothly
      alert("Oops! Something went wrong while sending your message. Please try again.");
      console.log('EmailJS Error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});
  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }); 
  });
const resetFormBtn = document.getElementById('resetFormBtn');

if (resetFormBtn) {
  resetFormBtn.addEventListener('click', () => {
    // 1. Reset all the input text fields inside the form
    form.reset();

    // 2. Clear any disabled state or loading text on the submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';

    // 3. Hide the success message container
    formSuccess.classList.remove('visible');

    // 4. Bring back the original form visibility
    form.style.display = 'block'; // or 'flex' depending on your CSS layout
  });
}
  
