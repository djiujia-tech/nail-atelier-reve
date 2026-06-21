/**
 * RÊVE Gallery - Filter functionality
 */

const filterBtns = document.querySelectorAll(".p-gallery__filter-btn");
const galleryItems = document.querySelectorAll(".p-gallery__item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // アクティブ切替
    filterBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // アイテムフィルター
    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "";
        setTimeout(() => item.classList.remove("is-hidden"), 10);
      } else {
        item.classList.add("is-hidden");
        setTimeout(() => {
          if (item.classList.contains("is-hidden")) item.style.display = "none";
        }, 300);
      }
    });
  });
});
