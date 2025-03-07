document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('checkbox');
    const connectWalletBtn = document.getElementById('connectWallet');
    const helpBtns = document.querySelectorAll('.help-btn');
    const modal = document.getElementById('helpModal');
    const closeBtn = document.querySelector('.close');
    const helpForm = document.getElementById('helpForm');

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Connect wallet functionality (placeholder)
    connectWalletBtn.addEventListener('click', () => {
        alert('Wallet connection functionality to be implemented');
    });

    // Modal functionality
    helpBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    helpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('helpMessage').value;
        alert(`Your message: ${message}\nThis will be sent to our AI assistant for processing.`);
        modal.style.display = 'none';
        helpForm.reset();
    });

    // Fetch and display analytics data
    fetchAnalyticsData();
});

async function fetchAnalyticsData() {
    try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        displayAnalytics(data);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
    }
}

function displayAnalytics(data) {
    const sections = ['cybersecurity', 'aiEngineering', 'dataScience', 'blockchain'];
    
    sections.forEach(section => {
        const content = document.querySelector(`#${section} .analytics-content`);
        const canvas = document.createElement('canvas');
        content.appendChild(canvas);

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: `${section.charAt(0).toUpperCase() + section.slice(1)} Metrics`,
                    data: data[section],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}
function displayAnalytics(data) {
    const sections = ['cybersecurity', 'aiEngineering', 'dataScience', 'blockchain'];
    
    sections.forEach((section, index) => {
        const content = document.querySelector(`#${section} .analytics-content`);
        const canvas = document.createElement('canvas');
        content.appendChild(canvas);

        // Delay each chart to create a staggered effect
        setTimeout(() => {
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: `${section.charAt(0).toUpperCase() + section.slice(1)} Metrics`,
                        data: data[section] || [10, 20, 15, 25, 30, 35], // Fallback data
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }, index * 300); // Stagger by 300ms
    });
}
// Contact button toggle
document.addEventListener('DOMContentLoaded', function() {
    const contactFloat = document.querySelector('.contact-float');
    const contactToggle = document.querySelector('.contact-toggle');

    contactToggle.addEventListener('click', function() {
        contactFloat.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (!contactFloat.contains(event.target) && contactFloat.classList.contains('active')) {
            contactFloat.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const terminalText = document.querySelector('.terminal-text');
    const commands = ['$ run', '$ exec', '$ load', '$ ping'];
    let commandIndex = 0;
    let charIndex = 0;

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        
        // If we haven't finished typing the current command
        if (charIndex <= currentCommand.length) {
            terminalText.textContent = currentCommand.slice(0, charIndex);
            charIndex++;
            setTimeout(typeCommand, 100); // Type next character after 100ms
        } else {
            // Wait 1 second before moving to the next command
            setTimeout(() => {
                charIndex = 0; // Reset character index
                commandIndex = (commandIndex + 1) % commands.length; // Move to next command
                typeCommand(); // Start typing the next command
            }, 1000); // 1-second pause between commands
        }
        document.addEventListener('DOMContentLoaded', function() {
    // Telegram Bot Configuration for Help Form
    const botToken = 'YOUR_BOT_TOKEN_HERE';
    const chatId = 'YOUR_CHAT_ID_HERE';

    // Buy Me a Coffee Button
    const buyMeCoffeeBtn = document.getElementById('buyMeCoffee');
    const walletAddress = 'UQC7T3cHqE85iBTvZzXC_jkTEwGu0eCInwLP9gJ5D3qcASPi'; // Your TON wallet

    buyMeCoffeeBtn.addEventListener('click', function() {
        // Create a TON payment URL (Telegram-compatible)
        const amount = '1'; // Example: 1 USDT (adjust as needed)
        const paymentUrl = `https://t.me/wallet?start=send&address=${walletAddress}&amount=${amount}&asset=USDT`;

        // Open the URL in a new tab/window or prompt user
        window.open(paymentUrl, '_blank');

        // Optional: Notify via Telegram bot that someone clicked the button
        const notifyUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        fetch(notifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `Someone clicked 'Buy Me a Coffee' to send ${amount} USDT to ${walletAddress}`
            })
        })
        .catch(error => console.error('Notification error:', error));
    });

    // Modal and Form Handling
    const helpModal = document.getElementById('helpModal');
    const helpForm = document.getElementById('helpForm');
    const helpButtons = document.querySelectorAll('.help-btn');
    const closeBtn = document.querySelector('.close');

    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            helpModal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    helpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('helpMessage').value;
        if (message.trim() === '') {
            alert('Please enter a request!');
            return;
        }
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: `New Help Request:\n${message}` })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Request sent successfully!');
                helpForm.reset();
                helpModal.style.display = 'none';
            } else {
                alert('Failed to send request: ' + data.description);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending your request.');
        });
    });

    // Contact Button Toggle
    const contactFloat = document.querySelector('.contact-float');
    const contactToggle = document.querySelector('.contact-toggle');
    contactToggle.addEventListener('click', function() {
        contactFloat.classList.toggle('active');
    });
    document.addEventListener('click', function(event) {
        if (!contactFloat.contains(event.target) && contactFloat.classList.contains('active')) {
            contactFloat.classList.remove('active');
        }
    });

    // Terminal Text Animation
    const terminalText = document.querySelector('.terminal-text');
    const commands = ['$ run', '$ exec', '$ load', '$ ping'];
    let commandIndex = 0;
    let charIndex = 0;

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
});
    }

    // Start the typing animation
    typeCommand();
});
