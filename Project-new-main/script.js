console.log("Mahindra Showroom website loaded");

const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
}

menuIcon.addEventListener('click', toggleMenu);

// Button redirect
const btn = document.getElementById('redirectBtn');
btn.addEventListener('click', function() {
    window.open('https://www.justdial.com/Sindhudurg/Sapale-Auto-Service-Pvt-Ltd-JANAVLI-Kankavli/9999P2362-2362-150311193002-G5R6_BZDET', '_blank');
});