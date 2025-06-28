// Toggle switch functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Optional: Handle the toggle state
            const toggleType = this.getAttribute('data-toggle');
            const isActive = this.classList.contains('active');
            
            console.log(`${toggleType} toggle is now: ${isActive ? 'ON' : 'OFF'}`);
            
            // You can add your logic here based on the toggle state
            if (toggleType === 'manual') {
                // Handle manual investment toggle
            } else if (toggleType === 'pie') {
                // Handle pie toggle
            }
        });
    });
});
