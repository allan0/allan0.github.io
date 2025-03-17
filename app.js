document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const botToken = 'YOUR_BOT_TOKEN_HERE'; // Replace with your Telegram bot token
    const chatId = 'YOUR_CHAT_ID_HERE'; // Replace with your Telegram chat ID
    const walletAddress = 'UQC7T3cHqE85iBTvZzXC_jkTEwGu0eCInwLP9gJ5D3qcASPi'; // Your TON wallet

    // DOM Elements
    const themeToggle = document.getElementById('checkbox');
    const buyMeCoffeeBtn = document.getElementById('buyMeCoffee');
    const helpBtns = document.querySelectorAll('.help-btn');
    const modal = document.getElementById('helpModal');
    const closeBtn = document.querySelector('.close');
    const helpForm = document.getElementById('helpForm');
    const contactFloat = document.querySelector('.contact-float');
    const contactToggle = document.querySelector('.contact-toggle');
    const terminalText = document.querySelector('.terminal-text');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const shareBtn = document.querySelector('.share-btn');
    const newBlogBtn = document.getElementById('newBlogBtn');

    // Theme Toggle
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Buy Me a Coffee
    buyMeCoffeeBtn.addEventListener('click', () => {
        const amount = '1'; // Adjustable amount in USDT
        const paymentUrl = `https://t.me/wallet?start=send&address=${walletAddress}&amount=${amount}&asset=USDT`;
        window.open(paymentUrl, '_blank');

        // Notify via Telegram
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `Someone clicked 'Buy Me a Coffee' to send ${amount} USDT to ${walletAddress}`
            })
        }).catch(error => console.error('Notification error:', error));
    });

    // Modal Functionality
    helpBtns.forEach(btn => {
        btn.addEventListener('click', () => modal.style.display = 'block');
    });
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    helpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('helpMessage').value.trim();
        if (!message) {
            alert('Please enter a request!');
            return;
        }
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: `New Help Request:\n${message}` })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Request sent successfully!');
                helpForm.reset();
                modal.style.display = 'none';
            } else {
                alert(`Failed to send request: ${data.description}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending your request.');
        });
    });

    // Contact Float Toggle
    contactToggle.addEventListener('click', () => contactFloat.classList.toggle('active'));
    document.addEventListener('click', (e) => {
        if (!contactFloat.contains(e.target) && contactFloat.classList.contains('active')) {
            contactFloat.classList.remove('active');
        }
    });

    // Terminal Text Animation
    const commands = ['$ run', '$ exec', '$ load', '$ ping'];
    let commandIndex = 0, charIndex = 0;
    function typeCommand() {
        const currentCommand = commands[commandIndex];
        if (charIndex <= currentCommand.length) {
            terminalText.textContent = currentCommand.slice(0, charIndex);
            charIndex++;
            setTimeout(typeCommand, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                commandIndex = (commandIndex + 1) % commands.length;
                typeCommand();
            }, 1000);
        }
    }
    typeCommand();

    // Carousel Logic
    let currentIndex = 0, autoSlide;
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    function nextSlide() {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }
    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    }
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    autoSlide = setInterval(nextSlide, 5000);
    carouselInner.addEventListener('mouseover', () => clearInterval(autoSlide));
    carouselInner.addEventListener('mouseout', () => autoSlide = setInterval(nextSlide, 5000));

    // Share Button
    shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        const title = 'Sustainable AI & Blockchain Insights';
        if (navigator.share) {
            navigator.share({ title, text: 'Check out this blog on Sustainable AI and Blockchain!', url })
                .catch(error => console.error('Share error:', error));
        } else {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`, '_blank');
        }
    });

    // New Blog Button (Placeholder)
    newBlogBtn.addEventListener('click', () => {
        alert('Create a new blog post coming soon!');
    });

    // Fetch and Display Analytics
    async function fetchAnalyticsData() {
        try {
            const response = await fetch('/api/analytics');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayAnalytics(data);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            // Fallback data
            displayAnalytics({
                cybersecurity: [10, 20, 15, 25, 30, 35],
                aiEngineering: [15, 25, 20, 30, 35, 40],
                dataScience: [20, 30, 25, 35, 40, 45],
                blockchain: [25, 35, 30, 40, 45, 50]
            });
        }
    }

    function displayAnalytics(data) {
        const sections = ['cybersecurity', 'aiEngineering', 'dataScience', 'blockchain'];
        sections.forEach((section, index) => {
            const content = document.querySelector(`#${section} .analytics-content`);
            const canvas = document.createElement('canvas');
            content.appendChild(canvas);

            setTimeout(() => {
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: `${section.charAt(0).toUpperCase() + section.slice(1)} Metrics`,
                            data: data[section] || [10, 20, 15, 25, 30, 35],
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true } },
                        animation: { duration: 1000, easing: 'easeOutBounce' }
                    }
                });
            }, index * 300); // Staggered animation
        });
    }

    fetchAnalyticsData(); // Initialize analytics
});
