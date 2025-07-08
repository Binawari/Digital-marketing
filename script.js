// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update navigation links for smooth scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add slide-in animations to about section
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText && aboutImage) {
        aboutText.classList.add('slide-in-left');
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutText);
        observer.observe(aboutImage);
    }

    // Add fade-in animation to blog cards
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Service Modal Content
const serviceContent = {
    seo: {
        title: 'Search Engine Optimization',
        description: 'Our comprehensive SEO services help your website rank higher in search results and attract more organic traffic.',
        features: [
            'Keyword Research & Analysis',
            'On-Page Optimization',
            'Technical SEO Audit',
            'Link Building Strategies',
            'Local SEO Optimization',
            'Monthly Performance Reports'
        ],
        benefits: [
            'Increased organic traffic',
            'Higher search rankings',
            'Better user experience',
            'Long-term results'
        ]
    },
    social: {
        title: 'Social Media Marketing',
        description: 'Build your brand presence and engage with your audience across all major social media platforms.',
        features: [
            'Social Media Strategy Development',
            'Content Creation & Curation',
            'Community Management',
            'Paid Social Advertising',
            'Influencer Partnerships',
            'Analytics & Reporting'
        ],
        benefits: [
            'Increased brand awareness',
            'Better customer engagement',
            'Higher conversion rates',
            'Improved brand loyalty'
        ]
    },
    ppc: {
        title: 'Pay-Per-Click Advertising',
        description: 'Drive targeted traffic and maximize ROI with strategic PPC campaigns across Google Ads and social platforms.',
        features: [
            'Campaign Strategy & Setup',
            'Keyword Research & Bidding',
            'Ad Copy Creation & Testing',
            'Landing Page Optimization',
            'Conversion Tracking',
            'Performance Optimization'
        ],
        benefits: [
            'Immediate traffic results',
            'Precise audience targeting',
            'Measurable ROI',
            'Budget control'
        ]
    },
    content: {
        title: 'Content Marketing',
        description: 'Create compelling content that attracts, engages, and converts your target audience.',
        features: [
            'Content Strategy Development',
            'Blog Writing & SEO',
            'Video Content Creation',
            'Infographic Design',
            'Email Newsletter Content',
            'Content Distribution'
        ],
        benefits: [
            'Improved brand authority',
            'Better search rankings',
            'Increased engagement',
            'Higher conversion rates'
        ]
    },
    email: {
        title: 'Email Marketing',
        description: 'Build relationships and drive sales with personalized email campaigns that convert.',
        features: [
            'Email Strategy Development',
            'List Building & Segmentation',
            'Template Design',
            'Automated Campaigns',
            'A/B Testing',
            'Performance Analytics'
        ],
        benefits: [
            'Direct customer communication',
            'High ROI potential',
            'Personalized messaging',
            'Automated nurturing'
        ]
    },
    analytics: {
        title: 'Analytics & Reporting',
        description: 'Track performance and make data-driven decisions with comprehensive analytics and reporting.',
        features: [
            'Google Analytics Setup',
            'Custom Dashboard Creation',
            'Conversion Tracking',
            'Performance Monitoring',
            'Monthly Reports',
            'Strategic Recommendations'
        ],
        benefits: [
            'Data-driven decisions',
            'Performance insights',
            'ROI measurement',
            'Continuous improvement'
        ]
    }
};

function openServiceModal(serviceType) {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    const service = serviceContent[serviceType];
    
    if (service) {
        content.innerHTML = `
            <h2>${service.title}</h2>
            <p class="service-description">${service.description}</p>
            
            <div class="service-details">
                <div class="service-features">
                    <h3>What's Included:</h3>
                    <ul>
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-benefits">
                    <h3>Key Benefits:</h3>
                    <ul>
                        ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="service-cta">
                <button class="btn btn-primary" onclick="openModal('consultation-modal'); closeModal('service-modal');">
                    Get Started Today
                </button>
            </div>
        `;
        
        // Add styles for service modal content
        const style = document.createElement('style');
        style.textContent = `
            .service-description {
                font-size: 1.1rem;
                color: #64748b;
                margin-bottom: 2rem;
            }
            .service-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            .service-features h3,
            .service-benefits h3 {
                color: #1e293b;
                margin-bottom: 1rem;
            }
            .service-features ul,
            .service-benefits ul {
                list-style: none;
                padding: 0;
            }
            .service-features li,
            .service-benefits li {
                padding: 0.5rem 0;
                border-bottom: 1px solid #e2e8f0;
                position: relative;
                padding-left: 1.5rem;
            }
            .service-features li:before,
            .service-benefits li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: bold;
            }
            .service-cta {
                text-align: center;
                padding-top: 1rem;
                border-top: 1px solid #e2e8f0;
            }
            @media (max-width: 768px) {
                .service-details {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        openModal('service-modal');
    }
}

// Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

document.getElementById('consultation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Consultation scheduled! We\'ll contact you within 24 hours.');
        this.reset();
        closeModal('consultation-modal');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Successfully subscribed to our newsletter!');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(loadingStyle);