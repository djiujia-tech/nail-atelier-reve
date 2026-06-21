const header = document.querySelector(".p-header");

if (header) {
  const THRESHOLD = 80;

  function updateHeader() {
    if (window.scrollY > THRESHOLD) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
