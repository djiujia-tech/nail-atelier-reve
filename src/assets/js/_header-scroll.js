const header = document.querySelector(".p-header");

if (header) {
  const hasMv = !!document.querySelector(".p-mv");
  const THRESHOLD = 80;

  // MVがないページ（サブページ）は最初から白背景・ダークテキスト
  if (!hasMv) {
    header.classList.add("is-scrolled");
  }

  const updateHeader = () => {
    if (window.scrollY > THRESHOLD) {
      header.classList.add("is-scrolled");
    } else {
      // MVがあるページのみスクロール戻しで透明ヘッダーに戻す
      if (hasMv) {
        header.classList.remove("is-scrolled");
      }
    }
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
