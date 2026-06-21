/**
 * 現在ページのナビリンクにis-activeクラスを付与
 */
const path = location.pathname.replace(/\/$/, "") || "/";

document.querySelectorAll(".p-header__nav-item > a, .p-header__drawer-item > a").forEach(link => {
  const href = new URL(link.href).pathname.replace(/\/$/, "") || "/";
  if (href === path) {
    link.closest("li").classList.add("is-active");
  }
});
