document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Add fade-in animation to feature cards
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Chat widget functionality
    document.addEventListener('DOMContentLoaded', function() {
        const chatWidget = document.getElementById('chatWidget');
        const chatBubble = document.getElementById('chatBubble');
        const chatBody = document.getElementById('chatBody');
        const minimizeChat = document.getElementById('minimizeChat');
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendMessage = document.getElementById('sendMessage');
    
        // Toggle chat window
        chatBubble.addEventListener('click', () => {
            chatBody.style.display = 'block';
            chatBubble.style.display = 'none';
        });
    
        minimizeChat.addEventListener('click', () => {
            chatBody.style.display = 'none';
            chatBubble.style.display = 'flex';
        });
    
        // Send message function
        function sendUserMessage() {
            const message = userInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                userInput.value = '';
    
                // Simulate bot response
                setTimeout(() => {
                    const botResponse = "Thank you for your message. Our team will get back to you soon.";
                    addMessage(botResponse, 'bot');
                }, 1000);
            }
        }
    
        // Add message to chat
        function addMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            if (type === 'bot') {
                messageDiv.innerHTML = `
                    <i class="bi bi-robot"></i>
                    <div class="message-content">${message}</div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">${message}</div>
                `;
            }
    
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    
        // Event listeners
        sendMessage.addEventListener('click', sendUserMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    });
});
