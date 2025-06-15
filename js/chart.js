// Stock Chart Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const timeBtns = document.querySelectorAll('.time-btn');
    const chartPrice = document.querySelector('.chart-price');
    const chartChange = document.querySelector('.chart-change');
    const priceLine = document.querySelector('.price-line');
    const priceArea = document.querySelector('.price-area');
    
    // Sample data for different time periods
    const chartData = {
        '1D': {
            price: '$72.55',
            change: '+0.01 (0.01%)',
            positive: true,
            path: 'M 50 200 L 100 180 L 150 190 L 200 170 L 250 160 L 300 175 L 350 155 L 400 140 L 450 150 L 500 135 L 550 145 L 600 130 L 650 125 L 700 120 L 750 115',
            areaPath: 'M 50 200 L 100 180 L 150 190 L 200 170 L 250 160 L 300 175 L 350 155 L 400 140 L 450 150 L 500 135 L 550 145 L 600 130 L 650 125 L 700 120 L 750 115 L 750 300 L 50 300 Z'
        },
        '1W': {
            price: '$72.85',
            change: '+2.15 (3.05%)',
            positive: true,
            path: 'M 50 250 L 150 230 L 250 200 L 350 180 L 450 160 L 550 140 L 650 130 L 750 115',
            areaPath: 'M 50 250 L 150 230 L 250 200 L 350 180 L 450 160 L 550 140 L 650 130 L 750 115 L 750 300 L 50 300 Z'
        },
        '1M': {
            price: '$71.20',
            change: '-1.35 (1.86%)',
            positive: false,
            path: 'M 50 150 L 150 170 L 250 160 L 350 180 L 450 190 L 550 200 L 650 210 L 750 220',
            areaPath: 'M 50 150 L 150 170 L 250 160 L 350 180 L 450 190 L 550 200 L 650 210 L 750 220 L 750 300 L 50 300 Z'
        },
        '3M': {
            price: '$74.10',
            change: '+4.25 (6.08%)',
            positive: true,
            path: 'M 50 280 L 150 260 L 250 240 L 350 200 L 450 180 L 550 160 L 650 140 L 750 110',
            areaPath: 'M 50 280 L 150 260 L 250 240 L 350 200 L 450 180 L 550 160 L 650 140 L 750 110 L 750 300 L 50 300 Z'
        },
        '1Y': {
            price: '$68.90',
            change: '-3.65 (5.03%)',
            positive: false,
            path: 'M 50 120 L 150 140 L 250 160 L 350 180 L 450 200 L 550 220 L 650 240 L 750 250',
            areaPath: 'M 50 120 L 150 140 L 250 160 L 350 180 L 450 200 L 550 220 L 650 240 L 750 250 L 750 300 L 50 300 Z'
        },
        '5Y': {
            price: '$82.30',
            change: '+12.75 (18.34%)',
            positive: true,
            path: 'M 50 290 L 150 270 L 250 250 L 350 220 L 450 180 L 550 150 L 650 120 L 750 90',
            areaPath: 'M 50 290 L 150 270 L 250 250 L 350 220 L 450 180 L 550 150 L 650 120 L 750 90 L 750 300 L 50 300 Z'
        }
    };
    
    // Handle time period button clicks
    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timeBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const period = this.dataset.period;
            const data = chartData[period];
            
            // Update chart data
            updateChart(data);
        });
    });
    
    function updateChart(data) {
        // Update price and change
        chartPrice.textContent = data.price;
        chartChange.textContent = data.change;
        
        // Update positive/negative styling
        chartChange.classList.remove('positive', 'negative');
        chartChange.classList.add(data.positive ? 'positive' : 'negative');
        
        // Update chart paths
        priceLine.setAttribute('d', data.path);
        priceArea.setAttribute('d', data.areaPath);
        
        // Update line color based on positive/negative
        const color = data.positive ? '#00d4aa' : '#ff6b6b';
        priceLine.setAttribute('stroke', color);
        
        // Update gradient
        const gradient = document.querySelector('#areaGradient stop');
        if (gradient) {
            gradient.setAttribute('style', `stop-color:${color};stop-opacity:0.3`);
        }
        
        // Trigger animation
        priceLine.style.animation = 'none';
        priceLine.offsetHeight; // Trigger reflow
        priceLine.style.animation = 'drawLine 1s ease-in-out';
    }
    
    // Add hover effects to chart
    const chartCanvas = document.querySelector('.chart-canvas');
    const tooltip = document.querySelector('.tooltip');
    
    if (chartCanvas && tooltip) {
        chartCanvas.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Show tooltip
            tooltip.style.display = 'block';
            tooltip.setAttribute('transform', `translate(${x - 40}, ${y - 40})`);
        });
        
        chartCanvas.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    }
});
