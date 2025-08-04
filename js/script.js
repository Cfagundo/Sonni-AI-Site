/**
 * Sonni AI - Enhanced Website Functionality
 * Custom JavaScript for AI automation website
 * No localStorage used - all state managed in memory
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sonni AI website initialized');
    
    // Initialize all components
    initContactForm();
    initNewsletterForm();
    initFAQAccordions();
    initSmoothScrolling();
    initHoverEffects();
    initAnimations();
    initBrandsListLoop();
});

/**
 * Enhanced Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('wf-form-Contact-forn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('Email'),
                company: formData.get('Company'),
                service: formData.get('Service'),
                message: formData.get('Message'),
                timestamp: new Date().toISOString()
            };
            
            // Validate required fields
            if (!data.name || !data.email || !data.company || !data.message) {
                showFormError(contactForm, 'Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(data.email)) {
                showFormError(contactForm, 'Please enter a valid email address.');
                return;
            }
            
            // Log submission (replace with actual API call)
            console.log('Contact Form Submission:', data);
            console.log(`New inquiry from ${data.company} interested in: ${data.service}`);
            
            // Show success message
            showFormSuccess(contactForm, 'Thank you! We\'ll be in touch within 24 hours to discuss your AI automation needs.');
            
            // Reset form
            contactForm.reset();
            
            // In production, send to backend:
            // submitToAPI('/api/contact', data);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

/**
 * Newsletter Form Handling
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('#email-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const email = formData.get('email');
            
            if (!isValidEmail(email)) {
                showFormError(form, 'Please enter a valid email address.');
                return;
            }
            
            console.log('Newsletter Subscription:', email);
            
            showFormSuccess(form, 'Welcome to our community! You\'ll receive our next AI automation insight soon.');
            form.reset();
            
            // In production:
            // submitToAPI('/api/newsletter', { email: email });
        });
    });
}

/**
 * FAQ Accordion Functionality
 */
function initFAQAccordions() {
    const faqButtons = document.querySelectorAll('.faq_button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordion = this.closest('.faq_accordion');
            const answer = accordion.querySelector('.faq_answer-wrap');
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all other accordions
            document.querySelectorAll('.faq_answer-wrap').forEach(wrap => {
                wrap.style.maxHeight = '0px';
                wrap.style.opacity = '0';
            });
            
            // Toggle current accordion
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Enhanced Hover Effects
 */
function initHoverEffects() {
    // Service cards hover effect
    const serviceItems = document.querySelectorAll('.services_item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Work/Service list items
    const workItems = document.querySelectorAll('.work-list_item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.work-list_img-main');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.4s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.work-list_img-main');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Blog items hover
    const blogItems = document.querySelectorAll('.blog-list_item');
    blogItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Initialize Scroll Animations
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.services_item, .brands_item-block, .about-team_item, .blog-list_item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

/**
 * Seamless brands list animation
 */
function initBrandsListLoop() {
    const brandsList = document.querySelector('.brands_list');
    if (!brandsList) return;

    // Only duplicate if not already duplicated
    if (!brandsList.classList.contains('marquee-ready')) {
        const brandsItems = Array.from(brandsList.children);
        brandsItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('brands_item-clone');
            brandsList.appendChild(clone);
        });
        brandsList.classList.add('marquee-ready');
    }

    // Add marquee animation class
    brandsList.classList.add('brands_list-marquee');

    // Pause animation on hover
    brandsList.addEventListener('mouseenter', () => {
        brandsList.classList.add('marquee-paused');
    });
    brandsList.addEventListener('mouseleave', () => {
        brandsList.classList.remove('marquee-paused');
    });
}

/**
 * Utility Functions
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    
    // Visual feedback
    if (!isValid) {
        field.style.borderColor = '#dc2626';
        showFieldError(field, message);
    } else {
        field.style.borderColor = '#059669';
        hideFieldError(field);
    }
    
    return isValid;
}

function showFormSuccess(form, message) {
    const successDiv = form.parentElement.querySelector('.success-message') || 
                      form.parentElement.querySelector('.w-form-done');
    const errorDiv = form.parentElement.querySelector('.error-message') || 
                     form.parentElement.querySelector('.w-form-fail');
    
    if (successDiv) {
        const messageEl = successDiv.querySelector('.newsletter_success-text') || 
                         successDiv.querySelector('div');
        if (messageEl) {
            messageEl.textContent = message;
        }
        successDiv.style.display = 'block';
    }
    
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

function showFormError(form, message) {
    const errorDiv = form.parentElement.querySelector('.error-message') || 
                     form.parentElement.querySelector('.w-form-fail');
    const successDiv = form.parentElement.querySelector('.success-message') || 
                      form.parentElement.querySelector('.w-form-done');
    
    if (errorDiv) {
        const messageEl = errorDiv.querySelector('div');
        if (messageEl) {
            messageEl.textContent = message;
        }
        errorDiv.style.display = 'block';
    }
    
    if (successDiv) {
        successDiv.style.display = 'none';
    }
}

function showFieldError(field, message) {
    // Remove existing error
    hideFieldError(field);
    
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;';
    
    field.parentElement.appendChild(errorEl);
}

function hideFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * API Submission Function (for production use)
 */
async function submitToAPI(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        return result;
    } catch (error) {
        console.error('API Submission Error:', error);
        throw error;
    }
}

/**
 * Mobile Menu Toggle (if needed)
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.navbar_hamburger');
    const mobileMenu = document.querySelector('.navbar_links-wrap');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('is-open');
            this.classList.toggle('is-open');
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// Export functions for potential external use
window.SonniAI = {
    validateEmail: isValidEmail,
    submitForm: submitToAPI,
    showSuccess: showFormSuccess,
    showError: showFormError
};