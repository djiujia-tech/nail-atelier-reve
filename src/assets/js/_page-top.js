/**
 * ページトップに戻るボタン
 */
const btn = document.querySelector(".js-page-top");

if (btn) {
  const THRESHOLD = 400;

  const toggle = () => {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
