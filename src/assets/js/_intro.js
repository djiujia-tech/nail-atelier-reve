/**
 * カーテンイントロアニメーション
 * セッション内の初回訪問のみ表示（sessionStorage で管理）
 */

const intro = document.querySelector(".js-intro");

if (intro) {
  if (sessionStorage.getItem("reve-intro-shown")) {
    // 2回目以降は即非表示
    intro.classList.add("is-done");
  } else {
    // 初回のみ再生
    sessionStorage.setItem("reve-intro-shown", "1");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      intro.classList.add("is-open");
    }, 800);

    setTimeout(() => {
      intro.classList.add("is-done");
      document.body.style.overflow = "";
    }, 2600);
  }
}
