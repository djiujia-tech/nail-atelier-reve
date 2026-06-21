/**
 * RÊVE Shop - Cart functionality
 */

const cart = [];

const cartCountEls = document.querySelectorAll(".js-cart-count");
const cartTotalEls = document.querySelectorAll(".js-cart-total");
const cartModalTotalEl = document.querySelector(".js-cart-modal-total");
const cartListEl = document.querySelector(".js-cart-list");
const cartModal = document.querySelector(".js-cart-modal");
const cartBar = document.querySelector(".js-cart-bar");

/** カート合計を更新 */
function updateCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCountEls.forEach(el => (el.textContent = totalCount));
  cartTotalEls.forEach(el => (el.textContent = `¥${totalPrice.toLocaleString()}`));
  if (cartModalTotalEl) {
    cartModalTotalEl.textContent = `¥${totalPrice.toLocaleString()}`;
  }

  // カートバーの表示
  if (cartBar) {
    cartBar.classList.toggle("is-active", totalCount > 0);
  }

  renderCartList();
}

/** カートリストをレンダリング */
function renderCartList() {
  if (!cartListEl) return;

  if (cart.length === 0) {
    cartListEl.innerHTML = '<li class="p-cart-modal__empty">カートに商品がありません</li>';
    return;
  }

  cartListEl.innerHTML = cart
    .map(
      item => `
    <li class="p-cart-modal__item" data-id="${item.id}">
      <img src="${item.img}" width="80" height="80" alt="${item.name}" />
      <div class="p-cart-modal__item-info">
        <p class="p-cart-modal__item-name">${item.name}</p>
        <p class="p-cart-modal__item-price">¥${item.price.toLocaleString()}</p>
        <div class="p-cart-modal__item-qty">
          <button class="p-cart-modal__qty-btn js-qty-minus" data-id="${item.id}" aria-label="減らす">−</button>
          <span>${item.qty}</span>
          <button class="p-cart-modal__qty-btn js-qty-plus" data-id="${item.id}" aria-label="増やす">+</button>
        </div>
      </div>
      <button class="p-cart-modal__item-remove js-remove-item" data-id="${item.id}" aria-label="削除">×</button>
    </li>
  `,
    )
    .join("");

  // 数量変更・削除ボタンのイベント
  cartListEl.querySelectorAll(".js-qty-minus").forEach(btn => {
    btn.addEventListener("click", () => changeQty(btn.dataset.id, -1));
  });
  cartListEl.querySelectorAll(".js-qty-plus").forEach(btn => {
    btn.addEventListener("click", () => changeQty(btn.dataset.id, 1));
  });
  cartListEl.querySelectorAll(".js-remove-item").forEach(btn => {
    btn.addEventListener("click", () => removeItem(btn.dataset.id));
  });
}

/** 数量変更 */
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  else updateCart();
}

/** 削除 */
function removeItem(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart.splice(idx, 1);
  updateCart();
}

/** カートに追加 */
document.querySelectorAll(".js-add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const itemEl = btn.closest(".p-shop__item");
    const id = itemEl.dataset.id;
    const name = itemEl.dataset.name;
    const price = parseInt(itemEl.dataset.price.replace(/,/g, ""), 10);
    const img = itemEl.dataset.img;

    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }

    updateCart();

    // ボタンフィードバック
    btn.textContent = "追加しました ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "カートに追加";
      btn.disabled = false;
    }, 1500);
  });
});

/** モーダル開閉 */
document.querySelectorAll(".js-cart-open").forEach(btn => {
  btn.addEventListener("click", () => {
    cartModal?.setAttribute("aria-hidden", "false");
    cartModal?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll(".js-cart-close").forEach(btn => {
  btn.addEventListener("click", () => {
    cartModal?.setAttribute("aria-hidden", "true");
    cartModal?.classList.remove("is-open");
    document.body.style.overflow = "";
  });
});

// 初期化
updateCart();
