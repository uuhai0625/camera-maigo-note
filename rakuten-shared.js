// 楽天アフィリエイトの共通処理。相場ノート(実用計算ツール/app/rakuten-shared.js)から
// 検索リンク生成部分だけを移植した。商品検索API(商品カード)は、記事で必要になったら同ファイルから移植する。
// 楽天の上限(1商品1,000円・1ユーザー月3,000円)があるため、リンクは記事の流れに合う所だけに置く方針(brand.md)。

// uuhai0625ブランド用の楽天アフィリエイトID(相場ノートと共通)
const RAKUTEN_AFFILIATE_ID = '567f9cc6.631b3687.567f9cc7.3d3a8a85';

// 楽天市場の検索結果(レビュー件数順 ?s=5 を人気の代用指標にする)へのアフィリエイトリンク
function affiliateUrl(keyword) {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/?s=5`;
  if (!RAKUTEN_AFFILIATE_ID) return searchUrl;
  const encoded = encodeURIComponent(searchUrl);
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=${encoded}&link_type=text&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6InRleHQiLCJjb2wiOjF9`;
}

// <a class="aff-card" data-rakuten-keyword="..."> のhrefを、アフィリエイトリンクに差し替える。
// 2026-10-09から build_article.py がHTMLに最初からアフィリエイトURLを書くので、ここは保険(同じURLを書き直すだけ)。
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.aff-card[data-rakuten-keyword]').forEach((a) => {
    a.href = affiliateUrl(a.dataset.rakutenKeyword);
  });
});
