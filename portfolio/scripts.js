document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor with advanced effects
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Smooth cursor following
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Use requestAnimationFrame for smoother cursor movement
  function animateCursor() {
    // Add smooth interpolation for cursor movement
    const speed = 0.1; // Adjust for faster/slower following
    
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorBlur.style.left = cursorX + 'px';
    cursorBlur.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Advanced cursor effects on hoverable elements
  const hoverElements = document.querySelectorAll('.nav-item, .social-link, .project-card, .skill-card, .contact-item, .theme-toggle, .music-button, .profile-image, a, button');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('active-cursor');
      cursorBlur.style.height = '300px';
      cursorBlur.style.width = '300px';
      cursorBlur.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('active-cursor');
      cursorBlur.style.height = '400px';
      cursorBlur.style.width = '400px';
      cursorBlur.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
    });
  });
  
  // Click effect animations
  document.addEventListener('click', function() {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = mouseX + 'px';
    ripple.style.top = mouseY + 'px';
    document.body.appendChild(ripple);
    
    // Add animation via CSS
    ripple.style.animation = 'ripple-effect 1s linear';
    
    // Remove after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
  
  // Typing animation
  const dynamicText = document.querySelector('.dynamic-text');
  const roles = [ 'Full Stack Developer' ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 150; // Faster typing
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if(isDeleting) {
      dynamicText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = 50; // Faster deletion
    } else {
      dynamicText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 150;
    }
    
    if(!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeDelay = 1000; // Pause at the end
    } else if(isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeDelay = 500; // Pause before typing new role
    }
    
    setTimeout(typeEffect, typeDelay);
  }
  
  // Start typing animation
  setTimeout(typeEffect, 1000);
  
  // Scroll animations for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeElements = document.querySelectorAll('.project-card, .skill-card, .contact-item');
  
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
  });
  
  // Navigation scrolling with enhanced effects
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const section = this.dataset.section;
      const element = document.getElementById(section);
      
      // Creating a smooth, eased scrolling effect
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  
  // Theme toggle with enhanced animation
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  
  themeToggle.addEventListener('click', function() {
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    body.classList.toggle('light-mode');
    
    if(body.classList.contains('light-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
    
    // Adding a flash effect on theme change
    const flash = document.createElement('div');
    flash.className = 'theme-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.remove();
    }, 500);
  });
  
  // Enhanced Music Player
  const musicPlayer = document.querySelector('.music-player');
  const musicButton = document.querySelector('.music-button');
  let audio = new Audio('/src/assets/music.mp3');
  audio.loop = true;
  audio.volume = 0.7; // Lower initial volume
  
  musicButton.addEventListener('click', function() {
    musicPlayer.classList.toggle('active');
    
    if(musicPlayer.classList.contains('active')) {
      musicPlayer.classList.add('playing');
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Create dynamic music visualization
      updateMusicVisualization();
    } else {
      musicPlayer.classList.remove('playing');
      audio.pause();
    }
  });
  
  function updateMusicVisualization() {
    if (!musicPlayer.classList.contains('playing')) return;
    
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      const height = Math.floor(Math.random() * 15) + 5;
      bar.style.height = `${height}px`;
    });
    
    if (musicPlayer.classList.contains('playing')) {
      requestAnimationFrame(() => {
        setTimeout(updateMusicVisualization, 100);
      });
    }
  }
  
  // Add ripple effect styles to the document
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: fixed;
      border-radius: 50%;
      background-color: rgba(139, 92, 246, 0.3);
      width: 10px;
      height: 10px;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }
    
    @keyframes ripple-effect {
      0% {
        width: 0px;
        height: 0px;
        opacity: 0.5;
      }
      100% {
        width: 500px;
        height: 500px;
        opacity: 0;
      }
    }
    
    .theme-flash {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 9998;
      pointer-events: none;
      opacity: 0;
      animation: flash 0.5s ease-out;
    }
    
    @keyframes flash {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0.1;
      }
      100% {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
