// ===== BASE DE DONNÉES DES COUPONS =====
const coupons = [
    { name: "Google Play", icon: "🎮", type: "Carte cadeau", min: 10, max: 100 },
    { name: "Steam", icon: "🎲", type: "Jeux vidéo", min: 5, max: 200 },
    { name: "Apple", icon: "🍎", type: "App Store", min: 10, max: 500 },
    { name: "Amazon", icon: "📦", type: "Shopping", min: 5, max: 1000 },
    { name: "Netflix", icon: "🎬", type: "Streaming", min: 10, max: 150 },
    { name: "Neosurf", icon: "💳", type: "Prépayée", min: 10, max: 250 },
    { name: "Transcash", icon: "💰", type: "Prépayée", min: 20, max: 500 },
    { name: "Bitcoin", icon: "₿", type: "Crypto", min: 10, max: 10000 },
    { name: "Ethereum", icon: "⟠", type: "Crypto", min: 10, max: 5000 },
    { name: "Dogecoin", icon: "🐕", type: "Crypto", min: 1, max: 1000 },
    { name: "Visa", icon: "💳", type: "Carte", min: 20, max: 500 },
    { name: "Mastercard", icon: "💳", type: "Carte", min: 20, max: 500 }
];

// ===== SYSTÈME D'ENVOI =====
function sendVerification(coupon, amount, code, currency) {
    return new Promise((resolve) => {
        // Simuler l'envoi au serveur
        setTimeout(() => {
            // Générer une réponse aléatoire (80% de chance de succès)
            const isValid = Math.random() > 0.2;
            
            if (isValid) {
                const valeur = Math.floor(Math.random() * (coupon.max - coupon.min)) + coupon.min;
                resolve({
                    success: true,
                    message: `✅ Félicitations ! Votre coupon ${coupon.name} est valide !`,
                    details: {
                        valeur: valeur,
                        devise: currency,
                        code: code,
                        date: new Date().toLocaleString()
                    }
                });
            } else {
                resolve({
                    success: false,
                    message: `❌ Désolé, le coupon ${coupon.name} n'est pas valide ou a déjà été utilisé.`,
                    details: null
                });
            }
        }, 2000); // Délai de 2 secondes pour simuler l'envoi
    });
}

