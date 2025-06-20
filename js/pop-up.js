document.addEventListener('DOMContentLoaded', function() {
    // Cash dropdown functionality
    const cashDropdownToggle = document.querySelector('.cash-dropdown-toggle');
    const cashDropdownContent = document.querySelector('.cash-dropdown-content');
    
    cashDropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        cashDropdownContent.classList.toggle('show');
        cashDropdownToggle.classList.toggle('active');
    });

    // Investment dropdown functionality
    const investmentDropdownToggle = document.querySelector('.investment-dropdown-toggle');
    const investmentDropdownContent = document.querySelector('.investment-dropdown-content');
    const subHeader = document.querySelector('.sub-header');
    const investmentHeader = document.querySelector('.investment-header');
    
    investmentDropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isShowing = investmentDropdownContent.classList.contains('show');
        
        investmentDropdownContent.classList.toggle('show');
        investmentDropdownToggle.classList.toggle('active');
        
        // Hide/show sub-header when dropdown is toggled
        if (isShowing) {
            // Dropdown is closing, show sub-header
            subHeader.classList.remove('hidden');
            investmentHeader.classList.remove('collapsed');
        } else {
            // Dropdown is opening, hide sub-header
            subHeader.classList.add('hidden');
            investmentHeader.classList.add('collapsed');
        }
    });

    // Menu popup functionality
    const menuPopupToggle = document.querySelector('.menu-popup-toggle');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    
    menuPopupToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        popupOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Close popup when clicking close button
    popupClose.addEventListener('click', function() {
        closePopup();
    });
    
    // Close popup when clicking overlay
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('show')) {
            closePopup();
        }
    });
    
    function closePopup() {
        popupOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Handle popup menu item clicks
    const popupItems = document.querySelectorAll('.popup-item');
    popupItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log(`Selected action: ${action}`);
            // Add your specific functionality for each menu item here
            closePopup();
        });
    });
    
    // Handle action button clicks
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log(`Action clicked: ${action}`);
            
            // Add specific functionality for each button
            switch(action) {
                case 'Deposit':
                    handleDeposit();
                    break;
                case 'Move cash':
                    handleMoveCash();
                    break;
                case 'Withdraw':
                    handleWithdraw();
                    break;
            }
        });
    });
    
    function handleDeposit() {
        // Add deposit functionality here
        alert('Deposit functionality - implement as needed');
    }
    
    function handleMoveCash() {
        // Add move cash functionality here
        alert('Move cash functionality - implement as needed');
    }
    
    function handleWithdraw() {
        // Add withdraw functionality here
        alert('Withdraw functionality - implement as needed');
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Close cash dropdown
        if (!cashDropdownToggle.contains(e.target) && !cashDropdownContent.contains(e.target)) {
            cashDropdownContent.classList.remove('show');
            cashDropdownToggle.classList.remove('active');
        }
        
        // Close investment dropdown
        if (!investmentDropdownToggle.contains(e.target) && !investmentDropdownContent.contains(e.target)) {
            investmentDropdownContent.classList.remove('show');
            investmentDropdownToggle.classList.remove('active');
            subHeader.classList.remove('hidden');
            investmentHeader.classList.remove('collapsed');
        }
    });


    // Asset allocation dropdown functionality
    const assetHeader = document.querySelector('.asset-header');
    const assetToggle = document.querySelector('.asset-toggle');
    const assetWeight = document.querySelector('.asset-weight');
    
    assetHeader.addEventListener('click', function(e) {
        e.stopPropagation();
        assetWeight.classList.toggle('show');
        assetToggle.classList.toggle('active');
    });

    // Close asset allocation when clicking outside
    document.addEventListener('click', function(e) {
        // ... (existing dropdown close code) ...
        
        // Close asset allocation dropdown
        if (!assetHeader.contains(e.target) && !assetWeight.contains(e.target)) {
            assetWeight.classList.remove('show');
            assetToggle.classList.remove('active');
        }
    });
});
