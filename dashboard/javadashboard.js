document.addEventListener('DOMContentLoaded', () => {
const tableBody = document.getElementById('reservation-table-body');
const statTotal = document.getElementById('stat-total');
const statPending = document.getElementById('stat-pending');
const statCancelled = document.getElementById('stat-cancelled');
const addForm = document.getElementById('addReservationForm');

// Load data from LocalStorage
let reservations = JSON.parse(localStorage.getItem('restaurant_data')) || [];
renderTable();

// TOAST NOTIFICATION FUNCTION
function showToast(message, type = 'success') {
const container = document.getElementById('toast-container');
const toast = document.createElement('div');
toast.className = `toast toast-${type}`;
toast.innerText = message;
container.appendChild(toast);

setTimeout(() => {
toast.style.opacity = '0';
setTimeout(() => toast.remove(), 500);
}, 3000);
}

function renderTable() {
tableBody.innerHTML = '';
reservations.forEach((res, index) => {
const row = document.createElement('tr');
row.innerHTML = `
<td>${res.name}</td>
<td>${res.guests}</td>
<td>${res.dateTime.replace('T', ' ')}</td>
<td style="font-weight:bold; color:${res.status === 'Cancelled' ? 'red' : res.status === 'Confirmed' ? 'green' : 'orange'}">${res.status}</td>
<td>
<button class="btn-confirm" data-index="${index}">Confirm</button>
<button class="btn-cancel" data-index="${index}">Cancel</button>
</td>
`;
tableBody.appendChild(row);
});
updateStats();
}

function updateStats() {
statTotal.innerText = reservations.length;
statPending.innerText = reservations.filter(r => r.status === 'Pending').length;
statCancelled.innerText = reservations.filter(r => r.status === 'Cancelled').length;
}

if (addForm) {
addForm.addEventListener('submit', function(e) {
e.preventDefault();

const name = document.getElementById('resName').value.trim();
const guests = parseInt(document.getElementById('resGuests').value);
const dateVal = document.getElementById('resDateTime').value;
const inputDate = new Date(dateVal);
const now = new Date();

// VALIDATION: No Numbers in Name
if (!/^[A-Za-z\s]+$/.test(name)) {
showToast("Error: Name must be letters only!", "error");
return;
}

// VALIDATION: No negative guests
if (guests <= 0) {
showToast("Error: Guests must be 1 or more!", "error");
return;
}

// VALIDATION: No past dates
if (inputDate < now) {
showToast("Error: You cannot book in the past!", "error");
return;
}

reservations.push({ name, guests, dateTime: dateVal, status: 'Pending' });
localStorage.setItem('restaurant_data', JSON.stringify(reservations));
renderTable();
showToast("Reservation successful!");
this.reset();
});
}

tableBody.addEventListener('click', (e) => {
const index = e.target.getAttribute('data-index');
if (index === null) return;

if (e.target.classList.contains('btn-confirm')) {
reservations[index].status = 'Confirmed';
showToast("Confirmed!");
} else if (e.target.classList.contains('btn-cancel')) {
reservations[index].status = 'Cancelled';
showToast("Cancelled", "error");
}
localStorage.setItem('restaurant_data', JSON.stringify(reservations));
renderTable();
});
});
