// Liste des coupons
const coupons = [
    "Google Play", "Steam", "Apple", "Amazon", "Netflix",
    "Neosurf", "Transcash", "Ethereum", "Dogecoin", "Bitcoin",
    "PCS", "Visa"
];

// ===== COMPTEUR DE VISITES =====
if (localStorage.getItem('visits')) {
    let visits = parseInt(localStorage.getItem('visits')) + 1;
    localStorage.setItem('visits', visits);
} else {
    localStorage.setItem('visits', 1);
}

// Afficher le compteur
const counter = document.createElement('div');
counter.className = 'visit-counter';
counter.textContent = `👥 Visites: ${localStorage.getItem('visits')}`;
document.body.appendChild(counter);

// ===== MODE SOMBRE =====
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Sauvegarder le choix
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDark);
}

// Charger le thème sauvegardé
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-theme');
}

// Ajouter le bouton thème
const themeBtn = document.createElement('button');
themeBtn.className = 'theme-btn';
themeBtn.textContent = '🌓';
themeBtn.onclick = toggleTheme;
document.body.appendChild(themeBtn);

// ===== SON AU CLIQUER =====
function playClickSound() {
    // Son simple (bip)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ===== CRÉER LES COUPONS =====
function createCoupons() {
    const couponGrid = document.getElementById('couponGrid');
    
    coupons.forEach(coupon => {
        const couponDiv = document.createElement('div');
        couponDiv.className = 'coupon-item';
        couponDiv.textContent = coupon;
        
        couponDiv.addEventListener('click', () => {
            // Son
            playClickSound();
            
            // Effet visuel
            couponDiv.style.transform = 'scale(0.95)';
            setTimeout(() => {
                couponDiv.style.transform = '';
            }, 200);
            
            // Rediriger vers la page de vérification
            window.location.href = `verify.html?coupon=${encodeURIComponent(coupon)}`;
        });
        
        couponGrid.appendChild(couponDiv);
    });
}

// ===== NOTIFICATIONS =====
function setupNotifications() {
    const notificationBanner = document.getElementById('notificationBanner');
    const allowButton = document.getElementById('allow-notifications');
    
    if (allowButton) {
        allowButton.addEventListener('click', () => {
            notificationBanner.style.display = 'none';
            localStorage.setItem('notifications', 'true');
            alert('✅ Notifications activées !');
        });
    }
}

// ===== MENU MOBILE =====
function createMobileMenu() {
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    
    const pages = [
        { icon: '🏠', link: 'index.html', name: 'home' },
        { icon: '✅', link: 'verify.html', name: 'verify' },
        { icon: '📋', link: 'history.html', name: 'history' },
        { icon: '⚙️', link: 'settings.html', name: 'settings' }
    ];
    
    pages.forEach(page => {
        const item = document.createElement('a');
        item.href = page.link;
        item.className = 'menu-item';
        item.textContent = page.icon;
        
        // Marquer la page active
        if (window.location.pathname.includes(page.link) || 
            (page.link === 'index.html' && window.location.pathname.endsWith('/'))) {
            item.classList.add('active');
        }
        
        menu.appendChild(item);
    });
    
    document.body.appendChild(menu);
    
    // Ajouter un espace en bas pour ne pas cacher le contenu
    document.body.style.paddingBottom = '80px';
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('couponGrid')) {
        createCoupons();
    }
    setupNotifications();
    createMobileMenu();
});
