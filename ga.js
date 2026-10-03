// GA4計測。GA4アカウント「uuhai0625」(404607624)配下のプロパティ「カメラ迷子ノート」、ウェブストリーム13951125337(2026-10-03作成)。
// 相場ノート・副業そろばんと同じ空文字ガード+ローカル除外パターン。
const GA_MEASUREMENT_ID = 'G-TBJ6QNRT25';
const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
if (GA_MEASUREMENT_ID && !isLocalDev) {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // 広告カードのクリック計測(どの記事のどの広告がクリックされたかを見るため)
  // aff_slot = 原稿の目印(rental/kaitori)、program = カードの広告名(APEXレンタル等)、keyword = 楽天のときだけ
  // 中ボタンで新しいタブに開いたときは click が出ないので auxclick でも拾う(スマホの長押しは拾えない=下限値)
  const onAffClick = (e) => {
    if (e.type === 'auxclick' && e.button !== 1) return;
    const link = e.target.closest('.aff-card');
    if (!link) return;
    gtag('event', 'affiliate_click', {
      aff_slot: link.dataset.aff || '',
      program: link.dataset.program || '',
      keyword: link.dataset.rakutenKeyword || '',
      page_path: location.pathname,
    });
  };
  document.addEventListener('click', onAffClick);
  document.addEventListener('auxclick', onAffClick);
}
