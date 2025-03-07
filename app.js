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
