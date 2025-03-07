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
