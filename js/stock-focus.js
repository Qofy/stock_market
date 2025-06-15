// Stock data structure
const stocksData = {
    'SHEL': {
        name: 'Shell',
        ticker: 'SHEL',
        price: 72.55,
        change: 0.01,
        changePercent: 0.01,
        logo: 'https://i.pinimg.com/736x/ea/ea/e8/eaeae8ac3c84ef55244992e2e56562d1.jpg',
        isPositive: true,
        chartData: [70.2, 71.1, 69.8, 72.3, 71.9, 72.55]
    },
    'GOOGL': {
        name: 'Alphabet (Class A)',
        ticker: 'GOOGL',
        price: 174.55,
        change: -0.12,
        changePercent: -0.07,
        logo: 'https://icon2.cleanpng.com/20240216/yhs/transparent-google-logo-google-logo-with-colorful-letters-on-black-1710875297222.webp',
        isPositive: false,
        chartData: [176.2, 175.1, 174.8, 173.3, 174.9, 174.55]
    },
    'NVDA': {
        name: 'Nvidia',
        ticker: 'NVDA',
        price: 141.80,
        change: 0.17,
        changePercent: 0.12,
        logo: 'https://www.nvidia.com/content/nvidiaGDC/de/de_DE/about-nvidia/legal-info/logo-brand-usage/_jcr_content/root/responsivegrid/nv_container_392921705/nv_container/nv_image.coreimg.100.1070.png/1722327058888/nvidia-logo-vert.png',
        isPositive: true,
        chartData: [140.2, 141.1, 139.8, 142.3, 141.9, 141.80]
    },
    'AAPL': {
        name: 'Apple',
        ticker: 'AAPL',
        price: 196.40,
        change: 0.05,
        changePercent: 0.03,
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
        isPositive: true,
        chartData: [195.2, 196.1, 194.8, 197.3, 196.9, 196.40]
    },
    'MSFT': {
        name: 'Microsoft',
        ticker: 'MSFT',
        price: 474.21,
        change: -0.75,
        changePercent: -0.16,
        logo: 'https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png',
        isPositive: false,
        chartData: [476.2, 475.1, 474.8, 473.3, 474.9, 474.21]
    },
    'TSLA': {
        name: 'Tesla',
        ticker: 'TSLA',
        price: 326.92,
        change: 1.61,
        changePercent: 0.49,
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-tesla-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-7-pack-logos-icons-2945257.png',
        isPositive: true,
        chartData: [324.2, 325.1, 323.8, 327.3, 326.9, 326.92]
    },
    'AMZN': {
        name: 'Amazon',
        ticker: 'AMZN',
        price: 211.81,
        change: -0.29,
        changePercent: -0.14,
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ZoPxHxiJ8nsrZTejjkVOIWcBlJt1D0KhLQ&s',
        isPositive: false,
        chartData: [213.2, 212.1, 211.8, 210.3, 212.9, 211.81]
    },
    'META': {
        name: 'Meta Platform',
        ticker: 'META',
        price: 682.83,
        change: -0.04,
        changePercent: -0.01,
        logo: 'https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png',
        isPositive: false,
        chartData: [684.2, 683.1, 682.8, 681.3, 683.9, 682.83]
    },
    'KO': {
        name: 'Coca-Cola',
        ticker: 'KO',
        price: 71.13,
        change: 0.11,
        changePercent: 0.015,
        logo: 'https://111percent.world/assets/transforms/cases/coca-cola/logos/_800xAUTO_crop_center-center_75_none/Coca-Cola-Logo-2009.jpg',
        isPositive: true,
        chartData: [70.2, 71.1, 69.8, 72.3, 71.9, 71.13]
    }
};

// Current focused stock
let currentStock = 'SHEL'; // Default to Shell

