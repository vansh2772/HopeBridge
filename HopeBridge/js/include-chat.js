document.addEventListener('DOMContentLoaded', function() {
    fetch('/components/chatbot.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Load chatbot scripts
            if (!document.querySelector('script[src="/config.js"]')) {
                const configScript = document.createElement('script');
                configScript.src = '/config.js';
                document.body.appendChild(configScript);
            }
            
            if (!document.querySelector('script[src="/script.js"]')) {
                const chatScript = document.createElement('script');
                chatScript.src = '/script.js';
                document.body.appendChild(chatScript);
            }
        });
});