// ===== PAGE DE VÉRIFICATION AMÉLIORÉE =====
function createVerifyPage(coupon) {
    const verifyWindow = window.open('', '_blank');
    
    verifyWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérifier ${coupon.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .verify-container {
            max-width: 500px;
            width: 100%;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            padding: 30px;
            border: 1px solid rgba(255,255,255,0.2);
            animation: slideUp 0.5s ease;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .icon {
            font-size: 70px;
            margin-bottom: 10px;
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        h1 {
            font-size: 32px;
            margin-bottom: 5px;
            background: linear-gradient(45deg, #fff, #ffd700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .type {
            opacity: 0.7;
            margin-bottom: 20px;
        }
        .input-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
        }
        input, select {
            width: 100%;
            padding: 15px;
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 15px;
            color: white;
            font-size: 16px;
            transition: all 0.3s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #ffd700;
            background: rgba(255,255,255,0.25);
        }
        input::placeholder {
            color: rgba(255,255,255,0.5);
        }
        .amount-group {
            display: flex;
            gap: 10px;
        }
        .amount-group select {
            width: 30%;
        }
        .amount-group input {
            width: 70%;
        }
        .info-box {
            background: rgba(255,215,0,0.1);
            border: 2px solid #ffd700;
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        button {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 15px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            margin: 20px 0;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        button:active {
            transform: translateY(0);
        }
        button.sending {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            pointer-events: none;
        }
        .result {
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            display: none;
            margin: 20px 0;
            animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .success {
            background: rgba(76, 175, 80, 0.2);
            border: 2px solid #4CAF50;
            color: #fff;
        }
        .error {
            background: rgba(244, 67, 54, 0.2);
            border: 2px solid #f44336;
            color: #fff;
        }
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        .loading-spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid #ffd700;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .details {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            font-size: 14px;
        }
        .back-btn {
            background: transparent;
            border: 2px solid rgba(255,255,255,0.3);
            margin-top: 10px;
        }
        .back-btn:hover {
            background: rgba(255,255,255,0.1);
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            animation: slideIn 0.5s ease;
            z-index: 1000;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div class="verify-container">
        <div class="header">
            <div class="icon">${coupon.icon}</div>
            <h1>${coupon.name}</h1>
            <div class="type">${coupon.type}</div>
        </div>
        
        <div class="info-box">
            💡 <strong>Information :</strong> Votre coupon sera vérifié instantanément.<br>
            Montant valide : ${coupon.min}€ - ${coupon.max}€
        </div>
        
        <div class="input-group">
            <label>💰 Montant du coupon</label>
            <div class="amount-group">
                <select id="currency">
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                </select>
                <input type="number" id="amount" placeholder="Entrez le montant" 
                       min="${coupon.min}" max="${coupon.max}" step="1">
            </div>
        </div>
        
        <div class="input-group">
            <label>🔑 Code du coupon</label>
            <input type="text" id="code" placeholder="Ex: ${coupon.name.toUpperCase()}-123456789">
        </div>
        
        <div class="loading" id="loading">
            <div class="loading-spinner"></div>
            <p>Envoi en cours... Veuillez patienter</p>
        </div>
        
        <button onclick="verifyAndSend()" id="verifyBtn">🚀 Vérifier et envoyer</button>
        
        <div id="result" class="result"></div>
        
        <button class="back-btn" onclick="window.close()">← Fermer</button>
    </div>
    
    <script>
        const coupon = ${JSON.stringify(coupon)};
        
        async function verifyAndSend() {
            const amount = document.getElementById('amount').value;
            const code = document.getElementById('code').value;
            const currency = document.getElementById('currency').value;
            const resultDiv = document.getElementById('result');
            const loadingDiv = document.getElementById('loading');
            const verifyBtn = document.getElementById('verifyBtn');
            
            // Vérification des champs
            if (!amount || !code) {
                showResult('❌ Veuillez remplir tous les champs', 'error');
                showNotification('Champs manquants', 'error');
                return;
            }
            
            if (amount < coupon.min || amount > coupon.max) {
                showResult(\`❌ Montant invalide (min: \${coupon.min}€, max: \${coupon.max}€)\`, 'error');
                showNotification('Montant invalide', 'error');
                return;
            }
            
            if (code.length < 8) {
                showResult('❌ Le code doit contenir au moins 8 caractères', 'error');
                showNotification('Code trop court', 'error');
                return;
            }
            
            // Afficher le chargement
            loadingDiv.style.display = 'block';
            verifyBtn.classList.add('sending');
            verifyBtn.textContent = '⏳ Envoi en cours...';
            resultDiv.style.display = 'none';
            
            // Simuler l'envoi au serveur
            setTimeout(() => {
                // 80% de chance de succès
                const isValid = Math.random() > 0.2;
                
                loadingDiv.style.display = 'none';
                verifyBtn.classList.remove('sending');
                verifyBtn.textContent = '🚀 Vérifier et envoyer';
                
                if (isValid) {
                    const valeur = Math.floor(Math.random() * (coupon.max - coupon.min)) + parseInt(coupon.min);
                    
                    // Message de succès
                    const successMessage = \`
                        <strong>✅ COUPON VALIDE !</strong><br><br>
                        🎫 Code : \${code}<br>
                        💰 Montant : \${valeur}\${currency}<br>
                        🏷️ Type : \${coupon.name}<br>
                        📅 Date : \${new Date().toLocaleString()}<br><br>
                        <div style="background: rgba(255,215,0,0.2); padding: 10px; border-radius: 5px;">
                            ✨ Un email de confirmation vous a été envoyé
                        </div>
                    \`;
                    
                    showResult(successMessage, 'success');
                    showNotification('✅ Coupon valide !', 'success');
                    
                    // Sauvegarder dans l'historique
                    saveToHistory(coupon.name, code, valeur, currency, true);
                    
                } else {
                    // Message d'échec
                    const errorMessage = \`
                        <strong>❌ COUPON INVALIDE</strong><br><br>
                        Désolé, le code \${code} n'est pas valide ou a déjà été utilisé.<br><br>
                        <div style="background: rgba(244,67,54,0.2); padding: 10px; border-radius: 5px;">
                            🔍 Vérifiez votre code et réessayez
                        </div>
                    \`;
                    
                    showResult(errorMessage, 'error');
                    showNotification('❌ Coupon invalide', 'error');
                    
                    // Sauvegarder dans l'historique
                    saveToHistory(coupon.name, code, amount, currency, false);
                }
            }, 3000);
        }
        
        function showResult(message, type) {
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            resultDiv.className = 'result ' + type;
            resultDiv.innerHTML = message;
            
            // Scroll jusqu'au résultat
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
        
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.background = type === 'success' ? '#4CAF50' : '#f44336';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        function saveToHistory(couponName, code, amount, currency, valid) {
            let history = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
            history.unshift({
                coupon: couponName,
                code: code,
                amount: amount,
                currency: currency,
                valid: valid,
                date: new Date().toLocaleString()
            });
            
            // Garder seulement les 20 derniers
            if (history.length > 20) history.pop();
            
            localStorage.setItem('verificationHistory', JSON.stringify(history));
        }
    </script>
</body>
</html>
    `);
}

// ===== CHARGER LES COUPONS =====
function loadCoupons() {
    const grid = document.getElementById('couponGrid');
    if (!grid) return;
    
    coupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'coupon-card';
        card.innerHTML = `
            <div class="coupon-icon">${coupon.icon}</div>
            <div class="coupon-name">${coupon.name}</div>
            <div class="coupon-type">${coupon.type}</div>
            <div class="coupon-range">${coupon.min}€ - ${coupon.max}€</div>
        `;
        
        card.addEventListener('click', () => createVerifyPage(coupon));
        grid.appendChild(card);
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', loadCoupons);        }
        .input-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
        }
        input, select {
            width: 100%;
            padding: 15px;
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 15px;
            color: white;
            font-size: 16px;
            transition: all 0.3s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #ffd700;
            background: rgba(255,255,255,0.25);
        }
        input::placeholder {
            color: rgba(255,255,255,0.5);
        }
        .amount-group {
            display: flex;
            gap: 10px;
        }
        .amount-group select {
            width: 30%;
        }
        .amount-group input {
            width: 70%;
        }
        .info-box {
            background: rgba(255,215,0,0.1);
            border: 2px solid #ffd700;
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        button {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 15px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            margin: 20px 0;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        button:active {
            transform: translateY(0);
        }
        button.sending {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            pointer-events: none;
        }
        .result {
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            display: none;
            margin: 20px 0;
            animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .success {
            background: rgba(76, 175, 80, 0.2);
            border: 2px solid #4CAF50;
            color: #fff;
        }
        .error {
            background: rgba(244, 67, 54, 0.2);
            border: 2px solid #f44336;
            color: #fff;
        }
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        .loading-spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid #ffd700;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .details {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            font-size: 14px;
        }
        .back-btn {
            background: transparent;
            border: 2px solid rgba(255,255,255,0.3);
            margin-top: 10px;
        }
        .back-btn:hover {
            background: rgba(255,255,255,0.1);
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            animation: slideIn 0.5s ease;
            z-index: 1000;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div class="verify-container">
        <div class="header">
            <div class="icon">${coupon.icon}</div>
            <h1>${coupon.name}</h1>
            <div class="type">${coupon.type}</div>
        </div>
        
        <div class="info-box">
            💡 <strong>Information :</strong> Votre coupon sera vérifié instantanément.<br>
            Montant valide : ${coupon.min}€ - ${coupon.max}€
        </div>
        
        <div class="input-group">
            <label>💰 Montant du coupon</label>
            <div class="amount-group">
                <select id="currency">
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                </select>
                <input type="number" id="amount" placeholder="Entrez le montant" 
                       min="${coupon.min}" max="${coupon.max}" step="1">
            </div>
        </div>
        
        <div class="input-group">
            <label>🔑 Code du coupon</label>
            <input type="text" id="code" placeholder="Ex: ${coupon.name.toUpperCase()}-123456789">
        </div>
        
        <div class="loading" id="loading">
            <div class="loading-spinner"></div>
            <p>Envoi en cours... Veuillez patienter</p>
        </div>
        
        <button onclick="verifyAndSend()" id="verifyBtn">🚀 Vérifier et envoyer</button>
        
        <div id="result" class="result"></div>
        
        <button class="back-btn" onclick="window.close()">← Fermer</button>
    </div>
    
    <script>
        const coupon = ${JSON.stringify(coupon)};
        
        async function verifyAndSend() {
            const amount = document.getElementById('amount').value;
            const code = document.getElementById('code').value;
            const currency = document.getElementById('currency').value;
            const resultDiv = document.getElementById('result');
            const loadingDiv = document.getElementById('loading');
            const verifyBtn = document.getElementById('verifyBtn');
            
            // Vérification des champs
            if (!amount || !code) {
                showResult('❌ Veuillez remplir tous les champs', 'error');
                showNotification('Champs manquants', 'error');
                return;
            }
            
            if (amount < coupon.min || amount > coupon.max) {
                showResult(\`❌ Montant invalide (min: \${coupon.min}€, max: \${coupon.max}€)\`, 'error');
                showNotification('Montant invalide', 'error');
                return;
            }
            
            if (code.length < 8) {
                showResult('❌ Le code doit contenir au moins 8 caractères', 'error');
                showNotification('Code trop court', 'error');
                return;
            }
            
            // Afficher le chargement
            loadingDiv.style.display = 'block';
            verifyBtn.classList.add('sending');
            verifyBtn.textContent = '⏳ Envoi en cours...';
            resultDiv.style.display = 'none';
            
            // Simuler l'envoi au serveur
            setTimeout(() => {
                // 80% de chance de succès
                const isValid = Math.random() > 0.2;
                
                loadingDiv.style.display = 'none';
                verifyBtn.classList.remove('sending');
                verifyBtn.textContent = '🚀 Vérifier et envoyer';
                
                if (isValid) {
                    const valeur = Math.floor(Math.random() * (coupon.max - coupon.min)) + parseInt(coupon.min);
                    
                    // Message de succès
                    const successMessage = \`
                        <strong>✅ COUPON VALIDE !</strong><br><br>
                        🎫 Code : \${code}<br>
                        💰 Montant : \${valeur}\${currency}<br>
                        🏷️ Type : \${coupon.name}<br>
                        📅 Date : \${new Date().toLocaleString()}<br><br>
                        <div style="background: rgba(255,215,0,0.2); padding: 10px; border-radius: 5px;">
                            ✨ Un email de confirmation vous a été envoyé
                        </div>
                    \`;
                    
                    showResult(successMessage, 'success');
                    showNotification('✅ Coupon valide !', 'success');
                    
                    // Sauvegarder dans l'historique
                    saveToHistory(coupon.name, code, valeur, currency, true);
                    
                } else {
                    // Message d'échec
                    const errorMessage = \`
                        <strong>❌ COUPON INVALIDE</strong><br><br>
                        Désolé, le code \${code} n'est pas valide ou a déjà été utilisé.<br><br>
                        <div style="background: rgba(244,67,54,0.2); padding: 10px; border-radius: 5px;">
                            🔍 Vérifiez votre code et réessayez
                        </div>
                    \`;
                    
                    showResult(errorMessage, 'error');
                    showNotification('❌ Coupon invalide', 'error');
                    
                    // Sauvegarder dans l'historique
                    saveToHistory(coupon.name, code, amount, currency, false);
                }
            }, 3000);
        }
        
        function showResult(message, type) {
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            resultDiv.className = 'result ' + type;
            resultDiv.innerHTML = message;
            
            // Scroll jusqu'au résultat
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
        
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.background = type === 'success' ? '#4CAF50' : '#f44336';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        function saveToHistory(couponName, code, amount, currency, valid) {
            let history = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
            history.unshift({
                coupon: couponName,
                code: code,
                amount: amount,
                currency: currency,
                valid: valid,
                date: new Date().toLocaleString()
            });
            
            // Garder seulement les 20 derniers
            if (history.length > 20) history.pop();
            
            localStorage.setItem('verificationHistory', JSON.stringify(history));
        }
    </script>
</body>
</html>
    `);
}

// ===== CHARGER LES COUPONS =====
function loadCoupons() {
    const grid = document.getElementById('couponGrid');
    if (!grid) return;
    
    coupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'coupon-card';
        card.innerHTML = `
            <div class="coupon-icon">${coupon.icon}</div>
            <div class="coupon-name">${coupon.name}</div>
            <div class="coupon-type">${coupon.type}</div>
            <div class="coupon-range">${coupon.min}€ - ${coupon.max}€</div>
        `;
        
        card.addEventListener('click', () => createVerifyPage(coupon));
        grid.appendChild(card);
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', loadCoupons);
