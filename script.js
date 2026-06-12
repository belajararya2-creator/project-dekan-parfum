/* ============================================================================
   SIPALING FOMO - INTERACTIVE FEATURES
   ============================================================================ */

// ============================================================================
// Mobile Menu Toggle
// ============================================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================================================
// Navbar Scroll Effect
// ============================================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================================
// Active Nav Link on Scroll
// ============================================================================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================================================
// FAQ Accordion
// ============================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Close other open items
        faqQuestions.forEach(item => {
            if (item !== question) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        question.classList.toggle('active');
    });
});

// ============================================================================
// Smooth Scroll for Anchor Links
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const offsetTop = element.offsetTop - 80; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// Newsletter Form
// ============================================================================
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (email) {
        alert(`Terima kasih! Email ${email} sudah terdaftar untuk newsletter kami.`);
        event.target.reset();
    }
}

// ============================================================================
// Contact Form
// ============================================================================
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        alert('Mohon isi semua field yang wajib diisi (*)');
        return;
    }

    // Simulate form submission
    alert(`Terima kasih, ${formData.name}! Pesan Anda telah kami terima. Kami akan menghubungi Anda segera.`);
    event.target.reset();
}

// ============================================================================
// Intersection Observer for Scroll Animations
// ============================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .value-card, .team-member').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================================================
// Add to Cart Button (Placeholder)
// ============================================================================
const addToCartButtons = document.querySelectorAll('.btn-icon');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        const price = button.closest('.product-card').querySelector('.price').textContent;
        
        // Visual feedback
        button.textContent = '✓';
        button.style.background = 'var(--primary)';
        
        setTimeout(() => {
            button.textContent = '+';
            button.style.background = 'transparent';
        }, 1500);

        console.log(`Added to cart: ${productName} - ${price}`);
    });
});

// ============================================================================
// Search Functionality (Placeholder)
// ============================================================================
const searchBox = document.querySelector('.search-box');

if (searchBox) {
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();

            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0.3';
            }
        });
    });
}

// ============================================================================
// Filter Functionality (Placeholder)
// ============================================================================
const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        console.log('Filter applied:', checkbox.value);
        // Implement filter logic here
    });
});

// ============================================================================
// Product Category Expand/Collapse (Optional)
// ============================================================================
const categoryTitles = document.querySelectorAll('.category-title');

categoryTitles.forEach(title => {
    title.addEventListener('click', () => {
        const grid = title.nextElementSibling;
        if (grid && grid.classList.contains('product-grid')) {
            grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
        }
    });
});

// ============================================================================
// Lazy Loading Images (Optional Enhancement)
// ============================================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// Keyboard Navigation
// ============================================================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Quick jump to search (Ctrl + K or Cmd + K)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.focus();
        }
    }
});

// ============================================================================
// Form Input Enhancements
// ============================================================================
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// ============================================================================
// Phone Number Formatting (Optional)
// ============================================================================
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
        }
        e.target.value = value;
    });
});

// ============================================================================
// Toast Notification System (Optional)
// ============================================================================
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #C5A86D 0%, #d4a574 100%);
        color: #000;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================================================
// Add CSS Animation for Toast
// ============================================================================
if (!document.querySelector('style[data-toast]')) {
    const style = document.createElement('style');
    style.dataset.toast = 'true';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .form-group.focused input,
        .form-group.focused textarea,
        .form-group.focused select {
            background-color: #f8f7f5;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// Page Load Animation
// ============================================================================
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ============================================================================
// Console Message
// ============================================================================
console.log('%cSipaling Fomo', 'font-size: 20px; font-weight: bold; color: #C5A86D;');
console.log('%cDecant Parfum Premium untuk Semua Kalangan', 'font-size: 12px; color: #666;');
console.log('%cThank you for visiting! Made with ❤️', 'font-size: 11px; color: #999;');
