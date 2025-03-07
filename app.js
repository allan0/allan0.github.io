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
    }

    // Start the typing animation
    typeCommand();
});
