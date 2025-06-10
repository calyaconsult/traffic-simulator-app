document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const dataContainer = document.getElementById('data-container');
    const errorMessage = document.getElementById('error-message');

    generateBtn.addEventListener('click', async () => {
        try {
            generateBtn.textContent = 'Loading...';
            generateBtn.disabled = true;

            // ** IMPORTANT CHANGE HERE **
            // We now use the full URL to our Node.js API server, including the new port.
            const response = await fetch('./traffic.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // The rest of the code is the same
            document.getElementById('data-date').textContent = `Data for ${data.date}`;
            document.getElementById('kpi-visitors').textContent = data.kpis.visitors.toLocaleString();
            document.getElementById('kpi-pageviews').textContent = data.kpis.pageviews.toLocaleString();
            document.getElementById('kpi-bounceRate').textContent = `${data.kpis.bounceRate}%`;
            document.getElementById('kpi-avgSessionDuration').textContent = `${data.kpis.avgSessionDuration}s`;

            dataContainer.classList.remove('hidden');
            errorMessage.classList.add('hidden');

        } catch (error) {
            console.error('Failed to fetch traffic data:', error);
            errorMessage.textContent = 'Could not retrieve traffic data from the API server. Is it running?';
            errorMessage.classList.remove('hidden');
            dataContainer.classList.add('hidden');
        } finally {
            generateBtn.textContent = "Get Yesterday's Traffic Data";
            generateBtn.disabled = false;
        }
    });
});
