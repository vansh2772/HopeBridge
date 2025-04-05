document.addEventListener('DOMContentLoaded', () => {
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll event listener for header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
});

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    // Chat elements
    const chatWidget = document.getElementById('chatWidget');
    const chatBody = document.getElementById('chatBody');
    const chatBubble = document.getElementById('chatBubble');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // Initialize chat visibility
    if (chatBubble && chatBody) {
        chatBubble.style.display = 'block';
        chatBody.style.display = 'none';
    }

    // Chat toggle functionality
    chatBubble?.addEventListener('click', () => {
        chatBody.style.display = 'block';
        chatBubble.style.display = 'none';
    });

    closeChat?.addEventListener('click', () => {
        chatBody.style.display = 'none';
        chatBubble.style.display = 'block';
    });

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        userInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = '<div class="message-content">Typing...</div>';
        chatMessages.appendChild(typingDiv);

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: message
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            chatMessages.removeChild(typingDiv);
            addMessage(data[0].generated_text);
        } catch (error) {
            console.error('Error:', error);
            chatMessages.removeChild(typingDiv);
            addMessage("I apologize, but I'm having trouble connecting. Please try again later.");
        }
    }

    // Event listeners for sending messages
    sendMessage?.addEventListener('click', handleMessage);
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    });

    // Other page interactions
    const ctaButton = document.querySelector('.cta-button');
    const joinBtn = document.querySelector('.join-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const contactBtn = document.querySelector('.contact-btn');

    [ctaButton, joinBtn, aboutBtn, contactBtn].forEach(button => {
        button?.addEventListener('click', () => {
            alert('Feature coming soon!');
        });
    });
});