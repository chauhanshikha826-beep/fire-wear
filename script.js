// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate form submission (in a real app, this would send data to a server)
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Cart functionality
let cart = [];
let cartCount = 0;

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function parsePrice(priceString) {
    return parseFloat(priceString.replace('₹', '').replace(',', ''));
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
    const discountCheckbox = document.getElementById('discount-checkbox');
    const discount = discountCheckbox.checked ? subtotal * 0.2 : 0;
    const total = subtotal - discount;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = (parsePrice(item.price) * item.quantity).toFixed(2);
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${itemTotal}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="btn btn-small remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    calculateTotal();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
        return;
    }
    cartCount += change;
    updateCartCount();
    displayCartItems();
}

function removeFromCart(index) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

// Add to Cart functionality
document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        const productImage = productCard.querySelector('img').src;

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            // Increase quantity if item already exists
            cart[existingItemIndex].quantity++;
        } else {
            // Add new item to cart
            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            cart.push(cartItem);
        }
        cartCount++;

        // Update cart count display
        updateCartCount();

        // Show confirmation
        alert(`${productName} added to cart! Cart now has ${cartCount} item(s).`);
    });
});

// Cart modal functionality
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const discountCheckbox = document.getElementById('discount-checkbox');
const checkoutBtn = document.getElementById('checkout-btn');

cartIcon.addEventListener('click', function() {
    displayCartItems();
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

discountCheckbox.addEventListener('change', calculateTotal);

checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checkout.');
    } else {
        // Hide cart items and total, show customer details form
        document.getElementById('cart-items').style.display = 'none';
        document.querySelector('.cart-total').style.display = 'none';
        checkoutBtn.style.display = 'none';
        document.getElementById('customer-details').style.display = 'block';
    }
});

// Back to Cart button
document.getElementById('back-to-cart').addEventListener('click', function() {
    // Show cart items and total, hide customer details form
    document.getElementById('cart-items').style.display = 'block';
    document.querySelector('.cart-total').style.display = 'block';
    checkoutBtn.style.display = 'block';
    document.getElementById('customer-details').style.display = 'none';
});

// Checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    // Basic validation
    if (name === '' || email === '' || phone === '' || address === '') {
        alert('Please fill in all customer details.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate successful purchase
    const total = document.getElementById('total').textContent;
    alert(`Thank you for your purchase, ${name}! Total amount: ₹${total}. Your order will be shipped to ${address}.`);

    // Reset cart and close modal
    cart = [];
    cartCount = 0;
    updateCartCount();
    cartModal.style.display = 'none';

    // Reset form
    this.reset();

    // Reset modal display
    document.getElementById('cart-items').style.display = 'block';
    document.querySelector('.cart-total').style.display = 'block';
    checkoutBtn.style.display = 'block';
    document.getElementById('customer-details').style.display = 'none';
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Interactive Star Rating
document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    const ratingText = rating.querySelector('.rating-text');
    const originalRating = parseFloat(rating.dataset.rating);

    // Initialize stars based on data-rating
    const fullStars = Math.floor(originalRating);
    stars.forEach((star, index) => {
        if (index < fullStars) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            // Update stars
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
            // Update rating text
            ratingText.textContent = `(${value}.0)`;
            rating.dataset.rating = value;
        });

        star.addEventListener('mouseover', function() {
            const value = parseInt(this.dataset.value);
            stars.forEach((s, index) => {
                if (index < value) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach((s, index) => {
                if (s.classList.contains('active')) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
    });
});

// Rating form submission
document.querySelectorAll('.rating-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const review = this.querySelector('input').value.trim();
        if (review === '') {
            alert('Please enter a review.');
            return;
        }
        // Simulate review submission (in a real app, this would send data to a server)
        alert('Thank you for your review! It has been submitted.');
        this.reset();
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.backgroundColor = '#000';
    }
});

// Simple Sign-In simulation
let currentUser = null;

function updateLoginUI(isLoggedIn) {
    const logoutBtn = document.getElementById('logout-btn');

    if (isLoggedIn) {
        // Show logout button
        logoutBtn.style.display = 'inline-block';
        alert(`Welcome, ${currentUser.name}! You have successfully signed in.`);
    } else {
        // Hide logout button
        logoutBtn.style.display = 'none';
        currentUser = null;
        alert('You have been logged out.');
    }
}

// Simulate Sign-In
document.getElementById('signin-btn').addEventListener('click', function() {
    // Simulate a user signing in
    currentUser = {
        name: ' shikha chauhan',
        email: 'shikha@example.com',
        picture: ''
    };
    updateLoginUI(true);
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    updateLoginUI(false);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateLoginUI(false); // Start with logged-out state
});
