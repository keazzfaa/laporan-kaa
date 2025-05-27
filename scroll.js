document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Calculate scroll position
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            // Add glitch effect to target section
            targetSection.classList.add('section-glitch');
            
            // Smooth scroll with cyberpunk effect
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Remove glitch effect after animation
            setTimeout(() => {
                targetSection.classList.remove('section-glitch');
            }, 1000);
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
