window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("transparent");
  } else {
    header.classList.remove("transparent");
  }
});

const toggleBtn = document.getElementById("toggle-theme");
const themeIcon = document.getElementById("theme-icon");

 // No início do script
let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
  document.body.classList.add("dark-mode");
  themeIcon.src = "images/sun.png";
  themeIcon.alt = "Modo claro";
}

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);

  document.body.classList.toggle("dark-mode");
  themeIcon.src = darkMode ? "images/sun.png" : "images/moon.png";
  themeIcon.alt = darkMode ? "Modo claro" : "Modo escuro";
});

const menuBtn = document.getElementById('hamburguer-btn');
const closeBtn = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');

// Abre o menu
menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
});

// Fecha o menu
closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
});

// Detecta clique fora do menu para fechá-lo
document.addEventListener('click', function(event) {
  const isClickInsideMenu = sideMenu.contains(event.target);
  const isClickOnMenuButton = menuBtn.contains(event.target);

  // Se o menu estiver aberto, e o clique for fora do menu e fora do botão, fecha
  if (sideMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuButton) {
    sideMenu.classList.remove('active');
  }
});

const cart = {};
const prices = {
  "Tradicional": 8,
  "Chocolate": 8,
  "Chocolate Branco": 9,
  "Chocolate Duo": 9,
  "Red Velvet": 9,
  "Limão Siciliano": 12,
  "Nutella": 12,
  "Paçoca Recheado": 12,
  "Prestigio": 12,
  "Red Velvet Recheado": 12
};

function addToCart(flavor) {
  if (!cart[flavor]) cart[flavor] = 0;
  cart[flavor]++;
  updateOrder();
}

function updateOrder() {
  const textArea = document.getElementById('order-text');
  const totalPrice = document.getElementById('total-price');
  let message = "Oii! Gostaria de fazer um pedido!\n";
  let total = 0;

  textArea.value = ''; // limpa o texto

  // Gera lista de itens
  for (const [flavor, qty] of Object.entries(cart)) {
    message += `- ${qty} cookie${qty > 1 ? 's' : ''} ${flavor.toLowerCase()}\n`;
    total += qty * prices[flavor];
  }

  textArea.value = message;
  totalPrice.textContent = `R$${total.toFixed(2).replace('.', ',')}`;

  // Atualiza botões de remoção
  renderRemovals();
}

function copyToClipboard() {
  const text = document.getElementById("order-text");
  text.select();
  text.setSelectionRange(0, 99999); // mobile support
  document.execCommand("copy");
  alert("Mensagem copiada para o WhatsApp!");
}

function clearCart() {
  for (let key in cart) delete cart[key];
  updateOrder();
}

function removeFromCart(flavor) {
  if (cart[flavor]) {
    cart[flavor]--;
    if (cart[flavor] <= 0) delete cart[flavor];
    updateOrder();
  }
}

function renderRemovals() {
  const summary = document.querySelector('.order-summary');
  const existingRemovals = summary.querySelector('.removal-buttons');
  if (existingRemovals) existingRemovals.remove();

  if (Object.keys(cart).length === 0) return;

  const div = document.createElement('div');
  div.className = 'removal-buttons';

  for (const [flavor, qty] of Object.entries(cart)) {
    const btn = document.createElement('button');
    btn.textContent = `Remover 1 ${flavor}`;
    btn.onclick = () => removeFromCart(flavor);
    div.appendChild(btn);
  }

  summary.appendChild(div);
}

const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('fade-in-visible');
    } else {
      el.classList.remove('fade-in-visible'); // Remove para reaparecer depois
    }
  });
}, {
  threshold: 0.2 // quanto da altura precisa estar visível (20%)
});

document.querySelectorAll('.testimonial-card').forEach(card => {
  observer.observe(card);
});
