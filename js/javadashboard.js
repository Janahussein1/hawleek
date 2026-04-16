document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOCAL STORAGE (State Management) ---
    // This checks if we have saved stats in the browser. If not, it uses your default HTML numbers.
    let pendingCount = localStorage.getItem('pendingStats') ? parseInt(localStorage.getItem('pendingStats')) : 12;
    let cancelledCount = localStorage.getItem('cancelledStats') ? parseInt(localStorage.getItem('cancelledStats')) : 4;

    const statPendingEl = document.getElementById('stat-pending');
    const statCancelledEl = document.getElementById('stat-cancelled');

    // Update the UI with the saved (or default) numbers
    statPendingEl.innerText = pendingCount;
    statCancelledEl.innerText = cancelledCount;

    // Helper function to update numbers and save them to LocalStorage
    const updateStats = () => {
        statPendingEl.innerText = pendingCount;
        statCancelledEl.innerText = cancelledCount;
        localStorage.setItem('pendingStats', pendingCount);
        localStorage.setItem('cancelledStats', cancelledCount);
    };

    // --- 2. EVENT DELEGATION (Table Actions) ---
    const tableBody = document.getElementById('reservation-table-body');

    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            const target = e.target;
            const row = target.closest('tr');
            if (!row) return;

            const badge = row.querySelector('.badge');
            const confirmBtn = row.querySelector('.btn-confirm');
            const cancelBtn = row.querySelector('.btn-cancel');

            // Handle Confirm
            if (target.classList.contains('btn-confirm') && !target.disabled) {
                if (badge.classList.contains('pending')) {
                    pendingCount--; // Decrease pending
                }
                badge.className = 'badge confirmed';
                badge.textContent = 'Confirmed';
                target.disabled = true; // Disable confirm button
                updateStats(); // Save changes
            }

            // Handle Cancel
            if (target.classList.contains('btn-cancel') && !target.disabled) {
                if (badge.classList.contains('pending')) {
                    pendingCount--; // Decrease pending
                } else if (badge.classList.contains('confirmed')) {
                    // Optional logic: if they cancel an already confirmed booking
                    confirmBtn.disabled = true;
                }
                
                cancelledCount++; // Increase cancelled
                badge.className = 'badge cancelled';
                badge.textContent = 'Cancelled';
                
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;
                row.style.opacity = '0.5'; // Visually dim the row
                updateStats(); // Save changes
            }
        });
    }

    // --- 3. REGULAR EXPRESSIONS (Live Search Filter) ---
    const searchInput = document.getElementById('searchInput');
    const rows = document.querySelectorAll('.reservation-row');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();

        // Create a Dynamic Regular Expression
        // 'i' makes it case-insensitive (e.g., "omar" matches "Omar")
        // We use regex to see if the customer name contains the typed letters
        const regexPattern = new RegExp(searchTerm, 'i');

        rows.forEach(row => {
            const customerName = row.querySelector('.customer-name').textContent;
            
            // The .test() method is a powerful Regex feature. 
            // It returns true if the regex pattern is found in the customerName string.
            if (regexPattern.test(customerName)) {
                row.classList.remove('hidden-row'); // Show row
            } else {
                row.classList.add('hidden-row'); // Hide row
            }
        });
    });
});