const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.onload = () => {
  looker.plugins.visualizations.add({
    id: 'ticket_chart_bar',
    label: 'Ticket Chart',
    create: function (element, config) {
      element.innerHTML = `
        <div class="card">
          <div class="chart-title">🎟️ Tickets by Site</div>
          <canvas id="ticketChart"></canvas>
        </div>
      `;
    },
    update: function (data, element, config, queryResponse) {
      if (!data || data.length === 0) return;

      const ctx = element.querySelector('#ticketChart').getContext('2d');

      const labels = data.map(row => row.dimensions[0].value);
      const counts = data.map(row => row.metrics[0].value);

      if (window.ticketChart) {
        window.ticketChart.destroy();
      }

      window.ticketChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ticket Count',
            data: counts,
            backgroundColor: '#667eea',
            borderRadius: 10,
            hoverBackgroundColor: '#5a67d8',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#4a5568'
              }
            },
            x: {
              ticks: {
                color: '#4a5568'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#2d3748',
              titleColor: '#fff',
              bodyColor: '#fff'
            }
          }
        }
      });
    }
  });
};
document.head.appendChild(chartScript);
