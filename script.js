document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll animations for elements with 'animate-on-scroll' class
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Inline Expansion Logic
    const expandTriggers = document.querySelectorAll('[data-target]');
    const detailsContainer = document.getElementById('solution-details-container');
    const detailBlocks = document.querySelectorAll('.solution-detail-block');
    const closeDetailsBtn = document.getElementById('close-details-btn');

    expandTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            
            // Hide all blocks
            detailBlocks.forEach(block => {
                block.style.display = 'none';
            });
            
            // Show the target block
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.style.display = 'block';
                
                // If it's the water block, reset the nested views
                if (targetId === 'detail-water') {
                    const optionsView = document.getElementById('water-options-view');
                    const softenerView = document.getElementById('water-softener-view');
                    const roView = document.getElementById('water-ro-view');
                    if (optionsView) optionsView.style.display = 'block';
                    if (softenerView) softenerView.style.display = 'none';
                    if (roView) roView.style.display = 'none';
                }
                
                // If it's the heat block, reset the nested views
                if (targetId === 'detail-heat') {
                    const heatOptions = document.getElementById('heat-options-view');
                    const heatCommercial = document.getElementById('heat-commercial-view');
                    if (heatOptions) heatOptions.style.display = 'block';
                    if (heatCommercial) heatCommercial.style.display = 'none';
                }
                
                detailsContainer.style.display = 'block';
                
                // Smooth scroll to the details container
                const navHeight = navbar.offsetHeight;
                const targetPosition = detailsContainer.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            detailsContainer.style.display = 'none';
            // Scroll back to solutions grid
            const grid = document.querySelector('.solutions-grid');
            if (grid) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = grid.getBoundingClientRect().top + window.pageYOffset - navHeight - 40;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Quote Modal Logic
function openQuoteModal(productName = '') {
    const overlay = document.getElementById('quote-modal-overlay');
    const productInput = document.getElementById('quote-product');
    if (productInput) productInput.value = productName;
    if (overlay) overlay.classList.add('active');
}

function closeQuoteModal() {
    const overlay = document.getElementById('quote-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    const form = document.getElementById('quote-form');
    if (form) form.reset();
}

function submitQuoteForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('quote-name').value;
    const phone = document.getElementById('quote-phone').value;
    const quantity = document.getElementById('quote-quantity').value;
    const req = document.getElementById('quote-req').value;
    const product = document.getElementById('quote-product').value;
    
    let message = `*New Quote Request*\n\n`;
    message += `*Name:* ${name}\n`;
    message += `*Contact Number:* ${phone}\n`;
    if (product) message += `*Product of Interest:* ${product}\n`;
    if (quantity) message += `*Quantity:* ${quantity}\n`;
    if (req) message += `*Requirements:* ${req}\n`;
    
    const whatsappUrl = `https://wa.me/919870203800?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    closeQuoteModal();
}