// Function to update the main body content
function updateMainBodyContent(ticker) {
    const stock = stocksData[ticker];
    if (!stock) return;

    currentStock = ticker;

    // Update the content-focus-detail section
    const priceNameSection = document.querySelector('.price_name');
    const companyLogoSection = document.querySelector('.company-logo_1 img');

    if (priceNameSection) {
        priceNameSection.innerHTML = `
            <p class="ticker2">${stock.ticker}</p>
            <h3>${stock.name}</h3>
            <p class="current-price2">
                <span class="currency2">$</span>${stock.price.toFixed(2).split('.')[0]}<span class="cents2">.${stock.price.toFixed(2).split('.')[1]}</span>
            </p>
            <p class="price-change2 ${stock.isPositive ? 'positive' : 'negative'}">
                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} <span class="percentage2">(${stock.changePercent.toFixed(2)}%)</span>
            </p>
            <button class="price-button">Buy</button>
        `;
    }

    if (companyLogoSection) {
        companyLogoSection.src = stock.logo;
        companyLogoSection.alt = stock.name;
    }

    // Update the chart
    updateStockChart(ticker);
}

// Function to create and update the stock chart
function updateStockChart(ticker) {
    const stock = stocksData[ticker];
    const chartContainer = document.querySelector('.big-reader');
    
    if (!chartContainer || !stock) return;

    // Clear existing chart
    chartContainer.innerHTML = '';

    // Create chart canvas
    const canvas = document.createElement('canvas');
    canvas.width = chartContainer.offsetWidth || 600;
    canvas.height = chartContainer.offsetHeight || 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    chartContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    
    // Chart styling
    const chartColor = stock.isPositive ? '#00d4aa' : '#ff6b6b';
    const gridColor = '#333333';
    const textColor = '#ffffff';
    
    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Data processing
    const data = stock.chartData;
    const minPrice = Math.min(...data) * 0.995;
    const maxPrice = Math.max(...data) * 1.005;
    const priceRange = maxPrice - minPrice;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Price labels
        const price = maxPrice - (priceRange / 5) * i;
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`$${price.toFixed(2)}`, padding - 10, y + 4);
    }
    
    // Vertical grid lines
    for (let i = 0; i <= data.length - 1; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
    }
    
    // Draw the price line
    ctx.setLineDash([]);
    ctx.strokeStyle = chartColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((price, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = chartColor;
    data.forEach((price, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw area under the curve
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = chartColor;
    ctx.beginPath();
    
    data.forEach((price, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Add title and current price
    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${stock.name} (${stock.ticker})`, padding, 30);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = chartColor;
    ctx.textAlign = 'right';
    ctx.fillText(`$${stock.price.toFixed(2)}`, canvas.width - padding, 30);
    
    // Add change indicator
    ctx.font = '14px Arial';
    ctx.fillStyle = stock.isPositive ? '#00d4aa' : '#ff6b6b';
    const changeText = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`;
    ctx.fillText(changeText, canvas.width - padding, 50);
}

// Add click event listeners to stock items
function initializeStockClickHandlers() {
    const stockItems = document.querySelectorAll('.stock-item');
    
    stockItems.forEach(stockItem => {
        stockItem.addEventListener('click', function() {
            // Remove active class from all stock items
            stockItems.forEach(item => item.classList.remove('active-stock'));
            
            // Add active class to clicked item
            this.classList.add('active-stock');
            
            // Get ticker from the stock item
            const tickerElement = this.querySelector('.ticker');
            if (tickerElement) {
                const ticker = tickerElement.textContent.trim();
                updateMainBodyContent(ticker);
            }
        });
        
        // Add hover effect
        stockItem.style.cursor = 'pointer';
        stockItem.style.transition = 'all 0.3s ease';
        
        stockItem.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
        });
        
        stockItem.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Handle window resize for chart
function handleChartResize() {
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateStockChart(currentStock);
        }, 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStockClickHandlers();
    updateMainBodyContent(currentStock); // Load default stock
    handleChartResize();
    
    // Set initial active stock
    const firstStockItem = document.querySelector('.stock-item');
    if (firstStockItem) {
        firstStockItem.classList.add('active-stock');
    }
});

// Simulate real-time price updates (optional)
function simulateRealTimeUpdates() {
    setInterval(() => {
        Object.keys(stocksData).forEach(ticker => {
            const stock = stocksData[ticker];
            const randomChange = (Math.random() - 0.5) * 0.1;
            stock.price += randomChange;
            stock.change += randomChange;
            
            // Update chart data
            stock.chartData.push(stock.price);
            if (stock.chartData.length > 20) {
                stock.chartData.shift();
            }
        });
        
        // Update current focused stock
        updateMainBodyContent(currentStock);
    }, 5000); // Update every 5 seconds
}

// Uncomment to enable real-time updates
// simulateRealTimeUpdates();
