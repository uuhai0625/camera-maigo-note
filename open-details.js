// ページ内リンクの行き先が畳んだ箱(details)の中なら開く。Chromeは自動で開くが、Safari・Firefoxは開かない(2026-10-30)
function openTo() {
  var t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  for (; t; t = t.parentElement) if (t.tagName === "DETAILS") t.open = true;
}
addEventListener("hashchange", openTo);
openTo();
