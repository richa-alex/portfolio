// ====================================
// PORTFOLIO SCRIPT - WITH BOTH CASE STUDIES
// ====================================

// ---------- MOBILE MENU ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ---------- SCROLL REVEAL ----------
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ========== INTRO SCREEN - ONLY ON INTERACTION ==========
const introDiv = document.getElementById('intro');
const cupContainer = document.querySelector('.cup-container');
let introTimer = null;
let animationStarted = false;
function startIntroAnimation() {
    if (animationStarted) return;
    animationStarted = true;
    
    // Add hover class to trigger CSS animation (coffee fills + logo appears)
    cupContainer.classList.add('animate-intro');
    
    // Wait for animation to complete (coffee fill + logo fade in)
    introTimer = setTimeout(() => {
        hideIntro();
    }, 100); // matches CSS transition durations (1.2s fill + 1.4s logo)
}
function hideIntro() {
    if (introDiv && !introDiv.classList.contains('hide')) {
        introDiv.classList.add('hide');
        // Allow body scroll after intro hides
        document.body.style.overflow = '';
    }
}

// Desktop: hover starts animation
if (cupContainer) {
    cupContainer.addEventListener('mouseenter', startIntroAnimation);
    
    // Optional: also allow click on container for touch devices
    cupContainer.addEventListener('click', startIntroAnimation);
}

// Mobile: tap anywhere on intro to start (as fallback)
if (introDiv) {
    introDiv.addEventListener('click', (e) => {
        // If the click is on the cup container itself, it's already handled
        if (e.target.closest('.cup-container')) return;
        startIntroAnimation();
    });
}

// ========== MODAL HANDLING FOR BOTH CASE STUDIES ==========
const sereneModal = document.getElementById('sereneModal');
//const teshuvahModal = document.getElementById('teshuvahModal');
const enstyleModal = document.getElementById('enstyleModal');
const neuropalModal = document.getElementById('neuropalModal');
const cochinclubModal = document.getElementById('cochinclubModal');

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.querySelectorAll('[data-case="serene"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Opening Serene Dentistry modal');
        openModal(sereneModal);
    });
});

// Handle Teshuvah buttons (with data-case="teshuvah")
//document.querySelectorAll('[data-case="teshuvah"]').forEach(btn => {
//    btn.addEventListener('click', (e) => {
//        e.stopPropagation();
//        console.log('Opening Teshuvah modal');
//        openModal(teshuvahModal);
//    });
//});

// Handle Enstyle buttons (with data-case="enstyle")
document.querySelectorAll('[data-case="enstyle"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Opening Enstyle modal');
        openModal(enstyleModal);
    });
});

document.querySelectorAll('[data-case="neuropal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Opening NeuroPal modal');
        openModal(neuropalModal);
    });
});

document.querySelectorAll('[data-case="cochinclub"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Opening Cochin Club modal');
        openModal(cochinclubModal);
    });
});

// Also handle clicking on the whole card (not just button)
document.querySelectorAll('.case-study-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking button (prevents double)
        if (e.target.closest('.view-case-btn')) return;
        
        const caseType = card.getAttribute('data-case');
        if (caseType === 'serene') {
            openModal(sereneModal);
        //else if (caseType === 'teshuvah') {
        //    openModal(teshuvahModal);
        } else if (caseType === 'enstyle') {
            openModal(enstyleModal);
        } else if (caseType === 'neuropal') {
    openModal(neuropalModal);
}  else if (caseType === 'cochinclub') {
    openModal(cochinclubModal);
}

    });
});

// Close buttons for both modals
document.querySelectorAll('.modal-close, .close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(sereneModal);
        //closeModal(teshuvahModal);
        closeModal(enstyleModal);
        closeModal(neuropalModal);
        closeModal(cochinclubModal);
    });
});

// Click outside to close
window.addEventListener('click', (e) => {
    if (e.target === sereneModal) closeModal(sereneModal);
    //if (e.target === teshuvahModal) closeModal(teshuvahModal);
    if (e.target === enstyleModal) closeModal(enstyleModal);
    if (e.target === neuropalModal) closeModal(neuropalModal);
    if (e.target === cochinclubModal) closeModal(cochinclubModal);
});

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(sereneModal);
        //closeModal(teshuvahModal);
        closeModal(enstyleModal);
    }
});

// ---------- SMOOTH SCROLLING ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ---------- COPY BUTTONS ----------
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        try {
            await navigator.clipboard.writeText(textToCopy);
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    });
});

// ---------- PDF DOWNLOAD BUTTONS ----------
const serenePdfBtn = document.querySelector('#sereneModal .download-pdf-btn');
//const teshuvahPdfBtn = document.querySelector('#teshuvahModal .download-pdf-btn');
const enstylePdfBtn = document.querySelector('#enstyleModal .download-pdf-btn');
const neuropalPdfBtn = document.querySelector('#neuropalModal .download-pdf-btn');
const clubPdfBtn = document.querySelector('#cochinclubModal .download-pdf-btn');

if (serenePdfBtn) {
    serenePdfBtn.addEventListener('click', () => {
        alert('Serene Dentistry PDF case study will be available soon. Contact me for detailed portfolio!');
    });
}

//if (teshuvahPdfBtn) {
//   teshuvahPdfBtn.addEventListener('click', () => {
//        alert('Teshuvah PDF case study will be available soon. Contact me for detailed portfolio!');
//    });
//}

if (enstylePdfBtn) {
    enstylePdfBtn.addEventListener('click', () => {
        alert('Enstyle Doors PDF case study will be available soon. Contact me for detailed portfolio!');
    });
}

if (neuropalPdfBtn) {
    neuropalPdfBtn.addEventListener('click', () => {
        alert('NeuroPal PDF case study will be available soon. Contact me for detailed portfolio!');
    });
}

if (clubPdfBtn) {
    clubPdfBtn.addEventListener('click', () => {
        alert('Full portfolio PDF available on request. Contact me!');
    });
}

console.log('🔥 Portfolio ready — Both case studies loaded!');
console.log('Teshuvah modal exists:', !!teshuvahModal);
console.log('Enstyle modal exists:', !!enstyleModal);
console.log('Enstyle buttons found:', document.querySelectorAll('[data-case="enstyle"]').length);