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

  // 楽天リンクのクリック計測(どの記事が実際にクリックを生んでいるかを見るため)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.aff-card');
    if (!link) return;
    gtag('event', 'affiliate_click', {
      keyword: link.dataset.rakutenKeyword || '',
      page_path: location.pathname,
    });
  });
}
