document.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 700);
            }
        }, 2000); 
    });
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'shadow-lg');
            navbar.style.background = "rgba(0, 0, 0, 0.95)";
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-lg');
            navbar.style.background = "rgba(0, 0, 0, 0.8)";
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Success! Your VIP request has been received.');
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    });

   
    const cards = document.querySelectorAll('.vip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "#FACC15";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "#222";
        });
    });

    updateLoginNav();
    updateWishlistBadge();
});

function updateLoginNav() {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginLink = document.querySelector('.btn-login a');
    if (!loginLink) return;

    if (user && user.loggedIn) {
        loginLink.href = 'user-profile.html';
        loginLink.innerHTML = `<i class="fas fa-user me-2"></i>Profile`;
    } else {
        loginLink.href = 'login.html';
        loginLink.innerHTML = `<i class="fas fa-user me-2"></i>Login`;
    }
}

function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-badge');
    if (!badge) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    badge.textContent = wishlist.length;
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    badge.textContent = cart.length;
}
