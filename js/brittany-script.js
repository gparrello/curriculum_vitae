// ===== BRITTANY CHIANG EXACT REPLICATION JAVASCRIPT =====

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== NAVIGATION =====
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section[id]');
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth scrolling for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== JOBS TABS =====
  const jobTabs = document.querySelectorAll('.jobs__tab');
  const jobPanels = document.querySelectorAll('.jobs__panel');
  
  jobTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and panels
      jobTabs.forEach(t => t.classList.remove('active'));
      jobPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
  
  // ===== SCROLL EVENTS =====
  let ticking = false;
  
  function handleScroll() {
    updateActiveNavLink();
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe sections for animations
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // ===== MOBILE MENU (if needed) =====
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // ===== THEME TOGGLE (if needed) =====
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }
  
  // ===== COPY TO CLIPBOARD (for email) =====
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Let the default mailto behavior happen
      // Could add copy to clipboard functionality here if needed
    });
  });
  
  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      if (mobileMenuButton) {
        mobileMenuButton.classList.remove('active');
      }
    }
  });
  
  // ===== FOCUS MANAGEMENT =====
  // Skip to content functionality
  const skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  }
  
  // ===== PERFORMANCE OPTIMIZATIONS =====
  // Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Handle resize events here if needed
    }, 250);
  });
  
  // ===== ACCESSIBILITY IMPROVEMENTS =====
  // Add focus indicators for keyboard navigation
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--green)';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = 'none';
      this.style.outlineOffset = '0';
    });
  });
  
  // ===== INITIALIZATION =====
  // Set initial active nav link
  updateActiveNavLink();
  
  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
  
  console.log('Brittany Chiang website replication loaded successfully!');
});

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ===== EXTERNAL LINKS =====
// Add target="_blank" and rel="noopener noreferrer" to external links
document.addEventListener('DOMContentLoaded', function() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(link => {
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

// ===== ANALYTICS =====
// Track outbound links
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.hostname !== window.location.hostname) {
    // Track external link clicks
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'outbound',
        event_label: link.href,
        transport_type: 'beacon'
      });
    }
  }
});