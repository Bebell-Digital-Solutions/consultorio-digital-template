document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle btn';
  navToggle.innerHTML = '<i class="ri-menu-line"></i>';
  navToggle.style.display = 'none';
  
  const navContainer = document.querySelector('.nav__container');
  navContainer.appendChild(navToggle);
  
  const navLinks = document.querySelector('.nav__links');
  
  navToggle.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Responsive behavior
  function handleResize() {
    if (window.innerWidth < 780) {
      navToggle.style.display = 'block';
      navLinks.style.display = 'none';
    } else {
      navToggle.style.display = 'none';
      navLinks.style.display = 'flex';
    }
  }
  
  // Initial check
  handleResize();
  
  // Add resize listener
  window.addEventListener('resize', handleResize);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth < 780) {
          navLinks.style.display = 'none';
        }
      }
    });
  });
  
  // Doctor carousel functionality
  const doctorsGrid = document.querySelector('.doctors__grid');
  const doctorCards = document.querySelectorAll('.doctors__card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (doctorsGrid && prevBtn && nextBtn && doctorCards.length > 0) {
    let currentIndex = 0;
    
    function getCardsPerView() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    }
    
    function scrollToCard(index) {
      const cardsPerView = getCardsPerView();
      currentIndex = Math.max(0, Math.min(index, doctorCards.length - cardsPerView));
      
      const cardWidth = doctorCards[0].offsetWidth + 32; // width + gap
      doctorsGrid.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
      
      updateButtonStates();
    }
    
    function updateButtonStates() {
      const cardsPerView = getCardsPerView();
      prevBtn.classList.toggle('disabled', currentIndex === 0);
      nextBtn.classList.toggle('disabled', currentIndex >= doctorCards.length - cardsPerView);
    }
    
    prevBtn.addEventListener('click', () => {
      scrollToCard(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
      scrollToCard(currentIndex + 1);
    });
    
    // Handle window resize
    function handleResize() {
      scrollToCard(currentIndex); // Re-center on current index
    }
    
    // Initialize
    updateButtonStates();
    window.addEventListener('resize', handleResize);
    
    // Disable smooth scroll when resizing to prevent lag
    let resizeTimer;
    window.addEventListener('resize', () => {
      doctorsGrid.style.scrollBehavior = 'auto';
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        doctorsGrid.style.scrollBehavior = 'smooth';
      }, 100);
    });
  }
  
  // Form submission handling
  const bookingForm = document.querySelector('.header__form form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const firstName = this.querySelector('input[placeholder="Nombre"]').value;
      const lastName = this.querySelector('input[placeholder="Apellido"]').value;
      
      // Simple validation
      if (!firstName || !lastName) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }
      
      alert(`¡Gracias, ${firstName} ${lastName}! Su solicitud de cita ha sido recibida. Nos comunicaremos con usted pronto.`);
      
      // Reset form
      this.reset();
    });
  }
  
  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service__card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '5px 5px 20px rgba(0, 0, 0, 0.1)';
    });
  });
});
