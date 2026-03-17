// Liste complète des coupons
const coupons = [
    "Google Play", "Steam", "Apple", "Amazon", "Netflix",
    "Neosurf", "Transcash", "Ethereum", "Dogecoin", "Bitcoin",
    "PCS", "Visa"
];

// Fonction pour créer les coupons
function createCoupons() {
    const couponGrid = document.getElementById('couponGrid');
    
    coupons.forEach(coupon => {
        const couponDiv = document.createElement('div');
        couponDiv.className = 'coupon-item';
        couponDiv.textContent = coupon;
        
        couponDiv.addEventListener('click', () => {
            // Effet visuel
            couponDiv.style.transform = 'scale(0.95)';
            setTimeout(() => {
                couponDiv.style.transform = '';
            }, 200);
            
            // Message plus sympa
            alert(`🎉 Vous avez cliqué sur ${coupon} !\n(Fonction de démonstration)`);
        });
        
        couponGrid.appendChild(couponDiv);
    });
}

// Version simplifiée des notifications pour le test local
function setupNotifications() {
    const notificationBanner = document.getElementById('notificationBanner');
    const allowButton = document.getElementById('allow-notifications');
    
    allowButton.addEventListener('click', () => {
        // Version simplifiée pour le test
        notificationBanner.style.display = 'none';
        alert('✅ Mode démo : Les notifications seraient activées en ligne !');
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createCoupons();
    setupNotifications();
});