// Variables to track customers and orders
let customers = [];
let orders = [];
let cart = [];
let subtotal = 0;
let discount = 0;
let total = 0;

// Function to update cart summary
function updateCartSummary() {
    subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    discount = subtotal > 1000 ? subtotal * 0.1 : 0; // Example: 10% discount if total is above 1000 LKR
    total = subtotal - discount;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discount').innerText = discount.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

// Event listener to add items to the cart
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const burgerItem = {
            name: `Burger ${index + 1}`,
            price: 750,
            quantity: parseInt(document.querySelectorAll('.quantity')[index].innerText)
        };

        if (burgerItem.quantity > 0) {
            cart.push(burgerItem);
            updateCartSummary();
        }
    });
});

// Event listeners to increase/decrease quantity
document.querySelectorAll('.increase').forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantity = document.querySelectorAll('.quantity')[index];
        quantity.innerText = parseInt(quantity.innerText) + 1;
    });
});

document.querySelectorAll('.decrease').forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantity = document.querySelectorAll('.quantity')[index];
        if (parseInt(quantity.innerText) > 0) {
            quantity.innerText = parseInt(quantity.innerText) - 1;
        }
    });
});

// Function to add customers and orders
function addCustomer(name, phone) {
    customers.push({ name, phone });
    updateCustomerTable();
}

function addOrder(customerName, items, totalPayment) {
    orders.push({ customerName, items, totalPayment });
    updateOrderTable();
}

// Function to update customer and order tables
function updateCustomerTable() {
    const customerTableBody = document.getElementById('customer-table').querySelector('tbody');
    customerTableBody.innerHTML = '';
    customers.forEach(customer => {
        const row = `<tr><td>${customer.name}</td><td>${customer.phone}</td></tr>`;
        customerTableBody.insertAdjacentHTML('beforeend', row);
    });
}

function updateOrderTable() {
    const orderTableBody = document.getElementById('order-table').querySelector('tbody');
    orderTableBody.innerHTML = '';
    orders.forEach(order => {
        const itemsOrdered = order.items.map(item => `${item.name} (${item.quantity})`).join(', ');
        const row = `<tr><td>${order.customerName}</td><td>${itemsOrdered}</td><td>${order.totalPayment}</td></tr>`;
        orderTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Sidebar buttons functionality
document.getElementById('customers-btn').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('customer-section').style.display = 'block';
});

document.getElementById('orders-btn').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('order-section').style.display = 'block';
});

document.getElementById('stores-btn').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('store-section').style.display = 'block';
});

document.getElementById('logout-btn').addEventListener('click', () => {
    alert('Logging out...');
    // Perform logout actions here (e.g., clearing session)
});

// Hide all sections function
function hideAllSections() {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
}

// Place order button functionality
document.getElementById('place-order').addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;

    if (!customerName || !customerPhone || cart.length === 0) {
        alert('Please complete customer details and add items to the cart.');
        return;
    }

    // Add customer and order
    addCustomer(customerName, customerPhone);
    addOrder(customerName, cart, total);

    // Reset cart and inputs
    cart = [];
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    updateCartSummary();
});
