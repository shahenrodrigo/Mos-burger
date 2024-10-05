let customers = [];
let orders = [];
let cart = [];
let subtotal = 0;
let discount = 0;
let total = 0;
let editingCustomerIndex = -1; 

const foodItems = {
    burgers: [
        { name: "Classic Burger (Regular)", price: 750, img: "image/bg1111.jpg" },
        { name: "Cheese Burger", price: 850, img: "image/bg2222.jpg" },
        { name: "Chicken Burger", price: 900, img: "image/bg4444.jpg" },
        { name: "Classic Burger (Large)", price: 1400, img: "image/bg5.jpg" },
        { name: "Turkey Burger", price: 1600, img: "image/bg6.jpg" },
        { name: "Chicken Burger (Large)", price: 1400, img: "image/bg-03.jpg" }
    ],
    submarines: [
        { name: "Crispy Chicken Submarine (Large)", price: 1950, img: "image/sub1.jpg" },
        { name: "Beef Submarine (Regular)", price: 1000, img: "image/sub2.jpeg" },
        { name: "Chicken Submarine (Reguler)", price: 1800, img: "image/sub3.jpeg" },
        { name: "Beef Submarine ", price: 1000, img: "image/sub4.jpeg" },
        { name: "Crispy Chicken Submarine (Regular)", price: 1150, img: "image/sub5.jpeg" },
        { name: "Beef Submarine (Large)", price: 2000, img: "image/sub6.jpeg" }
    ],
    fries: [
        { name: "Fries (Small)", price: 300, img: "image/fr1.jpeg" },
        { name: "Fries (Large)", price: 500, img: "image/fr2.jpeg" }  
    ],
    pasta: [
        { name: "Bolognese Pasta", price: 1200, img: "image/ps1.jpeg" },
        { name: "Creamy Chicken Pasta", price: 1200, img: "image/ps2.jpeg" },
        { name: "Spicy Sausage Pasta", price: 1200, img: "image/ps3.jpeg" }
       
    ],
    beverages: [
        { name: "Coca-Cola", price: 200, img: "image/coca.jpeg" },
        { name: "Sprite", price: 200, img: "image/SPRI.jpeg" },
        { name: "Fanta", price: 200, img: "image/TAN.jpeg" }
       
    ]
};


function updateCartSummary() {
    subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    discount = subtotal > 1000 ? subtotal * 0.1 : 0; 
    total = subtotal - discount;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discount').innerText = discount.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; 
    cart.forEach(item => {
        const cartItemHTML = `<p>${item.name} x ${item.quantity} - ${item.price * item.quantity} LKR</p>`;
        cartItems.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}

function loadItems(category) {
    const itemsContainer = document.querySelector(".burger-items");
    itemsContainer.innerHTML = ""; 

    foodItems[category].forEach((item, index) => {
        const itemHTML = `
            <div class="burger-item">
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} - ${item.price} LKR</p>
                <button class="decrease">-</button>
                <span class="quantity" data-index="${index}">0</span>
                <button class="increase">+</button>
                <button class="add-to-cart" data-category="${category}" data-index="${index}">Add to Cart</button>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.increase').forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantityElement = document.querySelectorAll('.quantity')[index];
            quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
        });
    });

    document.querySelectorAll('.decrease').forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantityElement = document.querySelectorAll('.quantity')[index];
            if (parseInt(quantityElement.innerText) > 0) {
                quantityElement.innerText = parseInt(quantityElement.innerText) - 1;
            }
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            const index = e.target.getAttribute('data-index');
            const quantityElement = document.querySelector(`.quantity[data-index="${index}"]`);
            const quantity = parseInt(quantityElement.innerText);

            if (quantity > 0) {
                const item = foodItems[category][index];
                const cartItem = cart.find(cartItem => cartItem.name === item.name);
                
                if (cartItem) {
                    cartItem.quantity += quantity; 
                } else {
                    cart.push({ name: item.name, price: item.price, quantity });
                }

                updateCartSummary();
                quantityElement.innerText = "0"; 
            }
        });
    });
}


document.querySelector('.b1').addEventListener('click', () => loadItems('burgers'));
document.querySelector('.b2').addEventListener('click', () => loadItems('submarines'));
document.querySelector('.b3').addEventListener('click', () => loadItems('fries'));
document.querySelector('.b4').addEventListener('click', () => loadItems('pasta'));
document.querySelector('.b5').addEventListener('click', () => loadItems('beverages'));


loadItems('burgers');


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

function hideAllSections() {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
}

document.getElementById('place-order').addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;

    if (!customerName || !customerPhone.startsWith('0') || customerPhone.length !== 10 || !customerAddress || cart.length === 0) {
        alert('Please complete customer details and add items to the cart.');
        return;
    }

    addCustomer(customerName, customerPhone, customerAddress);
    addOrder(customerName, cart, total);

    cart = [];
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    updateCartSummary();
});


function addCustomer(name, phone, address) {
    if (editingCustomerIndex !== -1) {

        customers[editingCustomerIndex] = { name, phone, address };
        editingCustomerIndex = -1; 
    } else {
       
        customers.push({ name, phone, address });
    }
    updateCustomerTable();
}

function addOrder(customerName, items, totalPayment) {
    orders.push({ customerName, items, totalPayment });
    updateOrderTable();
}

function updateCustomerTable() {
    const customerTableBody = document.getElementById('customer-table').querySelector('tbody');
    customerTableBody.innerHTML = ''; 
    customers.forEach((customer, index) => {
        const row = `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
                <td>
                    <button onclick="editCustomer(${index})" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteCustomer(${index})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>`;
        customerTableBody.insertAdjacentHTML('beforeend', row);
    });
}


function editCustomer(index) {
    editingCustomerIndex = index;
    const customer = customers[index];
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-address').value = customer.address;
}


function deleteCustomer(index) {
    customers.splice(index, 1); 
    updateCustomerTable(); 
}

function updateOrderTable() {
    const orderTableBody = document.getElementById('order-table').querySelector('tbody');
    orderTableBody.innerHTML = ''; 
    orders.forEach(order => {
        const itemsOrdered = order.items.map(item => `${item.name} (${item.quantity})`).join(', ');
        const row = `<tr><td>${order.customerName}</td><td>${itemsOrdered}</td><td>${order.totalPayment} LKR</td></tr>`;
        orderTableBody.insertAdjacentHTML('beforeend', row);
    });
}
