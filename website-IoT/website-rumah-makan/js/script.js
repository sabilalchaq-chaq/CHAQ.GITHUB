/**
 * Logika Interaktif Website Rumah Makan Selera Nusantara
 * 100% Offline, Zero-dependency, Real-time Search, Filter & Simulated Cart
 */

document.addEventListener("DOMContentLoaded", () => {
  // State Aplikasi
  const state = {
    activeCategory: "semua",
    searchQuery: "",
    cart: loadCartFromStorage(),
    tableNumber: localStorage.getItem("sn_table_no") || "Meja 05"
  };

  // DOM Elements
  const menuGrid = document.getElementById("menuGrid");
  const menuCountEl = document.getElementById("menuCount");
  const categoryContainer = document.getElementById("categoryFilterNav");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  // Cart DOM Elements
  const cartDrawerBackdrop = document.getElementById("cartDrawerBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartToggleBtns = document.querySelectorAll(".js-cart-toggle");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartCountBadges = document.querySelectorAll(".js-cart-count");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartTaxEl = document.getElementById("cartTax");
  const cartTotalEl = document.getElementById("cartTotal");
  const tableSelect = document.getElementById("tableSelect");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutReceiptBtn = document.getElementById("checkoutReceiptBtn");

  // Modal Detail Elements
  const detailModalBackdrop = document.getElementById("detailModalBackdrop");
  const detailModalClose = document.getElementById("detailModalClose");
  const modalImg = document.getElementById("modalImg");
  const modalBadge = document.getElementById("modalBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrepTime = document.getElementById("modalPrepTime");
  const modalSpicy = document.getElementById("modalSpicy");
  const modalDesc = document.getElementById("modalDesc");
  const modalIngredients = document.getElementById("modalIngredients");
  const modalAddCartBtn = document.getElementById("modalAddCartBtn");
  let activeModalItem = null;

  // Receipt Modal Elements
  const receiptModalBackdrop = document.getElementById("receiptModalBackdrop");
  const receiptModalClose = document.getElementById("receiptModalClose");
  const receiptPrintBtn = document.getElementById("receiptPrintBtn");
  const receiptOrderNo = document.getElementById("receiptOrderNo");
  const receiptDate = document.getElementById("receiptDate");
  const receiptTable = document.getElementById("receiptTable");
  const receiptItems = document.getElementById("receiptItems");
  const receiptSubtotal = document.getElementById("receiptSubtotal");
  const receiptTax = document.getElementById("receiptTax");
  const receiptGrandTotal = document.getElementById("receiptGrandTotal");

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("mobile-active");
    });
    // Tutup saat link diklik
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("mobile-active");
      });
    });
  }

  // --- Format Rupiah Helper ---
  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  }

  // --- Inisialisasi Kategori Filter Tabs ---
  function initCategories() {
    if (!categoryContainer || !window.MENU_CATEGORIES) return;

    categoryContainer.innerHTML = window.MENU_CATEGORIES.map(cat => `
      <button class="category-tab ${cat.id === state.activeCategory ? 'active' : ''}" data-cat-id="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join("");

    categoryContainer.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const catId = btn.dataset.catId;
        state.activeCategory = catId;

        categoryContainer.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");

        renderMenu();
      });
    });
  }

  // --- Render Menu Catalog ---
  function renderMenu() {
    if (!menuGrid || !window.MENU_DATA) return;

    const filtered = window.MENU_DATA.filter(item => {
      const matchCategory = state.activeCategory === "semua" || item.category === state.activeCategory;
      const q = state.searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });

    if (menuCountEl) {
      menuCountEl.innerHTML = `Menampilkan <span>${filtered.length}</span> pilihan lezat`;
    }

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div class="menu-empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">Menu Tidak Ditemukan</h3>
          <p class="empty-desc">Coba kata kunci lain atau pilih kategori "Semua Menu".</p>
        </div>
      `;
      return;
    }

    menuGrid.innerHTML = filtered.map(item => {
      // Tingkat kepedasan
      let spicyHtml = "";
      if (item.spicyLevel > 0) {
        spicyHtml = `<span>${"🌶️".repeat(item.spicyLevel)}</span>`;
      }

      return `
        <article class="menu-card" data-item-id="${item.id}">
          <div class="card-image-wrap js-open-detail" data-item-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
            ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ""}
            <div class="card-prep-time">
              <span>⏱️</span>
              <span>${item.prepTime}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-category">${item.categoryLabel}</span>
              <div class="card-spicy-stars">
                ${spicyHtml}
                <span style="color:#F59E0B; font-weight:700; margin-left:4px;">★ ${item.rating}</span>
              </div>
            </div>
            <h3 class="card-title js-open-detail" data-item-id="${item.id}">${item.name}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
              <span class="card-price">${formatRupiah(item.price)}</span>
              <button class="add-cart-btn js-add-cart" data-item-id="${item.id}">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Tambah
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Pasang Event Listeners
    menuGrid.querySelectorAll(".js-add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const itemId = btn.dataset.itemId;
        addToCart(itemId);
      });
    });

    menuGrid.querySelectorAll(".js-open-detail").forEach(el => {
      el.addEventListener("click", () => {
        const itemId = el.dataset.itemId;
        openDetailModal(itemId);
      });
    });
  }

  // --- Real-Time Search Handler ---
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (state.searchQuery.length > 0) {
          clearSearchBtn.classList.add("show");
        } else {
          clearSearchBtn.classList.remove("show");
        }
      }
      renderMenu();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearSearchBtn.classList.remove("show");
      renderMenu();
      searchInput.focus();
    });
  }

  // --- Detail Modal Logic ---
  function openDetailModal(itemId) {
    const item = window.MENU_DATA.find(m => m.id === itemId);
    if (!item) return;

    activeModalItem = item;
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalTitle.textContent = item.name;
    modalPrice.textContent = formatRupiah(item.price);
    modalCategory.textContent = item.categoryLabel;
    modalPrepTime.textContent = `⏱️ ${item.prepTime}`;
    modalDesc.textContent = item.description;
    modalIngredients.textContent = item.details;

    if (item.badge) {
      modalBadge.textContent = item.badge;
      modalBadge.style.display = "inline-block";
    } else {
      modalBadge.style.display = "none";
    }

    if (item.spicyLevel > 0) {
      modalSpicy.innerHTML = `${"🌶️".repeat(item.spicyLevel)} Level Pedas ${item.spicyLevel}/3`;
      modalSpicy.style.display = "inline-flex";
    } else {
      modalSpicy.innerHTML = `🌱 Tidak Pedas`;
      modalSpicy.style.display = "inline-flex";
    }

    detailModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDetailModal() {
    detailModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    activeModalItem = null;
  }

  if (detailModalClose) {
    detailModalClose.addEventListener("click", closeDetailModal);
  }
  if (detailModalBackdrop) {
    detailModalBackdrop.addEventListener("click", (e) => {
      if (e.target === detailModalBackdrop) {
        closeDetailModal();
      }
    });
  }

  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener("click", () => {
      if (activeModalItem) {
        addToCart(activeModalItem.id);
        closeDetailModal();
      }
    });
  }

  // --- Cart Management ---
  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem("sn_offline_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem("sn_offline_cart", JSON.stringify(state.cart));
      localStorage.setItem("sn_table_no", state.tableNumber);
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  function addToCart(itemId, qty = 1, note = "") {
    const menuItem = window.MENU_DATA.find(m => m.id === itemId);
    if (!menuItem) return;

    const existingIndex = state.cart.findIndex(i => i.id === itemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
        quantity: qty,
        note: note
      });
    }

    saveCartToStorage();
    renderCart();
    showToast(`"${menuItem.name}" ditambahkan ke pesanan! 🍛`);
  }

  function updateCartItemQty(itemId, delta) {
    const itemIndex = state.cart.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
      showToast("Menu dihapus dari keranjang");
    }

    saveCartToStorage();
    renderCart();
  }

  function updateCartItemNote(itemId, note) {
    const item = state.cart.find(i => i.id === itemId);
    if (item) {
      item.note = note;
      saveCartToStorage();
    }
  }

  function removeCartItem(itemId) {
    state.cart = state.cart.filter(i => i.id !== itemId);
    saveCartToStorage();
    renderCart();
    showToast("Menu dihapus");
  }

  function clearCart() {
    if (state.cart.length === 0) return;
    if (confirm("Kosongkan semua pesanan di keranjang?")) {
      state.cart = [];
      saveCartToStorage();
      renderCart();
      showToast("Keranjang berhasil dikosongkan");
    }
  }

  function renderCart() {
    // Hitung total item
    const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(b => {
      b.textContent = totalQty;
      b.style.display = totalQty > 0 ? "inline-block" : "none";
    });

    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <span>🛒</span>
          <h4>Keranjang Pesanan Kosong</h4>
          <p>Pilih menu favorit Anda dan klik tombol "+ Tambah" untuk memulai pesanan.</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(0);
      if (cartTaxEl) cartTaxEl.textContent = formatRupiah(0);
      if (cartTotalEl) cartTotalEl.textContent = formatRupiah(0);
      if (checkoutReceiptBtn) checkoutReceiptBtn.disabled = true;
      return;
    }

    if (checkoutReceiptBtn) checkoutReceiptBtn.disabled = false;

    // Hitung Keuangan
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxPB1 = Math.round(subtotal * 0.10); // Pajak Restoran 10%
    const grandTotal = subtotal + taxPB1;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(subtotal);
    if (cartTaxEl) cartTaxEl.textContent = formatRupiah(taxPB1);
    if (cartTotalEl) cartTotalEl.textContent = formatRupiah(grandTotal);

    cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item-card" data-item-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatRupiah(item.price * item.quantity)}</div>
          
          <input type="text" 
                 class="item-note-input js-cart-note" 
                 placeholder="Catatan khusus (misal: pedas sedang)" 
                 value="${item.note || ''}" 
                 data-item-id="${item.id}">

          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn js-qty-minus" data-item-id="${item.id}">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn js-qty-plus" data-item-id="${item.id}">+</button>
            </div>
            <button class="item-delete-btn js-item-delete" data-item-id="${item.id}">Hapus</button>
          </div>
        </div>
      </div>
    `).join("");

    // Event listeners kontrol kuantitas
    cartItemsContainer.querySelectorAll(".js-qty-minus").forEach(btn => {
      btn.addEventListener("click", () => updateCartItemQty(btn.dataset.itemId, -1));
    });
    cartItemsContainer.querySelectorAll(".js-qty-plus").forEach(btn => {
      btn.addEventListener("click", () => updateCartItemQty(btn.dataset.itemId, 1));
    });
    cartItemsContainer.querySelectorAll(".js-item-delete").forEach(btn => {
      btn.addEventListener("click", () => removeCartItem(btn.dataset.itemId));
    });
    cartItemsContainer.querySelectorAll(".js-cart-note").forEach(input => {
      input.addEventListener("change", (e) => updateCartItemNote(e.target.dataset.itemId, e.target.value));
    });
  }

  // --- Drawer Open & Close ---
  function openCartDrawer() {
    cartDrawerBackdrop.classList.add("active");
    cartDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    cartDrawerBackdrop.classList.remove("active");
    cartDrawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  cartToggleBtns.forEach(btn => btn.addEventListener("click", openCartDrawer));
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
  if (cartDrawerBackdrop) cartDrawerBackdrop.addEventListener("click", closeCartDrawer);
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

  // Table selector sync
  if (tableSelect) {
    tableSelect.value = state.tableNumber;
    tableSelect.addEventListener("change", (e) => {
      state.tableNumber = e.target.value;
      saveCartToStorage();
    });
  }

  // --- Receipt Generation Modal ---
  if (checkoutReceiptBtn) {
    checkoutReceiptBtn.addEventListener("click", () => {
      if (state.cart.length === 0) return;

      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxPB1 = Math.round(subtotal * 0.10);
      const grandTotal = subtotal + taxPB1;

      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const orderNum = `SN-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(Math.floor(Math.random()*900 + 100))}`;
      const dateStr = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())} WIB`;

      receiptOrderNo.textContent = orderNum;
      receiptDate.textContent = dateStr;
      receiptTable.textContent = state.tableNumber;

      receiptItems.innerHTML = state.cart.map(item => `
        <div class="receipt-item-row">
          <div>
            <div class="receipt-item-name">${item.name}</div>
            <div style="font-size: 0.72rem; color: #4B5563;">
              ${item.quantity} x ${formatRupiah(item.price)}
              ${item.note ? ` | Note: ${item.note}` : ""}
            </div>
          </div>
          <div style="font-weight:700;">${formatRupiah(item.price * item.quantity)}</div>
        </div>
      `).join("");

      receiptSubtotal.textContent = formatRupiah(subtotal);
      receiptTax.textContent = formatRupiah(taxPB1);
      receiptGrandTotal.textContent = formatRupiah(grandTotal);

      // Tutup drawer dan buka modal receipt
      closeCartDrawer();
      receiptModalBackdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (receiptModalClose) {
    receiptModalClose.addEventListener("click", () => {
      receiptModalBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (receiptPrintBtn) {
    receiptPrintBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // --- Toast Notification Helper ---
  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span>✓</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 2800);
  }

  // Inisialisasi Pertama
  initCategories();
  renderMenu();
  renderCart();
});
