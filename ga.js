// GA4計測。プロパティは未作成(2026-09-30時点)。作成したらGA_MEASUREMENT_IDに測定IDを入れる。
// 相場ノート・副業そろばんと同じ空文字ガード+ローカル除外パターン。
const GA_MEASUREMENT_ID = '';
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
